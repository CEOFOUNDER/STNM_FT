(function () {
  function pdfSafeText(text) {
    return String(text || "").replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ");
  }

  function pdfEscape(text) {
    return pdfSafeText(text)
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
  }

  function wrapLines(text, width) {
    const lines = [];
    pdfSafeText(text).split(/\r?\n/).forEach((line) => {
      const words = line.split(/\s+/).filter(Boolean);
      if (!words.length) {
        lines.push("");
        return;
      }
      let current = "";
      words.forEach((word) => {
        const next = current ? current + " " + word : word;
        if (next.length > width && current) {
          lines.push(current);
          current = word;
        } else {
          current = next;
        }
      });
      if (current) lines.push(current);
    });
    return lines;
  }

  function buildAssessmentPdfBlob(summary) {
    const title = "SEE THE NEXT MOVE - AI Finance Diagnostic Assessment";
    const lines = [
      title,
      "",
      "Generated from the paid-session diagnostic preparation tool.",
      "",
      ...wrapLines(summary, 88),
    ];
    const perPage = 44;
    const pages = [];
    for (let i = 0; i < lines.length; i += perPage) {
      pages.push(lines.slice(i, i + perPage));
    }

    const objects = [];
    const add = (value) => {
      objects.push(value);
      return objects.length;
    };

    const catalogId = add("<< /Type /Catalog /Pages 2 0 R >>");
    const pagesId = add("");
    const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    const pageIds = [];

    pages.forEach((pageLines) => {
      const content =
        "BT\n/F1 10 Tf\n50 790 Td\n14 TL\n" +
        pageLines.map((line) => "(" + pdfEscape(line) + ") Tj").join("\nT*\n") +
        "\nET";
      const contentId = add(
        "<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream"
      );
      const pageId = add(
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 " +
          fontId +
          " 0 R >> >> /Contents " +
          contentId +
          " 0 R >>"
      );
      pageIds.push(pageId);
    });

    objects[pagesId - 1] =
      "<< /Type /Pages /Kids [" +
      pageIds.map((id) => id + " 0 R").join(" ") +
      "] /Count " +
      pageIds.length +
      " >>";

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

  window.attachAssessmentPdf = function attachAssessmentPdf(form, summary) {
    if (typeof File === "undefined" || typeof DataTransfer === "undefined") {
      throw new Error("This browser cannot attach the generated PDF.");
    }
    const file = new File([buildAssessmentPdfBlob(summary)], "AI-Finance-Diagnostic-Assessment.pdf", {
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
})();
