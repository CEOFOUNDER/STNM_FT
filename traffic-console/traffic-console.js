const stateKey = "stnmTrafficConsoleLog";

const links = {
  site: "https://www.seethenextmove.com/",
  diagnostic: "https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone",
  assistant: "https://chatgpt.com/g/g-67bbc67babd4819199ee183bf8b7588c-ai-finance-playbook-for-finance-leaders"
};

const themes = [
  {
    name: "AI use case prioritisation",
    problem: "Finance teams are creating AI pilot sprawl without a decision lens.",
    insight: "The roadmap should separate productivity use cases from decision-sensitive workflows.",
    proof: "Use value, feasibility, risk, data readiness and adoption effort as the first screen."
  },
  {
    name: "Process mining and standardisation",
    problem: "Process mining creates maps, but Finance still struggles to land automation benefits.",
    insight: "Variation has to be understood, governed and reduced before automation can scale.",
    proof: "The right sequence is map the work, standardise what matters, then automate the stable patterns."
  },
  {
    name: "FP&A forecasting and trust",
    problem: "AI forecasting can improve speed, but leaders hesitate when the forecast becomes a black box.",
    insight: "AI should support the forecast narrative, not replace accountability for the judgement.",
    proof: "Decision-sensitive use cases need transparent assumptions, challenge points and human ownership."
  },
  {
    name: "Controls and governance",
    problem: "Finance AI fails when controls are added after the pilot rather than designed into the work.",
    insight: "Controls, audit trail, escalation and accountability should be part of the agent specification.",
    proof: "Trust is created by evidence, not reassurance."
  },
  {
    name: "Finance operating model",
    problem: "AI changes the work before it changes the organisation chart.",
    insight: "The operating model question is which work moves to automation, which work moves to review, and which judgement remains human.",
    proof: "That is why AI transformation has to be sequenced with process ownership and adoption built in."
  },
  {
    name: "Programme oversight",
    problem: "AI activity can increase while measurable Finance value stays fragmented.",
    insight: "Programme oversight should track adoption health, quality, time saved, controls strengthened and decisions improved.",
    proof: "Delivery milestones are not enough when the work itself is changing."
  }
];

const inboundRules = [
  {
    category: "High Potential",
    className: "high",
    score: 8,
    signals: [
      "cfo", "finance director", "fd", "exco", "board", "project", "budget", "procurement",
      "roadmap", "operating model", "architecture", "governance", "adoption", "programme",
      "transformation", "bank", "regulated", "workshop", "paid", "consulting", "diagnostic"
    ],
    reply: `Hi [Name],\n\nMany thanks for reaching out. This sounds like a live Finance transformation question where sequencing, adoption and governance really matter.\n\nThe best next step is the paid AI Finance Diagnostic Pack here:\n\n${links.diagnostic}\n\nYou can also prepare first using the free AI Finance Playbook assistant at:\n\n${links.site}\n\nWarm regards,\n\nGilles`
  },
  {
    category: "Possible Potential",
    className: "possible",
    score: 5,
    signals: [
      "process mining", "automation", "fp&a", "forecast", "reporting", "close", "reconciliation",
      "controls", "business partnering", "uipath", "ai data", "process mapping", "best practice",
      "capability", "standardise", "benefits"
    ],
    reply: `Hi [Name],\n\nMany thanks for reaching out. This is exactly the type of question I built the AI Finance Playbook for.\n\nA good first step is to use the free assistant at ${links.site} and paste your question there.\n\nIf you need tailored advice after that, you can book the paid AI Finance Diagnostic Pack from the website.\n\nWarm regards,\n\nGilles`
  },
  {
    category: "Low Potential",
    className: "low",
    score: 2,
    signals: [
      "network", "career", "student", "mentor", "pick your brain", "quick call", "free", "advice",
      "cv", "resume", "job search", "vendor"
    ],
    reply: `Hi [Name],\n\nMany thanks for reaching out. I am currently focused on paid advisory work for Finance leaders around AI-enabled Finance Transformation, so I may not be the right person for this.\n\nA useful starting point may be the free resources at ${links.site}.\n\nWishing you well,\n\nGilles`
  },
  {
    category: "No Potential",
    className: "no",
    score: 0,
    signals: ["spam", "crypto", "investment scheme", "personal favour", "irrelevant"],
    reply: `Hi [Name],\n\nThanks for the note. I am not able to support this, but you may find the free resources at ${links.site} useful.\n\nBest wishes,\n\nGilles`
  }
];

