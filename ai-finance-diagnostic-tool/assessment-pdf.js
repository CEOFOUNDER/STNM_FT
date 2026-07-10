(function () {
  const fileName = "AI-Finance-Diagnostic-Assessment.pdf";

  function pdfSafeText(text) {
    return String(text || "").replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ").trim();
  }

  function pdfEscape(text) {
    return pdfSafeText(text)
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
  }

  function wrapText(text, width) {
    const safe = pdfSafeText(text);
    if (!safe) return [""];
    const lines = [];
    safe.split(/\s+/).forEach((word) => {
      const current = lines[lines.length - 1] || "";
      const next = current ? current + " " + word : word;
      if (next.length > width && current) {
        lines.push(word);
      } else if (lines.length) {
        lines[lines.length - 1] = next;
      } else {
        lines.push(next);
      }
    });
    return lines;
  }

  function fieldValue(summary, label) {
    const prefix = label + ":";
    const line = String(summary || "")
      .split(/\r?\n/)
      .find((item) => item.trim().startsWith(prefix));
    return line ? line.slice(prefix.length).trim() : "Not provided";
  }

  function recommendedFocus(summary) {
    const lines = String(summary || "").split(/\r?\n/);
    const start = lines.findIndex((line) => line.trim() === "Recommended focus:");
    if (start < 0) return [];
    const out = [];
    for (let i = start + 1; i < lines.length; i += 1) {
      const line = lines[i].trim();
      if (line === "Additional context:") break;
      if (line.startsWith("- ")) out.push(line.slice(2));
    }
    return out.slice(0, 4);
  }

  function addLine(lines, text, options) {
    lines.push({ text: pdfSafeText(text), size: options?.size || 9, gap: options?.gap || 12 });
  }

  function addWrapped(lines, text, options) {
    wrapText(text, options?.width || 82).forEach((line) => {
      addLine(lines, line, options);
    });
  }

  function addSection(lines, title) {
    addLine(lines, "", { gap: 8 });
    addLine(lines, title.toUpperCase(), { size: 10, gap: 14 });
  }

  function assessmentLines(summary, recipientEmail) {
    const focus = recommendedFocus(summary);
    const generated = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const lines = [];
    addLine(lines, "SEE THE NEXT MOVE", { size: 11, gap: 16 });
    addLine(lines, "AI Finance Diagnostic - Final Assessment", { size: 18, gap: 24 });
    addLine(lines, "Client email: " + pdfSafeText(recipientEmail || "Not provided"), { size: 10, gap: 14 });
    addLine(lines, "Generated: " + generated, { size: 9, gap: 18 });

    addSection(lines, "Assessment result");
    addLine(lines, "Score: " + fieldValue(summary, "Score"), { size: 12, gap: 16 });
    addLine(lines, "Readiness: " + fieldValue(summary, "Readiness"), { size: 12, gap: 18 });

    addSection(lines, "Client detail");
    addWrapped(lines, "Role: " + fieldValue(summary, "Role"), { width: 86 });
    addWrapped(lines, "Scope: " + fieldValue(summary, "Scope"), { width: 86 });
    addWrapped(lines, "Total Finance function cost: " + fieldValue(summary, "Total Finance function cost"), { width: 86 });
    addWrapped(lines, "Total Finance FTEs: " + fieldValue(summary, "Total Finance FTEs"), { width: 86 });
    addWrapped(lines, "Decision: " + fieldValue(summary, "Decision"), { width: 86 });

    addSection(lines, "AI Finance control points");
    addWrapped(lines, "AS IS baseline: " + fieldValue(summary, "AS IS baseline"), { width: 86 });
    addWrapped(lines, "Data/vendor/audit trail: " + fieldValue(summary, "Data/vendor/audit trail"), { width: 86 });
    addWrapped(lines, "AI autonomy boundary: " + fieldValue(summary, "AI autonomy boundary"), { width: 86 });

    addSection(lines, "Recommended session focus");
    if (focus.length) {
      focus.forEach((item) => addWrapped(lines, "- " + item, { width: 82 }));
    } else {
      addWrapped(lines, "Use the paid session to confirm the use case, ROI baseline, control boundary and next 30-90 day action plan.", { width: 82 });
    }

    addLine(lines, "", { gap: 8 });
    addWrapped(lines, "Prepared for the $750 AI Finance Diagnostic Pack. This assessment supports the paid session and does not replace professional judgement, governance review or implementation diligence.", { width: 88, size: 8, gap: 10 });
    return lines.slice(0, 44);
  }

  function buildAssessmentPdfBlob(summary, recipientEmail) {
    const lines = assessmentLines(summary, recipientEmail);
    const textCommands = [];
    let y = 790;
    lines.forEach((line) => {
      y -= line.gap;
      textCommands.push("BT");
      textCommands.push("/F1 " + line.size + " Tf");
      textCommands.push("50 " + y + " Td");
      textCommands.push("(" + pdfEscape(line.text) + ") Tj");
      textCommands.push("ET");
    });

    const content = textCommands.join("\n");
    const objects = [];
    const add = (value) => {
      objects.push(value);
      return objects.length;
    };

    const catalogId = add("<< /Type /Catalog /Pages 2 0 R >>");
    add("<< /Type /Pages /Kids [4 0 R] /Count 1 >>");
    const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    const contentId = add("<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream");
    add(
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 " +
        fontId +
        " 0 R >> >> /Contents " +
        contentId +
        " 0 R >>"
    );

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((obj, index) => {
      offsets.push(pdf.length);
      pdf += index + 1 + " 0 obj\n" + obj + "\nendobj\n";
    });
    const xref = pdf.length;
    pdf += "xref\n0 " + (objects.length + 1) + "\n0000000000 65535 f \n";
    for (let i = 1; i < offsets.length; i += 1) {
      pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    }
    pdf +=
      "trailer\n<< /Size " +
      (objects.length + 1) +
      " /Root " +
      catalogId +
      " 0 R >>\nstartxref\n" +
      xref +
      "\n%%EOF";

    return new Blob([pdf], { type: "application/pdf" });
  }

  function hiddenFieldValue(form, name) {
    const field = form.querySelector('[name="' + name + '"]');
    return field ? field.value : "";
  }

  window.attachAssessmentPdf = function attachAssessmentPdf(form, summary) {
    if (typeof File === "undefined" || typeof DataTransfer === "undefined") {
      throw new Error("This browser cannot attach the generated PDF.");
    }
    const recipientEmail = hiddenFieldValue(form, "recipient_email") || hiddenFieldValue(form, "_cc");
    const file = new File([buildAssessmentPdfBlob(summary, recipientEmail)], fileName, {
      type: "application/pdf",
    });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "assessment_pdf";
    fileInput.files = transfer.files;
    fileInput.style.display = "none";
    form.appendChild(fileInput);
  };

  window.buildAssessmentPdfBlob = buildAssessmentPdfBlob;
})();
