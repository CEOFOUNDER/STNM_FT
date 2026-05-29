const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "traffic-console", "generated");
const packPath = path.join(outputDir, "daily-pack.json");
const reportPath = path.join(outputDir, "latest-brief.md");

const links = {
  site: "https://www.seethenextmove.com/",
  diagnostic: "https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone",
  assistant: "https://chatgpt.com/g/g-67bbc67babd4819199ee183bf8b7588c-ai-finance-playbook-for-finance-leaders"
};

const themes = [
  {
    theme: "AI use case prioritisation",
    buyerProblem: "AI pilot sprawl is creating activity without a clear Finance value case.",
    audience: "CFO, Finance Transformation Director, FP&A Director",
    proofAngle: "Use value, feasibility, risk, data readiness and adoption effort to decide what starts now.",
    cta: "If this is a live issue, use the free assistant to sharpen the question, then book the $350 Diagnostic Pack for tailored judgement."
  },
  {
    theme: "Process mining and automation benefits",
    buyerProblem: "Process mining shows variation, but automation benefits do not land unless Finance standardises the right work first.",
    audience: "Finance Process Owner, GBS Finance, Controller",
    proofAngle: "The practical sequence is map the work, understand variation, standardise what matters, then automate stable patterns.",
    cta: "Use the assistant to frame the process question; use the Diagnostic Pack to decide the roadmap and adoption path."
  },
  {
    theme: "FP&A forecasting and trust",
    buyerProblem: "AI forecasting can improve speed, but leaders hesitate when the forecast becomes a black box.",
    audience: "CFO, FP&A Director, Finance Business Partnering leader",
    proofAngle: "Decision-sensitive use cases need transparent assumptions, challenge points and human ownership.",
    cta: "The Diagnostic Pack helps separate useful augmentation from high-risk automation."
  },
  {
    theme: "Controls and governance",
    buyerProblem: "Finance AI risk increases when controls are added after the pilot rather than designed into the workflow.",
    audience: "Controller, Finance Risk, Finance Transformation Director",
    proofAngle: "Trust is created by evidence: decision rights, escalation rules, audit trail and quality checks.",
    cta: "If controls and adoption are blocking scale, start with the $350 Diagnostic Pack."
  },
  {
    theme: "Finance operating model",
    buyerProblem: "AI changes the work before it changes the organisation chart.",
    audience: "CFO, Finance Architecture, Operating Model leader",
    proofAngle: "The key design question is what moves to automation, what moves to review, and where human judgement remains central.",
    cta: "Use the paid diagnostic to turn the operating model question into a sequenced next step."
  },
  {
    theme: "Programme oversight",
    buyerProblem: "AI activity can increase while measurable Finance value remains fragmented.",
    audience: "CFO, Transformation Director, PMO/TMO leader",
    proofAngle: "Oversight should track adoption health, quality, time saved, controls strengthened and decisions improved.",
    cta: "The Diagnostic Pack is the fastest route to pressure-test value, feasibility and governance."
  }
];

const followUps = [
  {
    scenario: "Clicked Diagnostic Pack, no booking",
    route: "Paid Diagnostic Pack",
    draft: `Thanks for taking a look at the AI Finance Diagnostic Pack.\n\nIf this is a live Finance AI decision, the next step is deliberately simple: book the fixed-price pack and use the diagnostic tool before the session so the paid hour focuses on judgement, sequencing and next actions.\n\nDiagnostic Pack: ${links.diagnostic}\n\nIf you are not ready to book, use the free assistant first to sharpen the question.`
  },
  {
    scenario: "Used assistant or resource",
    route: "Assistant to paid pack",
    draft: `Good first step using the AI Finance Playbook / resources.\n\nThe point of the free preparation is to sharpen the question, not to replace tailored judgement. If the issue now feels live enough to need an independent view, the paid Diagnostic Pack is the route I use.\n\nDiagnostic Pack: ${links.diagnostic}`
  },
  {
    scenario: "Future fit",
    route: "Nurture",
    draft: `This sounds relevant, but perhaps not yet urgent enough for paid diagnostic work.\n\nA useful self-serve next step is to clarify which Finance decision or process is affected, what would make the use case valuable, and what adoption, data or control risk would stop it landing.\n\nWhen this becomes a live decision, the paid Diagnostic Pack is the route for tailored judgement.`
  },
  {
    scenario: "Poor fit",
    route: "Close loop",
    draft: `Thanks for reaching out. I am focused on paid AI Finance Transformation advisory for senior Finance leaders with live roadmap, adoption, governance or operating model questions, so I am probably not the right route for this.\n\nYou may still find the free resources useful here: ${links.site}`
  }
];

