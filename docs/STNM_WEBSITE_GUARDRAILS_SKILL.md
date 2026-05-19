# STNM Website And Revenue-System Guardrails Skill

This file mirrors the local Codex skill used to update the See The Next Move website and revenue system through one guarded command.

Local skill path:

`C:\Users\gille\.codex\skills\stnm-website-guardrails\SKILL.md`

Primary command:

`$stnm-website-guardrails to update the website: [your change]`

## Purpose

Use this guardrail whenever a change affects the website, traffic-generation console, content funnel, LinkedIn triage, analytics, documentation, diagnostic pack, conversion flow, client pages, resources, navigation, floating CTAs, or any `CEOFOUNDER/STNM_FT` repository file.

## North Star

The #1 goal is to achieve revenue as soon as possible through a traffic system with as close to zero manual or unpaid work as possible.

Every change should support at least one of these outcomes:

- More qualified Finance-leader traffic.
- Better conversion into the paid `$350` AI Finance Diagnostic Pack.
- Less unpaid advisory interaction.
- Better inbound classification and buyer routing.
- Clearer reporting on what traffic-generation work has been done.
- Stronger proof, trust or search discoverability that supports paid conversion.

## Required Workflow

1. Treat the request as part of the integrated revenue system, not a detached page edit.
2. Identify every affected asset: public site, hidden paid tool, traffic console, LinkedIn funnel, content queue, analytics/tracking, documentation, sitemap/robots or workflow.
3. Check GitHub publishing access by fetching a small known file from `CEOFOUNDER/STNM_FT`.
4. Read the local file and current GitHub file before editing.
5. Make the smallest coherent change.
6. Read and preserve `references/regression-rules.md`.
7. Read `docs/STNM_WEBSITE_SPEC.md` and `docs/STNM_TRAFFIC_SYSTEM_SPEC.md`.
8. Update the website spec when site behaviour, funnel, pricing, links, analytics, page structure, resources, navigation, conversion flow or protected design decisions change.
9. Update the traffic-system spec when traffic generation, content production, LinkedIn triage/replies, outreach, advertising, reporting or the zero-unpaid-interaction model changes.
10. Update regression rules when a new solved issue or non-negotiable rule is created.
11. Run the local guardrail checker before publishing.
12. Publish changed files to GitHub only after checks pass.
13. Fetch remote lines after publishing to confirm sensitive content.
14. Run live checks against `https://www.seethenextmove.com/` and any changed page.
15. If the traffic console changed, check `https://www.seethenextmove.com/traffic-console/`.

## Protected Rules

- The use-case table must remain anonymised.
- The use-case table must not include a `Verifiable live link` column.
- Homepage and Resources-generated use-case tables must remain aligned.
- Floating Diagnostic Pack card must appear consistently without duplication.
- Header navigation must stay consistent.
- Price and booking link must remain `$350` and `https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone` unless Gilles explicitly changes them.
- The live canonical website must serve the GitHub Pages experience, not stale Wix content, stale `.ai` navigation or legacy coaching pages.
- The traffic console must live at `traffic-console/`, remain `noindex,nofollow`, and enforce zero unpaid interaction.
- Daily traffic-pack automation must remain GitHub-hosted through `.github/workflows/daily-traffic-pack.yml` and surfaced in the console from `traffic-console/generated/daily-pack.json`.
- LinkedIn automation must remain compliant: drafts, classifications and scoring are allowed; scraping and unattended auto-DMs are not.

## Source Of Truth

- Website spec: `docs/STNM_WEBSITE_SPEC.md`
- Traffic system spec: `docs/STNM_TRAFFIC_SYSTEM_SPEC.md`
- Regression rules: `references/regression-rules.md`
- Traffic console: `traffic-console/`

The local Codex skill is operational; this repository copy exists so the design and rules are not trapped on one machine.
