const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const GA4_MEASUREMENT_ID = "G-LJ5M3XRTKQ";
const analyticsConfig = window.STNM_ANALYTICS || { ga4MeasurementId: GA4_MEASUREMENT_ID };

if (analyticsConfig.ga4MeasurementId) {
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4MeasurementId}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", analyticsConfig.ga4MeasurementId);
}

const resourcesSection = document.querySelector("#resources");

if (resourcesSection && !document.querySelector("#real-use-cases")) {
  if (!document.querySelector("#real-use-cases-style")) {
    const useCaseStyle = document.createElement("style");
    useCaseStyle.id = "real-use-cases-style";
    useCaseStyle.textContent = `
      .use-cases-section { max-width: none; background: #f4f7fb; }
      .use-cases-section > * { max-width: var(--max); margin-left: auto; margin-right: auto; }
      .interview-frame { display: grid; grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr); gap: 28px; align-items: start; margin-bottom: 24px; padding: 28px; border: 1px solid var(--line); border-radius: 8px; background: #fff; box-shadow: 0 20px 60px rgba(11, 18, 32, 0.08); }
      .video-frame { position: relative; overflow: hidden; min-height: 300px; border-radius: 8px; background: var(--ink); }
      .video-frame::before { display: block; padding-top: 56.25%; content: ""; }
      .video-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
      .growcfo-now-playing { display: flex; gap: 12px; align-items: flex-start; min-height: 58px; margin-top: 14px; }
      .growcfo-now-ts { min-width: 54px; margin-top: 2px; color: var(--teal); font-family: monospace; font-size: 0.78rem; font-weight: 800; }
      .growcfo-now-title { margin: 0; color: var(--ink); font-size: 0.95rem; font-weight: 850; }
      .growcfo-now-desc { margin: 3px 0 0; color: var(--muted); font-size: 0.84rem; line-height: 1.5; }
      .growcfo-part-label { margin: 0 0 10px; color: var(--teal); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.11em; text-transform: uppercase; }
      .growcfo-part-label.second { margin-top: 28px; }
      .growcfo-chapter-list { margin: 0; padding: 0; border-top: 1px solid var(--line); list-style: none; }
      .growcfo-chapter-btn { width: 100%; display: flex; gap: 10px; align-items: flex-start; padding: 10px 10px 10px 12px; border: 0; border-bottom: 1px solid var(--line); border-left: 3px solid transparent; color: var(--ink); background: #fff; text-align: left; font: inherit; cursor: pointer; }
      .growcfo-chapter-btn:hover, .growcfo-chapter-btn.active { background: var(--soft); }
      .growcfo-chapter-btn.active { border-left-color: var(--ink); }
      .growcfo-chapter-ts { min-width: 54px; margin-top: 2px; color: var(--muted); font-family: monospace; font-size: 0.72rem; }
      .growcfo-chapter-btn.active .growcfo-chapter-ts { color: var(--teal); font-weight: 800; }
      .growcfo-chapter-name { color: var(--ink); font-size: 0.88rem; font-weight: 600; line-height: 1.35; }
      .growcfo-chapter-btn.active .growcfo-chapter-name { font-weight: 850; }
      @media (max-width: 860px) { .interview-frame { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(useCaseStyle);
  }

  const resourcesHeading = resourcesSection.querySelector(".section-heading");

  if (resourcesHeading && !resourcesHeading.querySelector('a[href="#real-use-cases"]')) {
    const actionWrap = document.createElement("div");
    actionWrap.className = "hero-actions";
    actionWrap.innerHTML = '<a class="button secondary" href="#real-use-cases">Explore Real AI Use Cases</a>';
    resourcesHeading.appendChild(actionWrap);
  }

  const useCasesSection = document.createElement("section");
  useCasesSection.className = "section use-cases-section";
  useCasesSection.id = "real-use-cases";
  useCasesSection.innerHTML = `
    <div class="section-heading">
      <p class="section-kicker">Verifiable Use Cases</p>
      <h2>AI use cases in Finance mapped to APQC finance processes.</h2>
      <p>
        A practical evidence base for Finance leaders: real examples, public sources, scope
        and benefits that can be used to challenge where AI belongs on the roadmap.
      </p>
    </div>
    <div class="interview-frame">
      <div>
        <div class="video-frame" aria-label="GrowCFO AI Finance interview video">
          <iframe
            id="growcfo-player"
            src="https://www.youtube.com/embed/las4ugear3s?rel=0&modestbranding=1"
            title="GrowCFO interview with Gilles Bonelli on AI Finance Transformation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>
        <div class="growcfo-now-playing">
          <span class="growcfo-now-ts" id="growcfo-now-ts">0:00</span>
          <div>
            <p class="growcfo-now-title" id="growcfo-now-title">Practical uses of AI in Finance</p>
            <p class="growcfo-now-desc" id="growcfo-now-desc">GrowCFO interview with Gilles Bonelli on moving beyond AI hype into Finance use cases, process choices and adoption.</p>
          </div>
        </div>
      </div>
      <div class="growcfo-chapters" aria-label="GrowCFO interview chapters">
        <p class="growcfo-part-label">Part 1 - Context and methodology</p>
        <ul class="growcfo-chapter-list">
          <li><button class="growcfo-chapter-btn active" type="button" data-start="0" data-ts="0:00" data-title="Practical uses of AI in Finance" data-desc="GrowCFO interview with Gilles Bonelli on moving beyond AI hype into Finance use cases, process choices and adoption."><span class="growcfo-chapter-ts">0:00</span><span class="growcfo-chapter-name">Practical uses of AI in Finance</span></button></li>
          <li><button class="growcfo-chapter-btn" type="button" data-start="588" data-ts="9:48" data-title="Why See The Next Move exists" data-desc="The mission: cut through AI hype and help Finance leaders identify real use cases that can be sequenced and implemented."><span class="growcfo-chapter-ts">9:48</span><span class="growcfo-chapter-name">Why See The Next Move exists</span></button></li>
          <li><button class="growcfo-chapter-btn" type="button" data-start="677" data-ts="11:17" data-title="How real use cases are identified" data-desc="How practitioner insight and a finance network are used to separate credible use cases from generic AI claims."><span class="growcfo-chapter-ts">11:17</span><span class="growcfo-chapter-name">How real use cases are identified</span></button></li>
        </ul>
        <p class="growcfo-part-label second">Part 2 - Use cases and adoption</p>
        <ul class="growcfo-chapter-list">
          <li><button class="growcfo-chapter-btn" type="button" data-start="1080" data-ts="18:00" data-title="Three families of Finance AI use cases" data-desc="Personal and team productivity, new AI-enabled capabilities, and process optimisation across Finance workflows."><span class="growcfo-chapter-ts">18:00</span><span class="growcfo-chapter-name">Three families of Finance AI use cases</span></button></li>
          <li><button class="growcfo-chapter-btn" type="button" data-start="1500" data-ts="25:00" data-title="Data, process mining and automation readiness" data-desc="Why data quality, process variation and workflow design matter before AI can scale safely in Finance."><span class="growcfo-chapter-ts">25:00</span><span class="growcfo-chapter-name">Data, process mining and automation readiness</span></button></li>
          <li><button class="growcfo-chapter-btn" type="button" data-start="2186" data-ts="36:26" data-title="Can AI solve long-standing Finance challenges?" data-desc="A closing challenge on month-end, forecasting and the Finance problems that technology alone has not solved."><span class="growcfo-chapter-ts">36:26</span><span class="growcfo-chapter-name">Can AI solve long-standing Finance challenges?</span></button></li>
        </ul>
      </div>
    </div>
    <div class="use-case-table-wrap" role="region" aria-label="Verifiable AI use cases in Finance" tabindex="0">
      <table class="use-case-table">
        <thead>
          <tr>
            <th>APQC finance process area</th>
            <th>Company</th>
            <th>Process(es)</th>
            <th>Technology used</th>
            <th>Verifiable live link</th>
            <th>Scope</th>
            <th>Benefits achieved</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planning, budgeting and management accounting</td>
            <td>Philips</td>
            <td>Digital P&amp;L, sales planning, cost-of-sales planning and planning-system prefill.</td>
            <td>Machine learning planning models, digital drivers and predictive cost modelling.</td>
            <td><a href="https://fpa-trends.com/article/digital-finance-philips-case-study" target="_blank" rel="noopener noreferrer">FP&amp;A Trends case study</a></td>
            <td>Philips Finance / FP&amp;A Centre of Excellence using AI/ML to support planning predictions.</td>
            <td>Public source confirms predictive planning, cost-of-sales prefill and backfilling of planning systems; no quantified KPI disclosed.</td>
          </tr>
          <tr>
            <td>Revenue accounting / accounts receivable / cash application</td>
            <td>Capgemini, for a large global client</td>
            <td>Cash application, payment allocation, collections visibility and credit release.</td>
            <td>BlackLine Invoice-to-Cash, AI-enabled cash application and auto-allocation.</td>
            <td><a href="https://images.g2crowd.com/uploads/attachment/file/1444336/Capgemini-Client---Case-Study.pdf" target="_blank" rel="noopener noreferrer">BlackLine / Capgemini case study</a></td>
            <td>Global BPO environment across SAP and Oracle; 48 countries in 12 months and a further 51 countries in 10 months.</td>
            <td>15m+ payments and GBP 5bn processed annually without manual allocation; 26% productivity improvement; 40% operating cost reduction; auto-matching over 90% in Europe and over 80% globally.</td>
          </tr>
          <tr>
            <td>General accounting and reporting / record-to-report</td>
            <td>Blackbaud</td>
            <td>Journal entries, month-end close, financial analysis and integration simplification.</td>
            <td>Workday Financial Management automation; primarily automation-led rather than isolated AI benefit.</td>
            <td><a href="https://www.workday.com/en-us/customer-stories/a-h/blackbaud-faster-financial-analysis-drives-connection.html" target="_blank" rel="noopener noreferrer">Workday customer story</a></td>
            <td>Finance platform transformation for a software company managing growth and acquisitions.</td>
            <td>Journal entries reduced by more than 25%; on-time close maintained with fewer manual steps; faster financial analysis.</td>
          </tr>
          <tr>
            <td>Fixed-asset project accounting / lease accounting</td>
            <td>Trullion / Nakisa</td>
            <td>Lease document extraction, fixed-asset and lease-accounting compliance support and audit trail creation.</td>
            <td>AI document extraction, natural language processing and lease-accounting automation.</td>
            <td><a href="https://trullion.com/lease-accounting-abstraction/" target="_blank" rel="noopener noreferrer">Trullion</a> / <a href="https://www.nakisa.com/products/lease-accounting-software/" target="_blank" rel="noopener noreferrer">Nakisa</a></td>
            <td>Lease and fixed-asset accounting workflows where contracts and asset data need to be extracted, validated and reported.</td>
            <td>Public vendor evidence supports reduced manual data entry, stronger audit trail and improved reporting; named customer metrics vary by source.</td>
          </tr>
          <tr>
            <td>Payroll</td>
            <td>ADP / Workday with PwC</td>
            <td>Payroll validation, payroll compliance and global payroll process automation.</td>
            <td>AI-enabled payroll datasets, compliance automation and global payroll integration.</td>
            <td><a href="https://www.adp.com/what-we-offer/ai-solutions.aspx" target="_blank" rel="noopener noreferrer">ADP AI payroll</a> / <a href="https://www.pwc.com/gx/en/about/case-studies/workday-seamless-global-payroll-integration.html" target="_blank" rel="noopener noreferrer">Workday/PwC case</a></td>
            <td>Global payroll operations, including Workday/PwC support across 31 countries.</td>
            <td>Public sources support automation, compliance and accurate pay across countries; named quantified AI payroll benefits are limited in public evidence.</td>
          </tr>
          <tr>
            <td>Accounts payable and expense reimbursements</td>
            <td>Belden</td>
            <td>Invoice capture, validation, coding, routing and exception handling.</td>
            <td>Basware AI and self-learning invoice automation.</td>
            <td><a href="https://customer.basware.com/en/how-ai-took-beldens-invoice-processing-from-7-days-to-1-and-keeps-getting-faster?hs_amp=true" target="_blank" rel="noopener noreferrer">Basware case study</a></td>
            <td>AP invoice lifecycle for a global signal-transmission and networking company.</td>
            <td>Invoice processing reduced from 7 days to 1-2 days; visibility improved from 48 hours to 10 minutes; most US invoices became touch-free.</td>
          </tr>
          <tr>
            <td>Accounts payable and expense reimbursements</td>
            <td>Adyen</td>
            <td>Invoice intake, duplicate checks, tax coding, cost-centre coding, PO matching and IBAN validation.</td>
            <td>Rossum intelligent document processing integrated with Workday and Coupa.</td>
            <td><a href="https://rossum.ai/customer-stories/adyen/" target="_blank" rel="noopener noreferrer">Rossum / Adyen case study</a></td>
            <td>100,000+ invoice pages per year across suppliers in 23 countries.</td>
            <td>65-70% invoice automation; 93.4% extraction accuracy; errors reduced by 20.5%; AP team reduced to 7 FTE.</td>
          </tr>
          <tr>
            <td>Treasury operations</td>
            <td>Amazon</td>
            <td>Cash-flow forecasting, liquidity planning, bank connectivity and treasury visibility.</td>
            <td>Kyriba treasury management, data streaming, ML cash forecasting, AWS and Bank of America connectivity.</td>
            <td><a href="https://www.kyriba.com/resource/amazon-adam-smith-awards-2023-machine-learning-forecasting-solution/" target="_blank" rel="noopener noreferrer">Kyriba / Amazon treasury case</a></td>
            <td>Amazon Treasury connected to more than 100 banks worldwide.</td>
            <td>Improved liquidity efficiency, cost savings, time savings, process efficiency, visibility, risk mitigation and reduced manual intervention; no quantified benefit metric disclosed.</td>
          </tr>
          <tr>
            <td>Treasury operations</td>
            <td>JPMorgan, for corporate treasury clients</td>
            <td>Cash-flow analysis and forecasting.</td>
            <td>Cash Flow Intelligence AI / machine-learning tool.</td>
            <td><a href="https://news.bloomberglaw.com/banking-law/jpmorgans-ai-aided-cashflow-model-can-cut-manual-work-by-90" target="_blank" rel="noopener noreferrer">Bloomberg report</a></td>
            <td>Around 2,500 corporate clients using AI-driven cash-flow management software.</td>
            <td>Manual treasury work reportedly reduced by nearly 90%.</td>
          </tr>
          <tr>
            <td>Internal controls</td>
            <td>Deloitte / Diligent</td>
            <td>Continuous controls monitoring, full-population testing, risk and anomaly detection.</td>
            <td>Continuous controls monitoring, AI and analytics.</td>
            <td><a href="https://www.deloitte.com/global/en/services/consulting-risk/services/continuous-controls-monitoring.html" target="_blank" rel="noopener noreferrer">Deloitte CCM</a> / <a href="https://www.diligent.com/-/media/project/diligent/master/insights/white-papers/pdf-media-files/diligent_continuous-controls-monitoring_us.pdf" target="_blank" rel="noopener noreferrer">Diligent CCM</a></td>
            <td>Internal control, audit and risk teams monitoring transactions and controls continuously rather than through samples.</td>
            <td>Enables a shift from sample testing to full-population monitoring and redeployment of audit resources towards investigation and remediation.</td>
          </tr>
          <tr>
            <td>Tax management</td>
            <td>Thomson Reuters</td>
            <td>Tax research, tax compliance preparation and risk reduction.</td>
            <td>CoCounsel / agentic AI, generative AI tax research and compliance tools.</td>
            <td><a href="https://tax.thomsonreuters.com/en/products/cocounsel-tax" target="_blank" rel="noopener noreferrer">CoCounsel Tax</a></td>
            <td>Tax professionals and corporate tax teams using AI for compliance and research.</td>
            <td>Public sources support faster answers to complex tax questions; vendor-reported compliance and risk benefits should be validated case by case.</td>
          </tr>
          <tr>
            <td>International finance / consolidation / ERP-connected finance work</td>
            <td>Microsoft</td>
            <td>ERP-connected reconciliation, reporting, variance analysis and collections support.</td>
            <td>Finance in Microsoft 365 Copilot, generative AI, Excel/Outlook workflows, SAP and Dynamics 365 connectors.</td>
            <td><a href="https://www.microsoft.com/en-us/dynamics-365/blog/it-professional/2025/10/20/empowering-finance-with-an-ai-assistant-in-microsoft-365-copilot/" target="_blank" rel="noopener noreferrer">Microsoft Copilot for Finance GA</a></td>
            <td>Finance teams working across Microsoft 365, SAP and Dynamics 365.</td>
            <td>Public sources support reconciliation, audit support, collections support and variance analysis; no named customer benefit metric disclosed in launch material.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="use-case-cta">
      <div>
        <p class="section-kicker">So what?</p>
        <h3>Evidence only creates value when it is sequenced into your roadmap.</h3>
        <p>
          Use these cases to challenge where AI belongs in your Finance function, then convert
          the evidence into a practical roadmap, adoption plan and measurable value case.
        </p>
      </div>
      <a class="button primary" href="https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone?utm_source=website&utm_medium=cta&utm_campaign=ai_finance_diagnostic&utm_content=real_use_cases" target="_blank" rel="noopener noreferrer">Start the Diagnostic Pack</a>
    </div>
  `;

  resourcesSection.insertAdjacentElement("afterend", useCasesSection);

  const growCfoPlayer = useCasesSection.querySelector("#growcfo-player");
  const growCfoNowTs = useCasesSection.querySelector("#growcfo-now-ts");
  const growCfoNowTitle = useCasesSection.querySelector("#growcfo-now-title");
  const growCfoNowDesc = useCasesSection.querySelector("#growcfo-now-desc");
  const growCfoChapterButtons = useCasesSection.querySelectorAll(".growcfo-chapter-btn");

  growCfoChapterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      growCfoChapterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const start = button.dataset.start || "0";
      growCfoPlayer.src = `https://www.youtube.com/embed/las4ugear3s?start=${start}&autoplay=1&rel=0&modestbranding=1`;
      growCfoNowTs.textContent = button.dataset.ts || "";
      growCfoNowTitle.textContent = button.dataset.title || "";
      growCfoNowDesc.textContent = button.dataset.desc || "";
    });
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");

  if (!link) {
    return;
  }

  const href = link.getAttribute("href") || "";
  let eventName = "";

  if (href.includes("calendly.com/gilles-bonelli/applied-ai-coaching-session-clone")) {
    eventName = "book_diagnostic_click";
  }

  if (href.includes("chatgpt.com/g/g-67bbc67babd4819199ee183bf8b7588c-ai-finance-playbook-for-finance-leaders")) {
    eventName = "assistant_click";
  }

  if (!eventName) {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      link_url: href,
      link_text: link.textContent.trim()
    });
  }
});
