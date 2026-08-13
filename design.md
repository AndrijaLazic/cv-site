# CV Site Design Guide

Last updated: 2026-08-13

This guide adapts the `uncodixfy` standard to this project. Its purpose is not to make every screen visually minimal; it is to prevent decoration from substituting for product structure. Interfaces should feel designed for this portfolio's content, not assembled from generic dashboard patterns.

## Purpose

This site is a multilingual developer portfolio, résumé, and technical blog. It should feel direct, personal, and carefully typeset. The interface supports dense professional content without resembling a SaaS dashboard or using decoration to imply quality.

Content, typography, spacing, alignment, and borders create the hierarchy. Every visual element must have a clear job. When a simpler established pattern works, use it.

## Core principles

- Make the visitor's next action obvious without promotional copy.
- Prefer ordinary document structure, predictable alignment, and familiar controls.
- Use one consistent spacing scale: 4, 8, 12, 16, 24, and 32 px.
- Keep body text at a readable 14–16 px baseline and allow long-form prose enough line height.
- Use color to communicate action or state, not to decorate empty space.
- Use a ruled list or plain section before introducing a card.
- Keep each theme visually equivalent. Themes may change color, not information architecture.
- Reproduce established project patterns and shared components instead of inventing one-off visual treatments.
- Treat restraint as a design constraint: every wrapper, color, icon, label, and animation needs a functional reason.
- Prefer the familiar control a visitor already understands over a novel presentation of the same action.

## Design decision process

Use this order whenever creating or revising an interface:

1. Identify the content hierarchy and the visitor's task before choosing a visual treatment.
2. Inspect existing project components, tokens, typography, and nearby page patterns.
3. Choose the most conventional semantic structure that supports the task: document flow, list, form, table, grid, or dialog.
4. Establish hierarchy with type, spacing, alignment, and a 1 px border before adding a card, icon, color, or shadow.
5. Add a container only when it groups a real object or related controls. Do not add wrappers solely to make the page look composed.
6. Add color only for interaction, selection, focus, status, or a meaningful brand association.
7. Add motion only when it explains state or spatial change. Routine hover feedback uses color or opacity.
8. Remove any element whose absence does not reduce clarity, usability, or brand recognition.

When a supplied screenshot or Figma reference exists, reproduce its information hierarchy, proportions, grouping, and behavior first. Translate its colors, type, radius, and effects through this guide and the project's semantic tokens. Do not copy gradients, glow, glass, excessive rounding, or ornamental labels merely because they appear in the reference.

An exception to these defaults is acceptable when the content or interaction genuinely requires it. Document the reason in the component or pull request when the exception introduces a new visual pattern.

## Themes and color

The active theme is set on `<html data-theme>` and persisted in a cookie. `graphite-neon` remains the default. `midnight-editor` and `graphite-neon` are dark; `paper-terminal` is light.

| Token                  | Graphite Neon `graphite-neon` | Midnight Editor `midnight-editor` | Paper Terminal `paper-terminal` |
| ---------------------- | ----------------------------- | --------------------------------- | ------------------------------- |
| `--color-bg`           | `#111315`                     | `#0B1020`                         | `#F8FAFC`                       |
| `--color-surface`      | `#1B1F24`                     | `#151B2E`                         | `#FFFFFF`                       |
| `--color-surface-soft` | `#252930`                     | `#1E2740`                         | `#F1F5F9`                       |
| `--color-text`         | `#F3F4F6`                     | `#E6EDF7`                         | `#0F172A`                       |
| `--color-muted`        | `#9CA3AF`                     | `#8FA1C7`                         | `#64748B`                       |
| `--color-primary`      | `#A78BFA`                     | `#4F8CFF`                         | `#2563EB`                       |
| `--color-accent`       | `#34D399`                     | `#22D3EE`                         | `#14B8A6`                       |
| `--color-border`       | `#252930`                     | `#1E2740`                         | `#E2E8F0`                       |

