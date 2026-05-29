# See The Next Move Traffic System Specification

This is the canonical specification for the See The Next Move revenue and traffic-generation system in `CEOFOUNDER/STNM_FT`.

The system is controlled through one command:

`$stnm-website-guardrails to update the website: [your change]`

That command covers website, app, traffic-generation console, content, LinkedIn funnel, analytics, reporting and documentation changes. Nothing in the revenue system should become a detached side project.

## North Star

The #1 goal is to achieve revenue as soon as possible with a traffic system that minimises manual work and eliminates unpaid advisory drift.

Primary commercial outcome:

- Paid AI Finance Diagnostic Pack booking.
- Price: `$350`.
- Booking URL: `https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone`.

Core operating rule:

- Zero unpaid interaction.

This means:

- No free calls.
- No open-ended "pick your brain" conversations.
- No bespoke advice in DMs.
- No unpaid document reviews.
- No unpaid project scoping.
- Serious buyers are routed to the paid Diagnostic Pack.
- Possible-fit contacts use the free assistant first.
- Low-fit contacts receive one polite self-serve pointer and the interaction closes.

## Integrated Assets

The traffic system consists of:

- Public website at `https://www.seethenextmove.com/`.
- Hidden traffic console at `traffic-console/`.
- Hidden diagnostic tool at `ai-finance-diagnostic-tool/`.
- LinkedIn triage assets in `linkedin-funnel/`.
- Content quality gate in `content/CONTENT_QUALITY_GATE.md`.
- Funnel tracking assets in `funnel-tracking/`.
- Analytics configuration in `analytics-config.js` and `script.js`.
- Website specification in `docs/STNM_WEBSITE_SPEC.md`.
- Traffic-system specification in this file.
- Regression rules in `references/regression-rules.md`.

These assets must stay synchronised whenever one is changed.

## Traffic Console

Local path:

`traffic-console/index.html`

Public hidden URL after deployment:

`https://www.seethenextmove.com/traffic-console/`

Required properties:

- Must include `noindex,nofollow`.
- Must not be linked from the public navigation.
- Must be committed to GitHub with the rest of the site.
- Must support content generation, inbound classification, prospect scoring, advertising test planning, UTM building and activity reporting.
- Must surface the latest GitHub-generated daily traffic pack from `traffic-console/generated/daily-pack.json`.
- Must include a bounded follow-up generator for visitors, prospects and buyers who engaged but did not book, while preserving the zero-unpaid-interaction rule.
- Must explicitly enforce zero unpaid interaction.
- Must route serious buyers to the paid Diagnostic Pack.
- Must route possible-fit contacts to the free assistant first.
- Must log actions locally and allow export.

The console does not scrape LinkedIn and does not secretly auto-send LinkedIn messages. It may generate drafts, classify pasted messages, score prospects and support use through compliant/manual or platform-approved workflows.

## Daily Automation

The repository includes a scheduled GitHub Actions workflow:

`/.github/workflows/daily-traffic-pack.yml`

It runs daily, has a backup daily schedule, can be triggered manually, and also runs when the workflow or generator is changed. The workflow executes:

`scripts/generate-traffic-pack.js`

Generated outputs:

- `traffic-console/generated/daily-pack.json`
- `traffic-console/generated/latest-brief.md`

The automation creates ready-to-use LinkedIn post drafts, a buyer-problem theme, daily actions, target roles, buying triggers and disqualifiers. It does not post to LinkedIn, scrape LinkedIn or auto-send DMs. Its purpose is to remove daily content-production friction while preserving compliance and the zero-unpaid-interaction rule.

The generated daily pack must also include bounded follow-up templates for:

- Clicked Diagnostic Pack but did not book.
- Used assistant or resource.
- Future-fit nurture.
- Poor-fit close.

These templates are intended for manual or approved-tool use only and must not create unpaid scoping conversations.

The traffic console must also detect stale generated packs. If `traffic-console/generated/daily-pack.json` was not generated on the current Europe/London date, the console should generate a fresh in-browser fallback pack so Gilles never sees stale daily messages.

## LinkedIn Funnel

LinkedIn remains the primary active channel for now.

Allowed:

- AI-assisted drafting.
- AI-assisted inbound classification.
- Prospect scoring.
- Manual sending.
- Use of approved LinkedIn advertising products.
- Use of approved scheduling or social tools where permitted by their terms.

Not allowed:

- Unauthorised scraping.
- Secret unattended auto-DMs.
- Automated engagement spam.
- Giving bespoke consulting advice in LinkedIn messages.

Classification categories:

- High Potential: route to paid Diagnostic Pack, with assistant as preparation.
- Possible Potential: route to free assistant first, then paid pack if tailored advice is needed.
- Low Potential: polite self-serve pointer, then close.
- No Potential: short polite stop.

## Passive Traffic

Passive content should target willing and able buyers by problem, not generic AI interest.

Priority themes:

- AI use case prioritisation.
- Finance AI roadmap sequencing.
- Process mining, process mapping and automation benefits.
- FP&A forecasting, trust and judgement.
- Controls, auditability and governance.
- Finance operating model impact.
- Adoption and change risk.
- Programme oversight and measurable value.

Every content item should pass the quality gate:

- Tied to a real Finance problem.
- Relevant to a willing and able buyer.
- Anchored in measurable value, best practice, emerging practice or credible use case.
- Supports See The Next Move methodology.
- Leads naturally to free assistant preparation or the paid Diagnostic Pack.
- Does not invite unpaid calls.

## Active Traffic

Active outreach should focus only on people likely to be willing and able buyers:

- CFO.
- Finance Director.
- VP / Director FP&A.
- Finance Transformation Director.
- Group Controller.
- Head of Finance Systems / Finance Architecture.
- Shared Services / GBS Finance leader.
- Finance Process / Process Mining leader.

Best-fit organisations:

- 500+ employees, preferably 1,000+.
- Complex, regulated or multi-entity environment.
- Active AI, automation, Finance transformation, FP&A, process mining, shared services or operating model agenda.

Buying triggers:

- Asked to "do something with AI".
- Building a Finance 2030 or future-state Finance roadmap.
- Evaluating process mining or automation.
- Under pressure to reduce Finance cost or improve productivity.
- Struggling with forecasting, reporting, close or controls.
- Facing AI pilot sprawl.
- Concerned about governance, controls, adoption or trust.

## Advertising

Advertising should start small and hard-qualify buyers.

Preferred first paid channel:

- LinkedIn ads.

Preferred objectives:

- Lead generation.
- Website conversion.

Audience:

- Senior Finance leaders.
- Director, VP, CXO and equivalent seniority.
- Company size 501+, with emphasis on 1,001+.

Required qualification question:

`Are you willing to pay $350 for a fixed-price expert diagnostic if this is a live issue?`

This may reduce volume, but it protects time and improves fit.

## Reporting

The console should report what was done, at minimum:

- Posts generated or copied.
- Inbound messages classified.
- High-potential opportunities detected.
- Paid routes made explicit.
- Follow-up templates generated or copied.
- Outreach drafts generated.
- Ad tests prepared.
- UTM links built.

The system should favour clear daily execution over complex dashboards.

## Analytics

GA4 Measurement ID:

`G-LJ5M3XRTKQ`

Required tracked events:

- `book_diagnostic_click`.
- `assistant_click`.

Search Console should remain linked to GA4 for the canonical site:

`https://www.seethenextmove.com/`

## Update Discipline

For every change made through `$stnm-website-guardrails`:

1. Identify whether the change affects website, traffic console, LinkedIn funnel, content, analytics, advertising, documentation or reporting.
2. Run the publishing access gate before large edits.
3. Update all affected files together.
4. Update this specification if the traffic system changes.
5. Update `docs/STNM_WEBSITE_SPEC.md` if the public website or conversion flow changes.
6. Update `references/regression-rules.md` if a new non-negotiable rule is created.
7. Run the STNM guardrail checker.
8. Publish to GitHub.
9. Verify the public URL(s).

## Publishing Access Gate

The system depends on Codex being able to publish to `CEOFOUNDER/STNM_FT`.

Before substantial work, verify that the Codex GitHub connector can fetch a small known file such as `README.md`.

If the connector reports:

`Provided authentication token is expired. Please try signing in again.`

Then the blocker is the Codex GitHub connector OAuth token, not the browser login to GitHub. The required action is to refresh the GitHub connector inside Codex/Apps/Connectors/Integrations and then re-run the guarded update.

If GitHub publishing works but GitHub Actions fails with `Get Pages site failed`, `Not Found`, or `configure-pages`, the likely issue is GitHub Pages configuration. Check:

- Repo `Settings` -> `Pages`.
- Build and deployment source is `GitHub Actions`.
- Custom domain remains `www.seethenextmove.com`.
- Re-run the failed workflow after saving.

Do not mark a traffic console or website change as live until the public URL check succeeds.

## Current Priority

The current priority is not polish. It is qualified traffic and paid conversion.

Before further major site design work, focus on:

- Publishing the traffic console to GitHub.
- Driving targeted LinkedIn traffic.
- Classifying inbound enquiries.
- Routing serious buyers to the paid Diagnostic Pack.
- Using analytics to learn which content creates clicks and bookings.
