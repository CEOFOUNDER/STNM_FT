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

const dailyMoves = [
  "Publish one buyer-problem LinkedIn post with a Diagnostic Pack CTA.",
  "Comment on 10 CFO, FP&A or Finance transformation posts without giving bespoke advice.",
  "Classify every inbound LinkedIn message as high, possible, low or no potential.",
  "Route high-intent enquiries to the paid Diagnostic Pack. No free calls.",
  "Prepare or refresh one ad angle or lead form question.",
  "Log actions and review whether traffic created assistant clicks or Diagnostic Pack clicks."
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
  document.querySelector("#classifyInbound").addEventListener("click", classifyInbound);
  document.querySelector("#clearInbound").addEventListener("click", () => {
    document.querySelector("#inboundMessage").value = "";
    document.querySelector("#classificationTitle").textContent = "No enquiry classified yet";
    document.querySelector("#classificationBadge").className = "score-pill";
    document.querySelector("#classificationBadge").textContent = "Pending";
    document.querySelector("#classificationDetail").textContent = "The reply will appear here.";
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
setupEvents();
renderMetrics();
renderReport();