const followUpTemplates = [
  {
    id: "clicked_no_booking",
    label: "Clicked Diagnostic Pack, no booking",
    route: "Paid Diagnostic Pack",
    body: ({ name, context }) => `Hi ${name || "[Name]"},

Thanks for taking a look at the AI Finance Diagnostic Pack.

If this is a live Finance AI decision, the next step is deliberately simple: book the fixed-price pack and use the diagnostic tool before the session so the paid hour focuses on judgement, sequencing and next actions.

Diagnostic Pack:
${links.diagnostic}

${context ? `Context noted: ${context}\n\n` : ""}If you are not ready to book, use the free assistant first to sharpen the question and come back when the issue is specific enough to justify paid expert time.

Warm regards,

Gilles`
  },
  {
    id: "assistant_used",
    label: "Used assistant or resource",
    route: "Assistant to paid pack",
    body: ({ name, context }) => `Hi ${name || "[Name]"},

Good first step using the AI Finance Playbook / resources.

The point of the free preparation is to sharpen the question, not to replace tailored judgement. If the issue now feels live enough to need an independent view, the paid Diagnostic Pack is the route I use.

It covers value, feasibility, risk, data readiness, adoption, governance and the next 30-day actions.

Diagnostic Pack:
${links.diagnostic}

${context ? `Your stated focus: ${context}\n\n` : ""}Warm regards,

Gilles`
  },
  {
    id: "future_fit",
    label: "Future fit nurture",
    route: "Nurture",
    body: ({ name, context }) => `Hi ${name || "[Name]"},

This sounds relevant, but perhaps not yet urgent enough for paid diagnostic work.

A useful self-serve next step is to keep the question focused on three things:

1. Which Finance decision or process is affected?
2. What would make the use case valuable enough to prioritise?
3. What adoption, data or control risk would stop it landing?

The free assistant can help you prepare:
${links.site}

When this becomes a live decision, the paid Diagnostic Pack is the route for tailored judgement:
${links.diagnostic}

${context ? `Context: ${context}\n\n` : ""}Warm regards,

Gilles`
  },
  {
    id: "poor_fit_close",
    label: "Poor fit close",
    route: "Close loop",
    body: ({ name }) => `Hi ${name || "[Name]"},

Thanks for reaching out.

I am focused on paid AI Finance Transformation advisory for senior Finance leaders with live roadmap, adoption, governance or operating model questions, so I am probably not the right route for this.

You may still find the free resources useful here:
${links.site}

Best wishes,

Gilles`
  },
  {
    id: "post_session_upsell",
    label: "Post-session paid follow-on",
    route: "Paid follow-on",
    body: ({ name, context }) => `Hi ${name || "[Name]"},

Thanks for completing the AI Finance Diagnostic Pack.

The diagnostic should now give you a clearer view of the immediate priorities. If you want further support, the next step should be scoped as paid follow-on work around the specific decision or roadmap area that matters most.

Useful follow-on areas include roadmap sequencing, use case prioritisation, operating model design, adoption planning, controls and programme oversight.

${context ? `Likely follow-on focus: ${context}\n\n` : ""}Warm regards,

Gilles`
  }
];

const dailyMoves = [
  "Publish one buyer-problem LinkedIn post with a Diagnostic Pack CTA.",
  "Comment on 10 CFO, FP&A or Finance transformation posts without giving bespoke advice.",
  "Classify every inbound LinkedIn message as high, possible, low or no potential.",
  "Route high-intent enquiries to the paid Diagnostic Pack. No free calls.",
  "Generate one bounded follow-up for any buyer who engaged but did not book.",
  "Prepare or refresh one ad angle or lead form question.",
  "Log actions and review whether traffic created assistant clicks or Diagnostic Pack clicks."
];

