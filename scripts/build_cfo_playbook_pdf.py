from base64 import b64encode
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Flowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    PageBreak,
)


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "playbooks" / "cfo-ai-finance-playbook-stnm.pdf"
DOWNLOADER_PATH = ROOT / "cfo-ai-finance-playbook-download.html"

INK = colors.HexColor("#0b1220")
MUTED = colors.HexColor("#556071")
LINE = colors.HexColor("#d9dee8")
SOFT = colors.HexColor("#f4f7fb")
TEAL = colors.HexColor("#1d9a9a")
GOLD = colors.HexColor("#c99a45")
PALE_GOLD = colors.HexColor("#fffaf0")
WHITE = colors.white


class HeaderFooterDoc(SimpleDocTemplate):
    pass


def draw_header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    left = doc.leftMargin
    right = width - doc.rightMargin

    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(left, height - 18 * mm, right, height - 18 * mm)
    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 15)
    canvas.drawString(left, height - 13 * mm, "STNM")
    canvas.setFillColor(TEAL)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.drawRightString(right, height - 13 * mm, "CFO AI FINANCE PLAYBOOK")

    canvas.setStrokeColor(LINE)
    canvas.line(left, 16 * mm, right, 16 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(left, 10 * mm, "Gilles Bonelli FCCA | See The Next Move | www.seethenextmove.com")
    canvas.drawRightString(right, 10 * mm, str(canvas.getPageNumber()))
    canvas.restoreState()


class Band(Flowable):
    def __init__(self, text, fill=PALE_GOLD, stroke=GOLD):
        super().__init__()
        self.text = text
        self.fill = fill
        self.stroke = stroke
        self.height = 24 * mm

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, self.height

    def draw(self):
        self.canv.saveState()
        self.canv.setFillColor(self.fill)
        self.canv.setStrokeColor(self.stroke)
        self.canv.roundRect(0, 0, self.width, self.height, 5, stroke=1, fill=1)
        style = ParagraphStyle("band", fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=INK)
        p = Paragraph(self.text, style)
        p.wrapOn(self.canv, self.width - 18 * mm, self.height - 10 * mm)
        p.drawOn(self.canv, 9 * mm, 7 * mm)
        self.canv.restoreState()


def styles():
    base = getSampleStyleSheet()
    return {
        "kicker": ParagraphStyle("kicker", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=7.8, leading=10, textColor=TEAL, spaceAfter=8),
        "title": ParagraphStyle("title", parent=base["Title"], fontName="Helvetica-Bold", fontSize=38, leading=38, textColor=INK, spaceAfter=14),
        "h1": ParagraphStyle("h1", parent=base["Heading1"], fontName="Helvetica-Bold", fontSize=25, leading=28, textColor=INK, spaceAfter=12),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=15, leading=18, textColor=INK, spaceAfter=7),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="Helvetica", fontSize=10.3, leading=14, textColor=MUTED, spaceAfter=8),
        "lead": ParagraphStyle("lead", parent=base["BodyText"], fontName="Helvetica", fontSize=13, leading=18, textColor=MUTED, spaceAfter=14),
        "card": ParagraphStyle("card", parent=base["BodyText"], fontName="Helvetica", fontSize=9.3, leading=12.5, textColor=MUTED),
        "small": ParagraphStyle("small", parent=base["BodyText"], fontName="Helvetica", fontSize=8, leading=10, textColor=MUTED),
    }


def para(text, style):
    return Paragraph(text, style)


def card(title, text, s):
    return Table(
        [[para(f"<b>{title}</b><br/>{text}", s["card"])]],
        style=[
            ("BACKGROUND", (0, 0), (-1, -1), WHITE),
            ("BOX", (0, 0), (-1, -1), 0.6, LINE),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ],
    )


