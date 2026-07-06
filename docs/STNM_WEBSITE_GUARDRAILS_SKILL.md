# STNM Website And Revenue-System Guardrails

This GitHub file is the single source of truth for See The Next Move website and revenue-system guardrails.

Primary command:

```text
$stnm-website-guardrails to update the website: [your change]
```

The local Codex skill may exist only as an operational entrypoint for the command. It must point back to this GitHub file and must not become a competing source of truth. Do not maintain separate project-folder copies of these guardrails.

## Purpose

Use this guardrail whenever a change affects the website, traffic-generation console, content funnel, LinkedIn triage, analytics, documentation, diagnostic pack, conversion flow, client pages, resources, navigation, floating CTAs, or any `CEOFOUNDER/STNM_FT` repository file.

## North Star

The #1 goal is to achieve revenue as soon as possible through a traffic system with as close to zero manual or unpaid work as possible.

Every change should support at least one of these outcomes:

- More qualified Finance-leader traffic.
- Better conversion into the paid `$750` AI Finance Diagnostic Pack.
- Less unpaid advisory interaction.
- Better inbound classification and buyer routing.
- Clearer reporting on what traffic-generation work has been done.
- Stronger proof, trust or search discoverability that supports paid conversion.

## Required Workflow

1. Fetch this GitHub guardrails file first.
2. Treat the request as part of the integrated revenue system, not a detached page edit.
3. Identify every affected asset: public site, hidden paid tool, traffic console, LinkedIn funnel, content queue, analytics/tracking, documentation, sitemap/robots or workflow.
4. Check GitHub publishing access by fetching a small known file from `CEOFOUNDER/STNM_FT`.
5. Read the local file and current GitHub file before editing.
6. Make the smallest coherent change.
7. Read and preserve `references/regression-rules.md`.
8. Read `docs/STNM_WEBSITE_SPEC.md` and `docs/STNM_TRAFFIC_SYSTEM_SPEC.md`.
9. Update the website spec when site behaviour, funnel, pricing, links, analytics, page structure, resources, navigation, conversion flow or protected design decisions change.
10. Update the traffic-system spec when traffic generation, content production, LinkedIn triage/replies, outreach, advertising, reporting or the zero-unpaid-interaction model changes.
11. Update regression rules when a new solved issue or non-negotiable rule is created.
12. Update this guardrails file if a new general rule or lesson should govern future work.
13. Run the local guardrail checker before publishing when available.
14. Publish changed files to GitHub only after checks pass.
15. Fetch remote lines after publishing to confirm sensitive content.
16. Run live checks against `https://www.seethenextmove.com/` and any changed page.
17. If the traffic console changed, check `https://www.seethenextmove.com/traffic-console/`.
18. If the diagnostic tool changed, check `https://www.seethenextmove.com/ai-finance-diagnostic-tool/` after deployment.

## Protected Rules

- The use-case table must remain anonymised.
- The use-case table must not include a `Verifiable live link` column.
- Homepage and Resources-generated use-case tables must remain aligned.
- Floating Diagnostic Pack card must appear consistently without duplication.
- Header navigation must stay consistent.
- Price and booking link must remain `$750` and `https://calendly.com/gilles-bonelli/applied-ai-coaching-session-clone` unless Gilles explicitly changes them.
- The live canonical website must serve the GitHub Pages experience, not stale Wix content, stale `.ai` navigation or legacy coaching pages.
- The hidden diagnostic tool must live at `ai-finance-diagnostic-tool/` in `CEOFOUNDER/STNM_FT`; do not move it to a detached project, external repo or stale local-only build.
- The diagnostic tool must remain `noindex,nofollow`, hidden from public navigation, canonical to `https://www.seethenextmove.com/ai-finance-diagnostic-tool/`, and under local guardrail-checker coverage for questions, scoring, report generation, report delivery and paid-session preparation copy.
- The traffic console must live at `traffic-console/`, remain `noindex,nofollow`, and enforce zero unpaid interaction.
- Daily traffic-pack automation must remain GitHub-hosted through `.github/workflows/daily-traffic-pack.yml` and surfaced in the console from `traffic-console/generated/daily-pack.json`.
- The daily traffic workflow must keep a backup daily schedule and a push trigger for workflow/generator changes so missed scheduled runs can be recovered quickly.
- The daily traffic workflow must deploy GitHub Pages from the same run after generating and committing the pack; do not rely on bot-generated commits to trigger the separate Pages workflow.
- The traffic console must detect stale daily packs and create a same-day browser fallback pack if GitHub Actions misses a run.
- LinkedIn automation must remain compliant: drafts, classifications and scoring are allowed; scraping and unattended auto-DMs are not.

## Lessons From Past Mistakes

- GitHub is the source of truth for guardrails. Do not keep local project-folder guardrail copies.
- Local operational skill files are allowed only to run the command; they must defer to this GitHub file.
- If adding project rules or context, update this GitHub guardrails file.
- Verify GitHub readback after publishing rule or website changes.
- Do not let stale local docs, extracted project folders, or older Codex conversation folders override the repository rules.

## Source Of Truth

- Guardrails: `docs/STNM_WEBSITE_GUARDRAILS_SKILL.md` in `CEOFOUNDER/STNM_FT`
- Website spec: `docs/STNM_WEBSITE_SPEC.md`
- Traffic system spec: `docs/STNM_TRAFFIC_SYSTEM_SPEC.md`
- Regression rules: `references/regression-rules.md`
- Traffic console: `traffic-console/`

Use the GitHub files above as the canonical rule set. Local copies are temporary working artifacts only and should be removed when they are not needed for an active edit.