let automatedPack = null;

const packThemes = [
  {
    theme: "AI use case prioritisation",
    buyerProblem: "AI pilot sprawl is creating activity without a clear Finance value case.",
    audience: "CFO, Finance Transformation Director, FP&A Director",
    proofAngle: "Use value, feasibility, risk, data readiness and adoption effort to decide what starts now.",
    cta: "If this is a live issue, use the free assistant to sharpen the question, then book the $750 Diagnostic Pack for tailored judgement."
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
    cta: "If controls and adoption are blocking scale, start with the $750 Diagnostic Pack."
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

function todayString() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date());
}

function getLog() {
  try {
    return JSON.parse(localStorage.getItem(stateKey) || "[]");
  } catch {
    return [];
  }
}

function setLog(log) {
  localStorage.setItem(stateKey, JSON.stringify(log));
  renderMetrics();
  renderReport();
}

function addLog(type, detail) {
  const log = getLog();
  log.unshift({
    timestamp: new Date().toISOString(),
    type,
    detail
  });
  setLog(log.slice(0, 500));
}

function renderMetrics() {
  const log = getLog();
  document.querySelector("#metricPosts").textContent = log.filter((x) => x.type === "content").length;
  document.querySelector("#metricInbound").textContent = log.filter((x) => x.type === "inbound").length;
  document.querySelector("#metricHighIntent").textContent = log.filter((x) => x.detail.includes("High Potential")).length;
  document.querySelector("#metricPaidRoutes").textContent = log.filter((x) => x.detail.toLowerCase().includes("diagnostic")).length;
}

function renderReport() {
  const log = getLog();
  const target = document.querySelector("#activityReport");
  if (!log.length) {
    target.textContent = "No activity logged yet.";
    return;
  }
  target.textContent = log
    .map((item) => `${new Date(item.timestamp).toLocaleString("en-GB")} | ${item.type.toUpperCase()} | ${item.detail}`)
    .join("\n");
}

function setupTabs() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach((b) => b.setAttribute("aria-selected", "false"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.add("hidden"));
      button.setAttribute("aria-selected", "true");
      document.querySelector(`#${button.dataset.tab}`).classList.remove("hidden");
    });
  });
}

function setupDailyMoves() {
  document.querySelector("#todayLabel").textContent = todayString();
  const list = document.querySelector("#dailyMoves");
  list.innerHTML = dailyMoves.map((move, index) => `<li><strong>0${index + 1}</strong> ${move}</li>`).join("");
}

function setupThemes() {
  const select = document.querySelector("#themeSelect");
  select.innerHTML = themes.map((theme, index) => `<option value="${index}">${theme.name}</option>`).join("");
}

function setupFollowupScenarios() {
  const select = document.querySelector("#followupScenario");
  if (!select) return;
  select.innerHTML = followUpTemplates
    .map((template) => `<option value="${template.id}">${template.label}</option>`)
    .join("");
}

function packSummary(pack) {
  const posts = pack.posts || [];
  return [
    `Generated: ${new Date(pack.generatedAt).toLocaleString("en-GB")}`,
    `Theme: ${pack.dailyTheme?.theme || "Not set"}`,
    `Buyer problem: ${pack.dailyTheme?.buyerProblem || "Not set"}`,
    `Proof angle: ${pack.dailyTheme?.proofAngle || "Not set"}`,
    `Follow-up templates: ${pack.followUps?.length || 0}`,
    "",
    "Today's actions:",
    ...(pack.dailyActions || []).map((action, index) => `${index + 1}. ${action}`),
    "",
    "Top ready post:",
    posts[0]?.draft || "No generated post available yet."
  ].join("\n");
}

function londonDate(value) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(value);
}

function isStalePack(pack) {
  if (!pack?.generatedAt) return true;
  return londonDate(new Date(pack.generatedAt)) !== londonDate(new Date());
}

function browserDayIndex(date) {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((today - start) / 86400000);
}

