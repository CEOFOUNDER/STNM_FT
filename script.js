const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
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