These are existing project colors and take precedence over introducing a new palette. Consume semantic custom properties in components; do not hard-code theme-specific values or use `.dark` to distinguish the two dark themes.

Use primary and accent colors sparingly for links, focus, selection, and meaningful status. Large colored fields, blue-black gradients, glow, haze, glass effects, gradient text, gradient borders, and decorative background patterns are not part of the visual language. Surfaces use solid fills.

## Typography

| Role                | Family                  | Guidance                                                             |
| ------------------- | ----------------------- | -------------------------------------------------------------------- |
| Headings            | Space Grotesk Variable  | Clear section and page hierarchy without display-scale theatrics     |
| Navigation and body | Inter Variable          | Existing project typeface; use for readable interface and prose text |
| Code                | JetBrains Mono Variable | Code, paths, commands, and values that are genuinely technical       |

Inter remains because it is already part of the product; do not add another generic sans-serif stack. Avoid mixing serif and sans-serif type to manufacture an editorial look.

Use one plain, descriptive `h1` per page and ordered `h2`–`h4` headings below it. Page titles generally use 32–48 px on desktop and 28–36 px on small screens. Section headings use 20–30 px; card or row titles use 16–20 px. Body text remains 14–16 px.

Do not use eyebrow copy, `<small>` headers, tracked uppercase section labels, gradient text, or oversized promotional statements. Mono type does not automatically make ordinary metadata “technical.” Dates and labels should normally use the body family with standard casing.

## Layout and spacing

Use a centered content container with a practical maximum width between 1200 and 1400 px. Start at 16 px horizontal padding, expand to 24 px, and use 32 px on large screens when needed. Major sections normally use 24–32 px vertical padding; related content uses 8–16 px gaps.

Layouts should follow a consistent left edge and a clear reading order. Use standard grid or flex layouts with regular gaps. Do not overlap content, center isolated blocks to create artificial drama, or leave dead space merely to make the page feel expensive.

Responsive layouts start from the mobile reading order. Collapse columns before text becomes cramped, but preserve grouping with borders and spacing rather than stacking every item as an unrelated card. Avoid horizontal overflow in code, prose, controls, and media.

Résumé pages remain normal document flow. Scroll snapping must not be required for navigation or comprehension. A supporting table of contents may become a plain secondary column on wide screens when the content warrants it; do not add a sticky rail by default.

## Surfaces and components

### Default component anatomy

| Component  | Default treatment                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header     | Plain title hierarchy, solid background when needed, simple bottom border                                                                            |
| Navigation | Text links in document order with quiet hover and explicit current state                                                                             |
| Section    | Normal document flow with 20–32 px vertical spacing; no decorative shell                                                                             |
| Toolbar    | Related controls in a horizontal row where space permits, normally 48–56 px tall when it fits one row, wrapping or orderly stacking on small screens |
| Sidebar    | 240–260 px only when the information architecture needs persistent secondary navigation; solid surface and border-right                              |
| Card       | One bounded object, solid surface, 1 px border, 8–12 px radius, normally no shadow                                                                   |
| Form       | Visible labels above native or familiar controls, clear errors, simple focus ring                                                                    |
| Dropdown   | Straightforward list, selected state, modest overlay shadow only                                                                                     |
| Tabs       | Underline or border indicator rather than a pill container                                                                                           |
| Modal      | Centered content, plain backdrop, conventional title and close action                                                                                |
| Table      | Left-aligned content, row separators, restrained hover, no decorative status chips                                                                   |
| Footer     | Essential links and copyright in a quiet ruled row                                                                                                   |

### Borders, radius, and shadow

- Use 1 px semantic borders for separation.
- Use 8–10 px radius for controls and no more than 12 px for a true card or modal.
- Do not repeat rounded rectangles around every content group.
- Prefer border and background contrast to shadow.
- If a shadow is necessary for an overlay, keep it at or below `0 2px 8px rgb(0 0 0 / 0.1)`.
- Do not use colored shadows, detached floating panels, backdrop blur, or glass surfaces.

### Buttons and links

