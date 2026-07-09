# KakaoBank Design System

A design system for **KakaoBank (카카오뱅크)** — Korea's first internet-only bank, launched 2017-07-27 as a
consortium between Kakao Corp and Korea Investment Holdings. It is listed on KOSPI (323410). Product lines
include everyday transaction banking, **26주적금** (26-week savings challenge), **모임통장** (shared group
account), **세이프박스** (safe-box sub-account), and **mini** (youth account, ages 14–18).

This system is derived from a prose design-research brief (brand guideline excerpts + live-DOM verification
of kakaobank.com), not from an attached codebase or Figma file. No component library or UI source was
provided — see **Caveats** below.

**Sources referenced in the brief** (not directly accessible to this tool; treat as provenance, not live links):
- KakaoBank Brand Identity Guidelines V2.0 (Aug 2024) — `kakaobank.com/view/about/brand/resource`, PDF at
  `kakaobank.com/static/etc/logo/KakaoBank_BrandIdentityGuidelines_V2.0.pdf`
- Live DOM verification — `kakaobank.com/` and `kakaobank.com/view/service`
- Press/secondary — Wikipedia (KakaoBank), KED Global, Korea Herald, KoalaGains (IPO + financials)

## Index

- `styles.css` — root stylesheet, imports every token file below. Link this one file.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `motion.css`, `fonts.css`
- `components/` — reusable primitives (see **Components** below)
- `ui_kits/corporate-site/` — kakaobank.com recreation (hero, service tabs, product cards, footer)
- `ui_kits/mobile-app/` — in-app screens (home/account list, transfer amount entry, transfer success)
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius, elevation, voice, logo)
- `assets/` — visual assets (see **Iconography** below — currently empty; no source assets were provided)

## Components

Component inventory was **defined by the source brief itself** (its `tokens.components` block enumerated
named component specs), so this system builds exactly that inventory — not an invented standard set:

- **Button** (`components/button/`) — variants: yellow-solid (primary CTA), black-solid (secondary strong),
  outline (tertiary), critical (destructive), nav-link (top-nav text item)
- **Tabs** (`components/tabs/`) — variants: sub-nav (corporate sub-section), service (product-category),
  segmented (pill switcher)
- **Card** (`components/cards/`) — variants: product (corporate white card), section-fill (gray promo block),
  debit (yellow CR-80 card face)
- **Input** (`components/forms/`) — variants: default (form field), amount (hero transfer numeral)
- **Badge** (`components/feedback/`) — variants: notification (red dot), status-positive, status-critical
- **ListItem** (`components/lists/`) — account/transaction row, 64px, rounded-square avatar

## Content Fundamentals

KakaoBank writes like **a friendly fintech that knows it's still a bank** — warm enough to sound like a
message from a friend, precise enough that the compliance copy underneath holds up.

- **Sentence ending**: `해요체` (`-어요`/`-예요`) for all product and marketing copy. `합니다체` only for
  legal/약관 and regulatory surfaces, where clarity outranks warmth.
- **Possessive framing**: `나의` ("my") recurs — banking is framed as personal infrastructure, not
  institutional service. Verified hero: *"나의 첫 번째 AI 은행"* / *"나의 일상 속 유용한 금융 서비스를 만듭니다"*.
- **CTAs**: verb-only or verb+noun, short. `이체하기`, `확인`, `다음`, `보내기`.
- **System messages**: observational, short, no emotion. `이체가 완료되었어요`, `잔액이 부족해요`.
- **Errors**: cause + one immediate action, never a bare apology. `잔액이 부족해요. 다른 계좌에서 보내볼래요?`
  Never `오류가 발생했습니다` standalone.
- **Success toasts**: past tense, short. `이체 완료`. No celebratory emoji, no over-messaging.
- **Empty states**: always suggest exactly one next action, never "no data." `아직 계좌가 없어요` +
  `카카오뱅크 입출금통장을 만들어보세요`.
- **Product naming puns rather than describes**: `세이프박스` not "secondary holding account", `26주적금`
  not "26-week recurring deposit", `모임통장` not "shared group account."
- **Forbidden phrases**: `불편을 드려 죄송합니다`, `데이터가 없습니다`, `오류가 발생했습니다` (standalone),
  marketing superlatives (`혁신적인`, `최고의`, `업계 최초`), English left untranslated (`Get Started` →
  `시작하기`), imperative mood (`-해라`), emoji in UI chrome (emoji IS fine in editorial/content copy).
- **Voice does not vary by persona** — it varies by **context**: product moments get character and warmth;
  compliance moments get plain, exact `합니다체`.

