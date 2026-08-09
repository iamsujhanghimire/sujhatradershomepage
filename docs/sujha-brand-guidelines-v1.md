# Sujha Traders — Brand Guidelines v1.0

This is the single source of truth for logo, color, and typography. Reference this document directly when briefing designers, developers, or Claude Code — don't let usage drift from what's specified here.

---

## 1. LOGO SYSTEM

**Concept:** Variant 3, "Runway Flow" — a single continuous ribbon forming a human figure in motion, symbolizing people, craftsmanship, and the ethical journey from fiber to finished garment. Evolves the existing mark's navy-purple + green palette and flowing form rather than replacing it.

**Wordmark:** `Sujha Traders`

**No tagline in the lockup.** Keep the mark clean — if a descriptor is ever needed in a specific context (e.g. a trade show banner), treat it as separate supporting copy, not part of the logo file itself.

**Required file set** (have all of these produced and stored before calling the rebrand "done"):

| File | Use case |
|---|---|
| Full-color icon + wordmark, horizontal lockup | Primary use — website header, letterhead, email signature |
| Full-color icon + wordmark, stacked lockup | Square/vertical spaces — social avatars, packaging |
| Icon only, full color | Favicon, app icon, small UI elements, watermark |
| **Single-color, black** | Any single-color print application, faxes/photocopies, engraving |
| **Single-color, white (reversed)** | Dark backgrounds, dark-mode UI, dark photo overlays |
| **Embroiderable/single-line version** | Woven labels, hang tags, stamped packaging — see below |

**On the embroidery/single-color requirement:** the six-variant draft as designed has fine internal detail (the layered ribbon fold, the white gap between purple and green) that will not survive at small embroidered scale — those thin gaps tend to close up or fray in thread. Before finalizing, have the designer produce a **simplified single-path version** of the icon specifically for embroidery/stamping: same silhouette, but with the internal white negative-space gap widened or the whole icon reduced to a single solid silhouette in one thread color. Test it at actual label size (roughly 1–1.5 inches) before approving — what reads clearly on a screen at 500px often doesn't survive at that scale in thread.

**Clear space:** minimum clear space around the logo on any application = the height of the icon's circular "head" element, on all sides. Nothing else (text, other graphics, edge of page) should intrude inside that space.

**Minimum size:** icon-only mark should not be reproduced smaller than 24px (digital) / 0.25in (print) to keep the ribbon detail legible. Below that size, use a simplified silhouette version instead of shrinking the detailed mark.

**Don't:**
- Don't recolor the icon outside the approved palette (Section 2).
- Don't stretch or skew the lockup to fit a space — resize proportionally only.
- Don't place the full-color version on a busy photo background — use the single-color reversed version on photography instead.
- Don't recreate the "COMPANY / GARMENT MANUFACTURING / ETHICAL · FAIR · SUSTAINABLE" three-line descriptor block from the draft as a permanent part of the logo — that was exploratory scaffolding, not a final lockup.

---

## 2. COLOR PALETTE

### Core brand colors

| Name | Hex | Use |
|---|---|---|
| Rich Deep Purple | `#3A2D56` | Primary brand color — logo, headlines, primary buttons |
| Deep Forest Green | `#355E3B` | Secondary brand color — accents, secondary buttons, icons |
| Natural Ivory | `#F3EFE7` | Background color — replaces stark white for a warmer feel |

Both core colors are contrast-verified for text and button use:
- Deep Forest Green on white/ivory: ~8:1 contrast ratio (passes strict accessibility standards even at body-text size)
- Rich Deep Purple on white/ivory, or white text on either color as a button fill: ~8–12:1 contrast ratio

Both are safe to use as body text color, headline color, or button background with white/ivory text — no accessibility workaround needed.

### Extended neutrals (needed for a full system — not in the original draft)