function browserPackPost(item, variant) {
  const openings = [
    `The Finance AI question is rarely "which tool?" It is usually: where is the value, what is ready, what is risky, and who owns the judgement?`,
    `A pattern I keep seeing in AI Finance Transformation: teams move quickly into pilots before they have sequenced the roadmap.`,
    `If AI is going to land in Finance, it has to earn trust through workflow design, controls and adoption, not enthusiasm alone.`,
    `Before funding another AI Finance pilot, Finance leaders should ask whether the use case is productive, decision-sensitive, or simply not ready yet.`,
    `The hidden cost of AI in Finance is not only technical failure. It is unpaid attention, scattered pilots and workflows that never change.`
  ];
  return `${openings[variant % openings.length]}\n\nProblem: ${item.buyerProblem}\n\nPractical lens: ${item.proofAngle}\n\nAudience this matters for: ${item.audience}.\n\nBounded next step: ${item.cta}\n\nDiagnostic Pack: ${links.diagnostic}`;
}

function buildBrowserFallbackPack() {
  const now = new Date();
  const index = browserDayIndex(now);
  const chosen = packThemes[index % packThemes.length];
  const secondary = packThemes[(index + 2) % packThemes.length];
  return {
    generatedAt: now.toISOString(),
    generatedBy: "browser-fallback",
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
      "Generate one bounded follow-up for any buyer who engaged but did not book.",
      "Export the console report at week end."
    ],
    followUps: followUpTemplates.map(({ label, route, body }) => ({
      scenario: label,
      route,
      draft: body({ name: "", context: "" })
    })),
    posts: Array.from({ length: 5 }, (_, i) => ({
      id: `post-${i + 1}`,
      theme: i < 3 ? chosen.theme : secondary.theme,
      channel: "LinkedIn",
      draft: browserPackPost(i < 3 ? chosen : secondary, index + i),
      status: "ready_to_schedule"
    }))
  };
}

async function loadAutomatedPack() {
  const target = document.querySelector("#automatedPackOutput");
  try {
    const response = await fetch("generated/daily-pack.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Pack returned ${response.status}`);
    }
    const fetchedPack = await response.json();
    if (isStalePack(fetchedPack)) {
      automatedPack = buildBrowserFallbackPack();
      target.textContent = `GitHub pack was stale, so the console generated a fresh pack locally today.\n\n${packSummary(automatedPack)}`;
      addLog("automation", `Generated browser fallback pack: ${automatedPack.dailyTheme?.theme || "theme unavailable"}`);
      return;
    }
    automatedPack = fetchedPack;
    target.textContent = packSummary(automatedPack);
    addLog("automation", `Loaded daily traffic pack: ${automatedPack.dailyTheme?.theme || "theme unavailable"}`);
  } catch (error) {
    target.textContent = "The daily GitHub-generated pack is not available yet. Use Generate 5 posts for now, then check the GitHub Actions run.";
  }
}

function postFor(theme, format, index) {
  const starts = {
    "point-of-view": `Finance AI does not fail because the models lack potential. It fails when ${theme.problem.toLowerCase()}`,
    mistake: `A mistake I see in AI Finance transformation: treating ${theme.name.toLowerCase()} as a tool choice before it is a Finance design choice.`,
    checklist: `Before approving an AI Finance use case, I would check five things: value, feasibility, risk, data readiness and adoption effort.`,
    "mini-case": `A practical Finance AI pattern: start with the work, not the model. ${theme.insight}`
  };
  const angles = [
    `${starts[format]}\n\n${theme.insight}\n\n${theme.proof}\n\nIf this is a live issue in your Finance function, use the free assistant to sharpen the question. If you need tailored judgement, book the fixed-price AI Finance Diagnostic Pack.`,
    `${theme.problem}\n\nThe answer is not to run more pilots. The answer is to sequence the roadmap.\n\n${theme.insight}\n\nThe paid Diagnostic Pack is designed for Finance leaders who need a practical next-step view, not a generic AI conversation.`,
    `The Finance AI question is rarely "which tool?"\n\nIt is usually:\n\n1. Where is the value?\n2. What data is ready?\n3. What risk needs controlling?\n4. Who owns the judgement?\n5. What must change in the workflow?\n\n${theme.proof}\n\nUse the free assistant first, then book the Diagnostic Pack if this is a live decision.`,
    `If AI is going to land in Finance, it has to earn trust.\n\n${theme.insight}\n\nThat means clear use case prioritisation, human accountability, controls by design and measurable value.\n\nFor tailored advice, start with the fixed-price Diagnostic Pack.`,
    `${theme.name} is not a side experiment.\n\n${theme.problem}\n\n${theme.insight}\n\nThat is the difference between AI activity and AI Finance transformation.\n\nThe next step is simple: prepare with the free assistant or start the paid Diagnostic Pack.`
  ];
  return angles[index % angles.length];
}