- Primary buttons use a solid semantic fill; secondary buttons use a simple border.
- Use 8–10 px radius, concise labels, and no gradient.
- Reserve pill shapes for no default control. Compact tags may use a 6–8 px radius.
- Links should look like links through color, underline, or placement.
- Hover and active states change color, border, background, or opacity only. Do not translate, scale, or bounce controls.
- Do not place icons in decorative colored boxes. Pair an icon with a button only when it improves recognition or scanning.

### Cards, lists, and tables

- Use cards only when a bounded object benefits from grouping.
- Use plain sections, ruled rows, and semantic lists for experience, education, contact destinations, and archives when they communicate structure more clearly.
- Cards use a solid surface, subtle border, 8–12 px radius, and no floating effect.
- Tables use left-aligned text, clean row borders, and subtle hover where helpful. Zebra stripes are optional only for dense data.
- Do not turn every status or table value into a badge.

### Forms, menus, tabs, and dialogs

- Place clear labels above standard inputs.
- Inputs use a solid border and a simple visible focus ring.
- Dropdowns are straightforward lists with a clear selected state and only a subtle overlay shadow.
- Tabs use an underline or border indicator, not pill containers or sliding animations.
- Dialogs are centered over a simple backdrop with a conventional close button. Do not make ordinary dialogs slide in for effect.
- Group related controls in one toolbar or fieldset rather than wrapping each control in a separate card.

### Badges, icons, and media

- Badges are small, functional, and uncommon. Use simple fill or border and 6–8 px radius.
- Lucide and shared brand icons remain 16–20 px in most interface contexts, monochrome or subtly colored, and without decorative icon backgrounds.
- Status dots and rings are allowed only when they encode real state and have a text equivalent.
- Images need meaningful alternative text, stable dimensions, responsive sources, and lazy loading below the fold.

## Global navigation

The header is a simple solid surface separated by a 1 px bottom border. Desktop navigation is horizontal and visually secondary to the page title. A sticky header is acceptable only because navigation remains useful while reading; it must not use blur or a translucent floating shell.

The mobile menu presents the same destinations in document order. It may use a full-height drawer when necessary, but its surface is square to the viewport rather than a rounded detached panel. It closes predictably and does not obscure keyboard focus.

Language and theme controls show the current selection with text. Use a normal menu, segmented border treatment, or compact button; do not use rounded-full shells or decorative swatches as the only signal.

The footer is a quiet ruled row with essential social links and copyright text. Do not add slogans, implementation metadata, a second navigation system, or ornamental icon circles.

## Portfolio and résumé

The home page may open with a conventional introductory section because it is a landing page. Keep it compact: name, role, short factual summary, and one or two clear actions. Do not use an eyebrow, giant display headline, decorative manifesto, terminal cursor, fake code, glow, or full-viewport hero treatment.

Experience and education use a chronological list or restrained two-column layout. Each entry exposes organization, role or qualification, date, concise outcomes, technologies where useful, and optional project links. Dates remain plain text. Technology tags should be limited to information that helps scanning rather than wrapping every keyword in a chip.

Do not use a KPI grid, fake chart, progress bar, quota panel, activity feed, timeline ornament, or “team focus” card to fill space. A contact invitation should be a direct heading, sentence, and link—not a marketing callout.

## Blog

The blog index begins with a normal page title and a brief description only when it adds context. Follow it with simple tag filters, date sorting, and the post list. Do not add an eyebrow or a carousel merely to create a hero area.

Tag filters are a functional exception to the general warning about pills and badges. Use compact button-like tags with 6–8 px radius, a border, and an unambiguous selected state; do not make them fully pill-shaped or give them glow and elevation. Multi-select filtering uses AND logic, exposes `aria-pressed`, includes a clear “All” action, and persists the selection in the URL. Keep sorting as a conventional labeled select beside the tags on wide screens and below them on narrow screens. The sort trigger and menu use an 8 px radius; the trigger has no shadow or transform motion, and the menu uses no more than the standard `0 2px 8px rgb(0 0 0 / 0.1)` overlay shadow.

