# STNM Website Regression Rules

Use these rules before publishing any website change to `CEOFOUNDER/STNM_FT`.

## Public Canonical Site

- The canonical public website is `https://www.seethenextmove.com/`.
- The site must serve the GitHub Pages experience from `CEOFOUNDER/STNM_FT`.
- The public homepage must not serve the older Wix-style site, stale `.ai` navigation, or legacy coaching content.
- After any meaningful website update, check the public homepage and key funnel pages end to end.
- If the live homepage contains `Agentic AI Training & Consulting`, `Applied AI Coaching - 12 Months Program`, `wix.com`, or `.ai` internal navigation links, stop and resolve the domain/caching/canonical serving issue before changing content.

## Integrated Revenue System

- `$stnm-website-guardrails to update the website: [change]` controls the full revenue system, not just public pages.
- Website, traffic console, content, LinkedIn funnel, analytics, reporting and documentation must stay synchronised.
- The traffic-generation console must live at `traffic-console/` in GitHub and be available at `https://www.seethenextmove.com/traffic-console/` after deployment.
- The traffic console must be `noindex,nofollow`.
- The traffic console must enforce zero unpaid interaction: no free calls, no bespoke advice in DMs, no unpaid document reviews and serious buyers routed to the paid Diagnostic Pack.
- The traffic console must retain the Follow-Up tab and bounded follow-up generator so engaged prospects are routed to paid booking, assistant preparation, nurture or polite close without unpaid scoping.
- The traffic console must not scrape LinkedIn or secretly auto-send LinkedIn messages.
- Daily traffic automation must remain GitHub-hosted through `.github/workflows/daily-traffic-pack.yml` and must generate `traffic-console/generated/daily-pack.json` plus `traffic-console/generated/latest-brief.md`.
- Daily traffic automation must also generate `traffic-console/generated/scheduler-buffer.csv` in the common scheduler format: `Text`, `Image URL`, `Tags`, `Posting Time`.
- Daily traffic automation must include bounded follow-up templates in the generated pack and latest brief.
- Daily traffic automation must ensure every generated post explicitly names at least one concrete CFO pain-map problem and a practical move to solve or reduce it.
- Scheduler CSV posts must include UTM-tagged Diagnostic Pack links so scheduled LinkedIn traffic can be attributed.
- The daily traffic workflow must keep a backup daily schedule and a push trigger for workflow/generator changes so a missed scheduled run can be recovered quickly.
- The daily traffic workflow must deploy GitHub Pages from the same run after generating and committing the pack; do not rely on bot-generated commits to trigger the separate Pages workflow.
- Daily traffic automation may generate drafts, scoring material, daily briefs and reports, but must not auto-post to LinkedIn or auto-send DMs unless a future approved platform integration is explicitly configured.
- The traffic console must detect stale daily packs and generate a same-day browser fallback pack if the GitHub-generated JSON is not dated today in Europe/London.
- `docs/STNM_TRAFFIC_SYSTEM_SPEC.md` must stay aligned with traffic-generation changes.
- Before large edits, the GitHub connector must be checked by fetching a small known file. If the Codex connector token is expired, stop and ask Gilles to refresh the Codex GitHub connector before claiming anything can publish automatically.

## Use Case Table

- The table heading must be `Use Case Examples`.
- The organisation header must be `Example organisation`.
- Do not use the header `Company`.
- Do not include a `Verifiable live link` column.
- Do not include visible named examples that were previously anonymised:
  - Philips
  - Capgemini
  - Blackbaud
  - Belden
  - Adyen
  - Amazon
  - JPMorgan
  - Microsoft
  - Thomson Reuters
  - Deloitte
  - Diligent
  - ADP
  - Workday with PwC
  - Trullion / Nakisa
- The homepage static table in `index.html` and the Resources-generated table in `script.js` must both use the anonymised pattern.

## Diagnostic Tool

- The hidden diagnostic tool must live at `ai-finance-diagnostic-tool/` in `CEOFOUNDER/STNM_FT`; do not move it to a detached project, external repo, or stale local-only build.
- The diagnostic tool must remain `noindex,nofollow`, hidden from public navigation, and canonical to `https://www.seethenextmove.com/ai-finance-diagnostic-tool/`.
- Diagnostic questions, scoring, report generation, PDF assessment attachment, report delivery, and paid-session preparation copy are under guardrail control and must be checked before publishing.
- The diagnostic tool must preserve the zero-unpaid-interaction boundary by preparing the paid session, not inviting free scoping or unpaid advisory work.
- The diagnostic questionnaire must retain CFO-defensible coverage for a Finance transformation initiative across the Finance function: total Finance function cost, total Finance FTEs, ROI baseline, confidential data/vendor/model/audit-trail control, and AI autonomy boundary.
- New diagnostic questions must not be dead fields: each must affect scoring, appear in the visible report, appear in the email summary, or intentionally do more than one. Report and PDF wording must stay aligned and must not describe the diagnostic as a single isolated use case.

## Diagnostic Pack

- Price is `$750`.
- Approved booking URL:
  `https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone`
- The FAQ topic description should remain concise and aligned to the real diagnostic:
  `The diagnostic focuses on the practical questions that decide whether AI Finance work will land: use case prioritisation, process mining, roadmap sequencing, operating model impact, adoption risk, controls, data readiness, architecture alignment and programme oversight.`

## Floating CTA

- The floating card must use class `floating-gpt`.
- It must show:
  - `Start the AI Finance Diagnostic Pack`
  - `Fixed-price expert review`
- `index.html` may contain the hard-coded floating card.
- `script.js` must inject the card only when `.floating-gpt` does not already exist.
- Do not add duplicate floating cards to individual pages.

## Navigation

- Header navigation should remain consistent:
  - Home
  - Clients
  - Resources
  - Diagnostic Pack
- If `Resources` is renamed, preferred wording is `Learn AI Finance`.
- The home icon/link should remain visible where the shared header is used.

## Duplicate CTAs

- Avoid adjacent buttons with the same label or purpose, especially duplicate `Start the $750 Diagnostic Pack` buttons.
- Prefer one primary paid CTA and one secondary preparation CTA.

## Client Names

- Keep client listings anonymised unless Gilles explicitly requests named disclosure.
- Do not reintroduce named clients such as General Electric or Energias de Portugal.

## Analytics

- GA4 ID is `G-LJ5M3XRTKQ`.
- Do not remove `analytics-config.js` or the shared `script.js` analytics click tracking.
