# See The Next Move Website Specification

This is the canonical specification for `seethenextmove.com`, hosted from the GitHub repository `CEOFOUNDER/STNM_FT`.

Update this file whenever website behaviour, positioning, page structure, conversion flow, pricing, links, analytics, client proof, resources, or protected design decisions change.

## Business Goal

The website is an automated credibility and conversion funnel for See The Next Move.

Primary conversion:

- Paid AI Finance Diagnostic Pack booking.
- Price: `$350`.
- Booking URL: `https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone`.

Secondary preparation path:

- Free AI Finance Playbook assistant.
- Assistant URL: `https://chatgpt.com/g/g-67bbc67babd4819199ee183bf8b7588c-ai-finance-playbook-for-finance-leaders`.

The site should help Finance leaders prepare for a better paid diagnostic conversation, not encourage unpaid advisory calls.

## Core Positioning

See The Next Move helps Finance leaders define and land AI-enabled Finance transformation through:

- AI use case prioritisation.
- Process mining and process mapping.
- Roadmap sequencing.
- Finance operating model design.
- Adoption and change risk.
- Controls and governance.
- Data readiness.
- Architecture alignment.
- Programme oversight.

The message should remain practical, Finance-led, and outcome-led.

## Required Navigation

The shared header should stay consistent across standard pages:

- Home
- Clients
- Resources
- Diagnostic Pack

The home icon/link should remain visible where the shared header is used.

Privacy Policy should be linked from page footers only, not promoted in the main navigation. The current Privacy Policy effective date is 18 May 2026.

Standard public page footers should show the registered company details:

`&copy; SEE THE NEXT MOVE LTD. | Registered office: 128 City Road, London, EC1V 2NX, United Kingdom | Company registration number: 15256750`

## Required Pages

Core public pages:

- `index.html` - homepage and main funnel.
- `resources.html` - embedded AI Finance Masterclass and use-case exploration route.
- `cfo-ai-finance-playbook.html` - CFO playbook preview and diagnostic conversion path.
- `ai-finance-diagnostic.html` - diagnostic preparation and booking page.
- `who-the-diagnostic-is-for.html` - qualification page.
- `clients-by-sector.html` - anonymised client experience by sector.
- `insights.html` - insights hub.
- `privacy.html` - privacy page.

Hidden paid-customer page:

- `ai-finance-diagnostic-tool/index.html` - hidden diagnostic tool, intended to be shared after payment.

## Floating Diagnostic CTA

The sitewide floating card must appear on standard pages.

Required text:

- `Start the AI Finance Diagnostic Pack`
- `Fixed-price expert review`

Implementation:

- Homepage may contain the hard-coded `.floating-gpt` card.
- `script.js` injects the same card on other pages only when `.floating-gpt` does not already exist.
- Do not manually duplicate the floating card in individual pages.

## Diagnostic Pack

Required price:

- `$350`

Required booking URL:

- `https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone`

Required pack description themes:

- Free AI assistant preparation before the session.
- One expert hour focused on the Finance AI challenge.
- Review of value, feasibility, risk, data readiness and adoption.
- Concise post-session summary by email.
- Suggested next 30-day actions.
- Optional paid follow-on support.
- Role-specific AI Finance Playbook to build trust, lead with confidence and drive ROI.

Required FAQ wording:

`The diagnostic focuses on the practical questions that decide whether AI Finance work will land: use case prioritisation, process mining, roadmap sequencing, operating model impact, adoption risk, controls, data readiness, architecture alignment and programme oversight.`

## Use Case Examples Section

The use-case table must stay anonymised.

Required heading:

- `Use Case Examples`

Required table organisation header:

- `Example organisation`

Forbidden:

- `Verifiable live link`
- `<th>Company</th>`
- Named company examples in the table where anonymisation has been agreed, including Philips, Capgemini, Blackbaud, Belden, Adyen, Amazon, JPMorgan, Microsoft, Thomson Reuters, Deloitte, Diligent, ADP, Workday with PwC, and Trullion / Nakisa.

The homepage static table in `index.html` and the Resources-generated table in `script.js` must remain aligned.

## Client Proof

Client references should remain anonymised unless Gilles explicitly asks to disclose a name.

Do not reintroduce previously removed named clients such as:

- General Electric
- Energias de Portugal

Client pages should let visitors switch quickly between:

- Default view
- View by industry sector
- Recommendations

Client subsections should be collapsed by default.

## Resources

The Resources page should go straight to the embedded masterclass without an unnecessary top hero section.

It should include a clean route to:

- AI Finance Masterclass.
- CFO Playbook.
- Real AI use case examples.
- Diagnostic Pack.

The GrowCFO interview / use-case section should remain neat, timestamped, and visually consistent with the masterclass frame style.

## CTA Rules

Avoid duplicate neighbouring CTAs with the same purpose.

Preferred pattern:

- One primary paid action.
- One secondary preparation action.

Do not place two adjacent `Start the $350 Diagnostic Pack` buttons in the same action row.

## Analytics

GA4 Measurement ID:

- `G-LJ5M3XRTKQ`

Do not remove:

- `analytics-config.js`
- shared click tracking in `script.js`

Tracked events should include:

- Diagnostic booking clicks.
- Free assistant clicks.

## Privacy

The website must include a concise, fit-for-purpose UK-focused Privacy Policy at `privacy.html`.

Required policy anchors:

- Effective date: `18 May 2026`.
- Contact email: `gilles.bonelli@seethenextmove.com`.
- Coverage for enquiries, resources, Diagnostic Pack booking, diagnostic preparation notes, analytics, cookies, external AI assistant links, embedded content, third-party booking and payment services, retention, individual rights, security and ICO complaint route.
- Privacy should remain discoverable from footers while keeping the primary header focused on conversion navigation.

## Publishing Workflow

Before publishing a website change:

1. Read the current GitHub file and local file.
2. Make the smallest safe edit.
3. Update this specification if the site behaviour, content model, navigation, funnel, pricing, links, analytics, or protected decisions change.
4. Run the STNM website guardrail script.
5. Publish only after the script passes.
6. Fetch remote lines after publishing to confirm the sensitive change.

Guardrail script:

`C:\Users\gille\.codex\skills\stnm-website-guardrails\scripts\check_stnm_site.py`