function dayIndex(date) {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((today - start) / 86400000);
}

function postDraft(item, variant) {
  const openings = [
    `The Finance AI question is rarely "which tool?" It is usually: where is the value, what is ready, what is risky, and who owns the judgement?`,
    `A pattern I keep seeing in AI Finance Transformation: teams move quickly into pilots before they have sequenced the roadmap.`,
    `If AI is going to land in Finance, it has to earn trust through workflow design, controls and adoption, not enthusiasm alone.`,
    `Before funding another AI Finance pilot, Finance leaders should ask whether the use case is productive, decision-sensitive, or simply not ready yet.`,
    `The hidden cost of AI in Finance is not only technical failure. It is unpaid attention, scattered pilots and workflows that never change.`
  ];
  return `${openings[variant % openings.length]}\n\nProblem: ${item.buyerProblem}\n\nPractical lens: ${item.proofAngle}\n\nAudience this matters for: ${item.audience}.\n\nBounded next step: ${item.cta}\n\nDiagnostic Pack: ${links.diagnostic}`;
}

function buildPack() {
  const now = new Date();
  const index = dayIndex(now);
  const chosen = themes[index % themes.length];
  const secondary = themes[(index + 2) % themes.length];
  const posts = Array.from({ length: 5 }, (_, i) => ({
    id: `post-${i + 1}`,
    theme: i < 3 ? chosen.theme : secondary.theme,
    channel: "LinkedIn",
    draft: postDraft(i < 3 ? chosen : secondary, index + i),
    status: "ready_to_schedule"
  }));

  return {
    generatedAt: now.toISOString(),
    operatingRule: "Zero unpaid interaction: no free calls, no bespoke advice in DMs, no unpaid document reviews.",
    primaryPaidRoute: links.diagnostic,
    freePreparationRoute: links.assistant,
    dailyTheme: chosen,
    secondaryTheme: secondary,
    dailyActions: [
      "Schedule or publish one ready post.",
      "Use the remaining posts as comments or queue material.",
      "Paste inbound LinkedIn messages into Inbound Triage before replying.",
      "Only route high-intent contacts to the paid Diagnostic Pack.",
      "Send possible-fit contacts to the free assistant first.",
      "Generate a bounded follow-up for any buyer who engaged but did not book.",
      "Export the console report at week end."
    ],
    followUps,
    outboundFilter: {
      targetRoles: [
        "CFO",
        "Finance Director",
        "VP / Director FP&A",
        "Finance Transformation Director",
        "Group Controller",
        "Finance Architecture leader",
        "GBS Finance leader"
      ],
      buyingTriggers: [
        "AI Finance roadmap",
        "process mining",
        "future-state Finance",
        "forecasting improvement",
        "controls and governance",
        "Finance operating model",
        "automation benefits"
      ],
      disqualifiers: [
        "wants a free call",
        "student/career request",
        "vendor pitch",
        "no live Finance problem",
        "no ability or willingness to pay"
      ]
    },
    posts
  };
}

function writeOutputs(pack) {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(packPath, `${JSON.stringify(pack, null, 2)}\n`);
  fs.writeFileSync(
    reportPath,
    `# STNM Daily Traffic Brief\n\nGenerated: ${pack.generatedAt}\n\n## Theme\n\n${pack.dailyTheme.theme}\n\n## Buyer Problem\n\n${pack.dailyTheme.buyerProblem}\n\n## Proof Angle\n\n${pack.dailyTheme.proofAngle}\n\n## Operating Rule\n\n${pack.operatingRule}\n\n## Paid Route\n\n${pack.primaryPaidRoute}\n\n## Ready Posts\n\n${pack.posts.map((post, i) => `### ${i + 1}. ${post.theme}\n\n${post.draft}`).join("\n\n")}\n\n## Bounded Follow-Up Templates\n\n${pack.followUps.map((followUp, i) => `### ${i + 1}. ${followUp.scenario}\n\nRoute: ${followUp.route}\n\n${followUp.draft}`).join("\n\n")}\n`
  );
}

writeOutputs(buildPack());