function generatePosts() {
  const theme = themes[Number(document.querySelector("#themeSelect").value)];
  const format = document.querySelector("#formatSelect").value;
  const posts = Array.from({ length: 5 }, (_, index) => postFor(theme, format, index));
  document.querySelector("#postOutput").innerHTML = posts
    .map((post, index) => `<article class="post-card"><p class="console-kicker">Post ${index + 1}</p><p>${post.replace(/\n/g, "<br>")}</p><button class="console-button" data-copy-post="${index}">Copy post</button></article>`)
    .join("");
  document.querySelectorAll("[data-copy-post]").forEach((button) => {
    button.addEventListener("click", () => {
      const post = posts[Number(button.dataset.copyPost)];
      navigator.clipboard?.writeText(post);
      addLog("content", `Post copied: ${theme.name}`);
    });
  });
  addLog("content", `Generated 5 posts: ${theme.name}`);
}

function classifyMessage(message) {
  const text = message.toLowerCase();
  const matches = inboundRules.map((rule) => ({
    ...rule,
    matchedSignals: rule.signals.filter((signal) => text.includes(signal.toLowerCase()))
  }));
  matches.sort((a, b) => b.matchedSignals.length * b.score - a.matchedSignals.length * a.score);
  const best = matches.find((rule) => rule.matchedSignals.length > 0) || inboundRules[3];
  return best;
}

function classifyInbound() {
  const message = document.querySelector("#inboundMessage").value.trim();
  if (!message) {
    document.querySelector("#classificationDetail").textContent = "Paste a message first.";
    return;
  }
  const result = classifyMessage(message);
  document.querySelector("#classificationTitle").textContent = result.category;
  const badge = document.querySelector("#classificationBadge");
  badge.className = `score-pill ${result.className}`;
  badge.textContent = result.matchedSignals?.length ? `Signals: ${result.matchedSignals.join(", ")}` : "No strong signal";
  document.querySelector("#classificationDetail").textContent = result.reply;
  addLog("inbound", `${result.category}: ${result.matchedSignals?.join(", ") || "no signal"} | Route: ${result.category === "High Potential" ? "Diagnostic Pack" : "Self-serve / bounded"}`);
}

function scoreProspect() {
  const score =
    Number(document.querySelector("#roleScore").value) +
    Number(document.querySelector("#companyScore").value) +
    Number(document.querySelector("#triggerScore").value) +
    Number(document.querySelector("#commercialScore").value);

  let label = "No unpaid interaction";
  let draft = `Thanks for connecting. I am focused on paid AI Finance Transformation advisory for live Finance decisions, so the best self-serve starting point is ${links.site}.`;

  if (score >= 10) {
    label = "High potential: route directly to paid Diagnostic Pack";
    draft = `Thanks for connecting. Given the Finance AI / transformation angle, the most efficient next step is not an unpaid call. I use a fixed-price AI Finance Diagnostic Pack to clarify value, feasibility, data readiness, adoption risk, controls and roadmap sequencing.\n\nIf this is a live issue, you can book here:\n${links.diagnostic}`;
  } else if (score >= 7) {
    label = "Possible potential: assistant first, paid pack second";
    draft = `Thanks for connecting. A good first step is to use the free AI Finance Playbook assistant and paste the Finance AI question there:\n\n${links.site}\n\nIf the issue is live and you need tailored judgement, the next step is the paid Diagnostic Pack.`;
  }

  document.querySelector("#prospectOutput").textContent = `Score: ${score}/12\nDecision: ${label}\n\nManual message draft:\n\n${draft}`;
  addLog("outreach", `${label} | Score ${score}/12`);
}

