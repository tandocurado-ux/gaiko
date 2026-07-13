# Coooi UI Design System

## Scope

This pass intentionally keeps the HTML structure, text, links, ids, heading levels, alt text, table scopes, head metadata, canonical tags, OG tags, and JSON-LD untouched.

The active stylesheet is `assets/site.css` because the existing HTML links to that file directly. No HTML `<link>` changes were made.

## Visual Direction

- Tone: modern, trustworthy, public-service-like, and practical.
- Palette: deep green as the primary trust color, warm gold for callouts and decision points, muted blue as a secondary functional accent.
- Type: system UI stack only. No added web font dependency.
- Rhythm: eyebrow or label, heading, short lead, then one primary content element.
- Shape: 8px maximum radius for cards and controls.
- Motion: small hover transitions only, disabled through `prefers-reduced-motion`.

## Components Styled

- Global tokens and base typography
- Sticky header and navigation
- Hero and prefecture/city hero variants
- Eyebrow labels
- CTA buttons
- TL;DR and callout blocks
- Statistic blocks and metric rows
- Cards and region directory cards
- Numbered table of contents
- Tables, including cost and subsidy style hooks
- Accordions and FAQ details
- Step/process grids
- Sticky side menu cards
- Footer

## Data Hook Support

The current checked HTML did not contain `data-c` hooks, but the stylesheet includes support for these future structure hooks:

- `[data-c="stat"]`
- `[data-c="cost-table"]`
- `[data-c="eyebrow"]`
- `[data-c="toc"]`
- `[data-c="callout"]`
- `[data-c="subsidy-table"]`
- `[data-c="faq"]`
- `[data-c="steps"]`

## Claude Code Structure Requests

Please add `data-c` hooks at generation time where possible, without changing visible copy:

- Add `data-c="stat"` to stat/metric blocks.
- Add `data-c="toc"` to numbered page TOCs.
- Add `data-c="callout"` to note/caution blocks.
- Add `data-c="cost-table"` and `data-c="subsidy-table"` to the relevant table wrappers.
- Add `data-c="faq"` to FAQ accordion groups.
- Add `data-c="steps"` to process/flow sections.

Useful optional structure improvements:

- For stat blocks, split value and label into stable classes such as `stat-value` and `stat-label`.
- For table-heavy sections, add a short wrapper class indicating table intent, while preserving existing `th scope` values.
- Add a skip link near the top of the page if the structure owner approves adding one element for keyboard users.