## Visual Foundations

- **Color**: one brand yellow (`#FFE300`, exact — never `#FAE100`/`#FEE500`/`#FFCC00`), near-black
  `#1E1E1E` for all text (never pure `#000000`), white canvas. Three-step neutral scale
  (`#1E1E1E`/`#A3A3A3`/`#CCCCCC`) with no in-between grays. Semantic colors (error red, success green,
  warning amber, iOS-blue link) are strictly functional — yellow is never used for status.
- **Type**: Pretendard Variable only, no custom display face. Weight carries emphasis, never italics.
  Hero pushes to 800 as the one confidence moment; everything else stays 400/600/700.
- **Spacing**: 4px base unit; 20px mobile gutter; 1360px max web content width; 80px section rhythm.
- **Backgrounds**: flat solid fills only — no gradients, no photography-driven hero backgrounds, no
  repeating textures/patterns. Depth is expressed through background-fill steps
  (`#FFFFFF → #F7F7F7 → #F9F9F9`), not imagery. Kakao Friends mascot illustrations appear only inside
  product cards (debit card face, savings challenge), never as page backgrounds.
- **Corner radius**: 12px is the family default (buttons, inputs, product cards, avatars-as-rounded-squares
  — never circular). 16px for section-fill/debit cards, pill (9999px) for badges and segmented controls.
- **Cards**: shadow-free by default (`box-shadow: none`); depth comes from bg-fill steps and 1px
  `#E6E6E6` borders/dividers, not elevation.
- **Elevation**: near-zero. Corporate site is 100% flat. In-app shadows appear only for floating
  action buttons, tooltips, and bottom sheets — see `guidelines/elevation-scale.card.html`.
- **Motion**: no bounce/spring anywhere except one moment — the success-confirmation checkmark
  (`ease-spring-success`, mass 1 / stiffness 380 / damping 28). Everything else uses standard
  cubic-bezier eases at 150–350ms. Balance changes slide 8px + fade, never count up. Yellow never
  cross-fades through an intermediate tint — it's binary on/off.
- **Hover/press**: no darkening on press (there is no darker yellow in the palette) — press state is
  `opacity: 0.85` on solid buttons. Focus rings are always black, never yellow (yellow is brand, not
  interaction state).
- **Transparency/blur**: modal scrim is `rgba(0,0,0,0.4)` — lighter than most banking apps, keeping
  context visible underneath. No backdrop-blur observed in source material.
- **Imagery tone**: not directly sourced (no photography was provided) — where imagery is needed, use
  neutral, warm-toned placeholders; avoid cold blue-toned fintech stock photography.

## Iconography

No icon system, icon font, or SVG set was provided in the source brief — `assets/` is currently empty.
The brief mentions emoji-free UI chrome (emoji only appear in editorial content, never in interface
text) and Kakao Friends mascot illustrations (Ryan/Apeach/Tube/Muzi) as product-moment decoration —
neither was suppliable as a real asset without access to KakaoBank's actual brand files. Mobile-app
mockups in `ui_kits/mobile-app/` use plain-text/emoji stand-ins (🔔, ✓) only as functional placeholders,
never as a stylistic choice — **swap these for the real icon set once available.**

## Logo

**No official KakaoBank logo/symbol file was supplied.** Per instructions, none was fabricated. The
`ui_kits/` and `guidelines/logo-placeholder.card.html` files render the wordmark "KakaoBank" in plain
Pretendard type on a yellow rounded-square placeholder — this is explicitly a stand-in, not a
recreation of the real mark (a stylized 'B' with 'I' at its center, per the brand guideline). Replace
with the real logo files as soon as they're available.

## Caveats — please help iterate

- **No codebase, Figma file, or brand-asset ZIP was attached** — everything here is derived from a
  prose research brief. Component pixel values (padding, exact radii) are as specified in that brief;
  they have not been cross-checked against a live app build.
- **No logo/symbol/wordmark asset exists in this project** — see Logo section above. Please attach the
  official SVG/PNG so it can be dropped into `assets/`.
- **No icon set exists in this project** — please attach the app's real icon font/SVG sprite, or confirm
  a CDN icon set (e.g. Lucide) as an acceptable substitute.
- **Mobile-app component specs are inferred**, not DOM-verified (the brief notes they live in the iOS/
  Android client, which isn't inspectable here) — treat button/card/input specs on mobile screens as
  best-effort until validated against the real app.
- **No webfont binary was provided** — `tokens/fonts.css` loads Pretendard Variable from its public
  open-source CDN (jsDelivr). If KakaoBank provides licensed local font files, swap the `src: url()`.