function generateFollowup() {
  const scenario = document.querySelector("#followupScenario")?.value;
  const name = document.querySelector("#followupName")?.value.trim();
  const context = document.querySelector("#followupContext")?.value.trim();
  const template = followUpTemplates.find((item) => item.id === scenario) || followUpTemplates[0];
  const message = template.body({ name, context });
  document.querySelector("#followupOutput").textContent = message;
  addLog("followup", `${template.label} | Route: ${template.route}`);
}

function buildUtm() {
  const source = encodeURIComponent(document.querySelector("#utmSource").value.trim() || "linkedin");
  const campaign = encodeURIComponent(document.querySelector("#utmCampaign").value.trim() || "ai_finance_diagnostic");
  const content = encodeURIComponent(document.querySelector("#utmContent").value.trim() || "manual_post");
  const url = `${links.diagnostic}?utm_source=${source}&utm_medium=cta&utm_campaign=${campaign}&utm_content=${content}`;
  document.querySelector("#utmOutput").textContent = url;
  navigator.clipboard?.writeText(url);
  addLog("tracking", `Built UTM link: ${content}`);
}

function exportCsv() {
  const log = getLog();
  const csv = [
    "timestamp,type,detail",
    ...log.map((item) => [item.timestamp, item.type, item.detail].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `stnm-traffic-console-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function setupEvents() {
  document.querySelector("#generatePosts").addEventListener("click", generatePosts);
  document.querySelector("#copyAutomatedPost").addEventListener("click", () => {
    const post = automatedPack?.posts?.[0]?.draft;
    if (post) {
      navigator.clipboard?.writeText(post);
      addLog("content", `Copied automated post: ${automatedPack.dailyTheme?.theme || "daily pack"}`);
    }
  });
  document.querySelector("#copyAutomatedBrief").addEventListener("click", () => {
    if (automatedPack) {
      navigator.clipboard?.writeText(packSummary(automatedPack));
      addLog("content", "Copied automated daily traffic brief");
    }
  });
  document.querySelector("#classifyInbound").addEventListener("click", classifyInbound);
  document.querySelector("#clearInbound").addEventListener("click", () => {
    document.querySelector("#inboundMessage").value = "";
    document.querySelector("#classificationTitle").textContent = "No enquiry classified yet";
    document.querySelector("#classificationBadge").className = "score-pill";
    document.querySelector("#classificationBadge").textContent = "Pending";
    document.querySelector("#classificationDetail").textContent = "The reply will appear here.";
  });
  document.querySelector("#generateFollowup")?.addEventListener("click", generateFollowup);
  document.querySelector("#copyFollowup")?.addEventListener("click", () => {
    const text = document.querySelector("#followupOutput")?.textContent || "";
    if (text && !text.includes("Select a scenario")) {
      navigator.clipboard?.writeText(text);
      addLog("followup", "Copied bounded follow-up");
    }
  });
  document.querySelector("#scoreProspect").addEventListener("click", scoreProspect);
  document.querySelector("#buildUtm").addEventListener("click", buildUtm);
  document.querySelector("#copyReport").addEventListener("click", () => {
    navigator.clipboard?.writeText(document.querySelector("#activityReport").textContent);
  });
  document.querySelector("#exportCsv").addEventListener("click", exportCsv);
  document.querySelector("#clearLog").addEventListener("click", () => {
    if (confirm("Clear the local activity log in this browser?")) {
      setLog([]);
    }
  });
  document.querySelectorAll("[data-log]").forEach((button) => {
    button.addEventListener("click", () => addLog("action", button.dataset.log));
  });
}

setupTabs();
setupDailyMoves();
setupThemes();
setupFollowupScenarios();
setupEvents();
loadAutomatedPack();
renderMetrics();
renderReport();