def build_pdf():
    s = styles()
    doc = HeaderFooterDoc(
        str(PDF_PATH), pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm, topMargin=26 * mm, bottomMargin=22 * mm
    )
    usable = A4[0] - doc.leftMargin - doc.rightMargin
    col2 = (usable - 10 * mm) / 2
    col3 = (usable - 12 * mm) / 3

    story = [
        Spacer(1, 32 * mm),
        para("CFO AI FINANCE PLAYBOOK", s["kicker"]),
        para("How CFOs can turn AI Finance ambition into trusted value.", s["title"]),
        para("A practical playbook for sequencing AI-enabled Finance transformation, protecting human judgement and moving from scattered pilots to measurable adoption.", s["lead"]),
        Spacer(1, 22 * mm),
        Band("Roadmap. Landing. Programme oversight. Built for Finance leaders who need value, control and adoption."),
        Spacer(1, 42 * mm),
        para("Gilles Bonelli FCCA | See The Next Move | www.seethenextmove.com", s["small"]),
        PageBreak(),
        para("THE CFO QUESTION", s["kicker"]),
        para("The issue is no longer whether AI can change Finance. It can.", s["h1"]),
        para("The harder question is whether Finance can absorb AI into the operating rhythm of the function: planning, reporting, close, control, insight, business partnering and executive decision-making.", s["lead"]),
        Band("CFOs do not need more disconnected pilots. They need a practical sequence."),
        Spacer(1, 10 * mm),
        Table([[card("01. Where AI should start", "Identify high-value, lower-risk workflows where human review already exists.", s), card("02. What must be prepared next", "Resolve data, process ownership, controls and adoption readiness before scaling.", s), card("03. Where judgement remains central", "Protect accountability for material decisions, external reporting and risk-sensitive work.", s)]], colWidths=[col3, col3, col3], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]),
        PageBreak(),
        para("WHAT CHANGES", s["kicker"]),
        para("AI Finance transformation is a leadership and operating model question.", s["h1"]),
        Table([[card("From use cases to roadmap", "AI ideas must be prioritised by value, feasibility, risk, data readiness and adoption effort.", s), card("From automation to operating model", "The real gain comes when workflows, controls, roles and decision rights change together.", s)], [card("From experimentation to oversight", "Finance needs governance that tracks adoption, confidence, quality, risk and measurable outcomes.", s), card("From tool selection to trust", "Teams adopt AI when outputs are explainable, reviewed, corrected and embedded into daily work.", s)]], colWidths=[col2, col2], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]),
        Band("The CFO role: set the ambition, sequence the roadmap, insist on controls by design and make human accountability explicit."),
        PageBreak(),
        para("THE CFO LENS", s["kicker"]),
        para("Separate productivity opportunities from decision-sensitive workflows.", s["h1"]),
        para("A strong AI Finance roadmap does not treat every process as equally ready. It distinguishes fast-start use cases from higher-stakes workflows that require stronger guardrails.", s["body"]),
        Table([[card("Start now", "Reporting automation<br/>Commentary drafting<br/>Anomaly detection<br/>Data quality checks<br/>Reconciliation support", s), card("Prepare next", "Forecast support<br/>Scenario modelling<br/>Working capital insight<br/>Business partnering workflows<br/>Process mining to automation", s), card("Guard carefully", "Capital allocation<br/>External reporting<br/>Audit evidence<br/>Compliance judgement<br/>Material risk decisions", s)]], colWidths=[col3, col3, col3], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]),
        PageBreak(),
        para("THE METHOD", s["kicker"]),
        para("Roadmap. Landing. Programme oversight.", s["h1"]),
        Table([[para("<b>Define the roadmap</b>", s["h2"]), para("Prioritise by value, feasibility and risk. Identify where AI creates measurable value, what must come first and where human judgement remains central.", s["body"])], [para("<b>Land the change</b>", s["h2"]), para("Redesign work, not just tools. Embed AI into Finance workflows, controls, training, review points and leadership routines.", s["body"])], [para("<b>Govern delivery</b>", s["h2"]), para("Track adoption and quality together. Measure usage, trust, errors prevented, time saved, controls strengthened and decisions improved.", s["body"])]], colWidths=[45 * mm, usable - 45 * mm], style=[("BACKGROUND", (0, 0), (0, -1), INK), ("TEXTCOLOR", (0, 0), (0, -1), WHITE), ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE), ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10), ("VALIGN", (0, 0), (-1, -1), "TOP")]),
        Spacer(1, 12 * mm),
        Band("The gap to bridge is not AI ambition. It is adoption, trust and disciplined execution.", SOFT, TEAL),
        PageBreak(),
        para("ADOPTION RISK", s["kicker"]),
        para("The real risk is AI becoming peripheral.", s["h1"]),
        para("AI value does not appear because a tool has been deployed. It appears when workflows change, people adopt new ways of working, controls are embedded and Finance trusts the outputs.", s["lead"]),
        Table([[card("Misalignment", "Create a shared case for change and common language across the Finance leadership team.", s), card("Poor prioritisation", "Use common scoring for value, feasibility, risk, data readiness and adoption effort.", s)], [card("Exclusion", "Design AI with the people who understand how Finance work really gets done.", s), card("Loss of confidence", "Capture failures, correct them visibly and turn feedback into stronger guardrails.", s)]], colWidths=[col2, col2], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]),
        PageBreak(),
        para("NEXT MOVES", s["kicker"]),
        para("Use the playbook to sharpen the paid conversation.", s["h1"]),
        para("The purpose of this playbook is not to replace expert judgement. It is to help you arrive with a sharper question, a clearer context and a better view of the decisions that matter.", s["lead"]),
        Table([[card("01. Frame the issue", "Define the Finance outcome, workflow, risk and decision you need to clarify.", s), card("02. Use the free assistant", "Test and refine your question before spending advisory time.", s), card("03. Book the diagnostic", "Turn the issue into roadmap, adoption and governance next actions.", s)]], colWidths=[col3, col3, col3], style=[("VALIGN", (0, 0), (-1, -1), "TOP")]),
        Spacer(1, 12 * mm),
        Table([[para("<b>AI Finance Diagnostic Pack</b><br/><br/><font color='white'>$350 fixed-price session.</font> One expert hour, free assistant preparation, post-session summary and practical next 30-day actions.", ParagraphStyle("cta", fontName="Helvetica", fontSize=13, leading=17, textColor=WHITE))]], colWidths=[usable], style=[("BACKGROUND", (0, 0), (-1, -1), INK), ("BOX", (0, 0), (-1, -1), 0.6, INK), ("LEFTPADDING", (0, 0), (-1, -1), 16), ("RIGHTPADDING", (0, 0), (-1, -1), 16), ("TOPPADDING", (0, 0), (-1, -1), 16), ("BOTTOMPADDING", (0, 0), (-1, -1), 16)]),
    ]

    doc.build(story, onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)


