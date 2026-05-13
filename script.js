const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const gptUrl = "https://chatgpt.com/g/g-67bbc67babd4819199ee183bf8b7588c-ai-finance-playbook-for-finance-leaders";

const widgetStyles = document.createElement("style");
widgetStyles.textContent = `
  .floating-gpt {
    position: fixed;
    right: 18px;
    top: 50%;
    z-index: 20;
    display: grid;
    grid-template-columns: 58px minmax(0, 148px);
    gap: 12px;
    align-items: center;
    width: 240px;
    padding: 10px 12px 10px 10px;
    border: 1px solid rgba(217, 222, 232, 0.95);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 20px 60px rgba(11, 18, 32, 0.18);
    transform: translateY(-50%);
    backdrop-filter: blur(12px);
  }

  .floating-gpt:hover {
    border-color: rgba(29, 154, 154, 0.5);
    transform: translateY(-50%) translateX(-4px);
  }

  .floating-gpt img {
    width: 58px;
    height: 58px;
    border-radius: 8px;
    object-fit: cover;
  }

  .floating-gpt strong,
  .floating-gpt small {
    display: block;
  }

  .floating-gpt strong {
    font-size: 0.84rem;
    line-height: 1.18;
  }

  .floating-gpt small {
    margin-top: 4px;
    color: var(--teal);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  @media (max-width: 860px) {
    .floating-gpt {
      right: 14px;
      top: auto;
      bottom: 14px;
      grid-template-columns: 52px minmax(0, 138px);
      width: 222px;
      transform: none;
    }

    .floating-gpt:hover {
      transform: translateY(-3px);
    }

    .floating-gpt img {
      width: 52px;
      height: 52px;
    }
  }
`;
document.head.appendChild(widgetStyles);

const floatingGpt = document.createElement("a");
floatingGpt.className = "floating-gpt";
floatingGpt.href = gptUrl;
floatingGpt.target = "_blank";
floatingGpt.rel = "noopener noreferrer";
floatingGpt.setAttribute("aria-label", "Chat with the AI Finance Playbook in ChatGPT");
floatingGpt.innerHTML = `
  <img src="gilles-chat-avatar.svg" alt="Gilles Bonelli" />
  <span>
    <strong>Chat about Finance Transformation</strong>
    <small>AI Finance Playbook</small>
  </span>
`;
document.body.prepend(floatingGpt);

const heroActions = document.querySelector(".hero-actions");
if (heroActions && !heroActions.querySelector("[data-gpt-link]")) {
  const playbookLink = document.createElement("a");
  playbookLink.className = "button secondary";
  playbookLink.href = gptUrl;
  playbookLink.target = "_blank";
  playbookLink.rel = "noopener noreferrer";
  playbookLink.dataset.gptLink = "true";
  playbookLink.textContent = "Try the AI playbook";
  const contactLink = heroActions.querySelector("a[href='#contact']");
  heroActions.insertBefore(playbookLink, contactLink || null);
}