| Name | Hex | Use |
|---|---|---|
| Charcoal Ink | `#2A2622` | Body text default — a warm near-black, not pure black; sits better against the purple/green than true `#000` |
| Warm Gray | `#D9D3C7` | Borders, dividers, disabled states, input outlines |
| Pure White | `#FFFFFF` | Card backgrounds, reversed logo on dark photos, form field backgrounds |

### Tints (for badges, hover states, section backgrounds — using full-saturation purple/green as large background fills reads heavy on a content-dense site)

| Name | Hex (approx.) | Use |
|---|---|---|
| Purple Tint (15%) | `#E6E2EC` | Badge backgrounds, subtle section dividers |
| Green Tint (15%) | `#E1E8E2` | Badge backgrounds, subtle section dividers |

**Usage rule:** Purple leads (primary CTAs, main headlines, logo). Green supports (secondary accents, icons, the occasional highlight — e.g. the Fair Trade / sustainability content specifically, since green already carries that association). Don't use both at full saturation in the same tight visual area (e.g. a button row) — pick one as dominant per section.

---

## 3. TYPOGRAPHY

**Display / headline typeface:** DM Serif Display
**Body / UI typeface:** DM Sans

Both come from the same type family, designed to work together as a pair — low risk of mismatched weight or rhythm between headline and body text.

### Usage rules

| Element | Typeface | Notes |
|---|---|---|
| Logo lockup wordmark | DM Serif Display | Regular weight only — this face has no bold cut |
| Headline sentences (H1/H2) | DM Serif Display, Regular | Reserve for large sizes — it's a display face, not built for small text. Its italic can substitute for the "editorial emphasis" role small caps used to play — use it sparingly on a single word or short phrase within a headline, not the whole line |
| Sub-headings (H3 and smaller), eyebrows/labels | DM Sans, Medium or Bold | Once you're below headline scale, switch to DM Sans — DM Serif Display loses legibility at small sizes |
| Body copy, nav, buttons, forms, captions | DM Sans | Regular (400) for body text, Medium (500) for UI/labels, Bold (700) for emphasis |

**Why the split:** DM Serif Display is a large-scale display face only — no bold weight, and not designed to be read at body-text size. Everything below headline scale moves to DM Sans, which keeps the system legible and fast-loading since you're only pulling in two weights of the serif's single cut plus a few DM Sans weights, not a large multi-weight serif family.

**Web font loading:** load both via `next/font` (Google Fonts) rather than a `<link>` tag, per the technical build spec — avoids render-blocking and keeps Core Web Vitals intact.

**Font weights to load** (don't load every weight — costs performance for no benefit):
- DM Serif Display: Regular (400) and Italic (400) — this is the only cut available
- DM Sans: Regular (400), Medium (500), Bold (700)

---

## 4. APPLICATION QUICK-REFERENCE

- **Website header/nav:** horizontal full-color lockup, purple wordmark
- **Favicon/browser tab:** icon-only, simplified for small size
- **Social media avatar:** stacked lockup or icon-only, depending on platform crop
- **Dark-mode / dark photo overlay:** white reversed version only — never full-color on a dark or busy background
- **Woven label / hang tag / packaging stamp:** the dedicated embroiderable single-path version (Section 1) — never the detailed multi-color icon at small physical scale
- **Buttons (primary CTA):** Rich Deep Purple fill, white text (Poppins SemiBold)
- **Buttons (secondary):** Deep Forest Green fill or purple outline, per section context
- **Section backgrounds:** alternate between Pure White and Natural Ivory for rhythm — reserve the tints for badges/highlights, not full sections

---

## 5. OPEN ITEM

Before this is fully locked: have the designer produce and approve the **simplified embroiderable single-path icon** described in Section 1 — this is the one piece of the system that doesn't yet exist and needs a dedicated pass, since it has different constraints (thread width, minimum gap size) than the screen/print version.

Once that's approved, this document is the final reference — feed it directly into the website build's Design Direction section (Section 10 of the Claude Code prompt) in place of the open branding question there.