def build_downloader():
    base64_pdf = b64encode(PDF_PATH.read_bytes()).decode("ascii")
    html = f'''<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your CFO AI Finance Playbook Download | See The Next Move</title>
    <meta name="robots" content="noindex, nofollow" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="See The Next Move home"><span class="brand-wordmark">STNM</span></a>
      <nav class="nav" aria-label="Main navigation">
        <a class="home-link" href="index.html" aria-label="Home"><span>Home</span></a>
        <a href="resources.html">Resources</a>
        <a class="nav-cta" href="ai-finance-diagnostic.html">Diagnostic Pack</a>
      </nav>
    </header>
    <main>
      <section class="page-hero">
        <p class="breadcrumb"><a href="index.html">Home</a> / CFO Playbook Download</p>
        <p class="eyebrow">PDF Download</p>
        <h1>Your CFO AI Finance Playbook is ready.</h1>
        <p class="lead">The download should start automatically. If it does not, use the button below.</p>
        <div class="hero-actions">
          <a id="downloadLink" class="button primary" download="CFO-AI-Finance-Playbook-See-The-Next-Move.pdf">Download the PDF</a>
          <a class="button secondary" href="ai-finance-diagnostic.html">Prepare for the Diagnostic Pack</a>
        </div>
      </section>
    </main>
    <script>
      const base64 = "{base64_pdf}";
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {{
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }}
      const blob = new Blob([new Uint8Array(byteNumbers)], {{ type: "application/pdf" }});
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("downloadLink");
      link.href = url;
      setTimeout(() => link.click(), 500);
    </script>
  </body>
</html>
'''
    DOWNLOADER_PATH.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    build_pdf()
    build_downloader()
    print(f"PDF written to {PDF_PATH}")
    print(f"Downloader written to {DOWNLOADER_PATH}")
    print(f"PDF bytes: {PDF_PATH.stat().st_size}")