Post previews use a consistent row or restrained card containing title, summary, date, optional cover media, and only the most useful tags. They must not rely on elevation or movement to indicate clickability.

Article pages place title, summary, author, publication date, and reading time before the content. Sharing actions remain secondary. Prose uses a narrow readable measure, semantic headings, conventional links, code blocks, tables, callouts, and responsive media. On small screens, the table of contents is inline; on large screens it may occupy a simple supporting column if it improves navigation.

## Contact

Use a restrained editorial split: introduction and profile facts on the left, ruled destination links on the right. On small screens, preserve the same order as one linear sequence. Each destination row may include label, description, format, destination type, and a directional icon. Do not wrap each row in card chrome or add explanatory mini-notes.

## Interaction and motion

- Ordinary transitions last 100–200 ms with a standard ease curve.
- Animate color, border, background, or opacity only for routine controls.
- Avoid transform-based hover effects, spring motion, parallax, and decorative reveals.
- Content is visible immediately and never waits for animation.
- Carousels, auto-advance, typing effects, and scroll snapping are not default patterns and require a content-driven reason.
- All optional motion honors `prefers-reduced-motion`.

Focus indicators must be obvious, offset from the component edge, and meet contrast requirements. Selected language, theme, filter, and navigation states remain identifiable without hover or color alone.

## Accessibility and localization

- Meet WCAG AA contrast for text, controls, focus indicators, and meaningful graphics in every theme.
- Use semantic landmarks, one logical `h1`, ordered headings, lists, `time`, and native links or buttons.
- Keep navigation, filters, drawers, menus, sharing controls, and theme choices keyboard operable.
- Keep interactive targets close to 44 by 44 px even when their visible icon is smaller.
- Give icon-only actions descriptive names and announce state changes such as copied links.
- Localize all visible interface text and preserve meaning across English and Serbian.
- Let Serbian labels wrap naturally; do not size controls around English strings only.

## Implementation checklist

Before implementation, answer these questions:

- What user task or content relationship does each visual container support?
- Is there an existing component or nearby pattern that already solves it?
- Would a plain heading, ruled list, native control, or standard grid communicate it more clearly?
- Does the design still work after removing gradients, shadows, blur, transform motion, and decorative labels?
- Are selected, disabled, empty, loading, error, focus, and mobile states explicit?

- Use existing shared UI primitives and merge classes with `cn()`.
- Extend semantic tokens in `src/styles.css` only when a reusable role is genuinely missing.
- Use solid theme surfaces and semantic borders before adding another wrapper.
- Keep radius at 12 px or below and control radius at 10 px or below.
- Remove decorative gradients, blur, glow, excessive shadows, uppercase metadata, and hover transforms from touched areas.
- Verify changes in all three themes, both locales, and representative 320 px, tablet, and desktop widths.
- Verify keyboard navigation, focus visibility, contrast, overflow, and reduced-motion behavior.

## Do not introduce

- Dashboard hero sections, metric-card grids, fake charts, pipeline bars, quotas, or activity panels.
- Floating or rounded sidebars, right-side schedule rails, nested panel systems, or decorative workspace blocks.
- Soft corporate gradients, glassmorphism, glow, haze, gradient brand marks, or ornamental background grids.
- Eyebrows, `<small>` headers, uppercase tracked labels, generic startup copy, or explanatory mini-notes.
- Pill-shaped buttons, tag overload, status badges on every row, or decorative status dots.
- Dramatic shadows, 20–32 px radii, hover translation, scale effects, or bouncy transitions.
- Decorative footer metadata, fake technical copy, or terminal motifs without a functional reason.

Avoid pattern clusters as well as individual violations. A rounded translucent panel with a tracked uppercase label, colored icon, glow, and hover lift is still generic AI UI even if each effect is subtle in isolation. Remove the cluster and rebuild the hierarchy from content, alignment, and state.

When a choice resembles a generic AI-generated interface pattern, step back and choose the quieter, more conventional implementation.
