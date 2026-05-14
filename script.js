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

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");

  if (!link) {
    return;
  }

  const href = link.getAttribute("href") || "";
  let eventName = "";

  if (href.includes("calendly.com/gilles-bonelli-at4a/ai-finance-diagnostic")) {
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
