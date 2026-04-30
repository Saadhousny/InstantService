# InstantService App Style Guide

**Style direction:** Calm Verified Dispatch  
**Version:** 1.0  
**Use case:** Mobile-first PWA for AI-assisted service diagnosis, contractor dispatch, tier selection, and booking confirmation.

---

## 1. Design Philosophy

InstantService should feel like a calm, intelligent dispatch system that helps users solve real service problems quickly and safely.

The interface must communicate:

- **Trust before excitement**
- **Speed without panic**
- **AI assistance without gimmicks**
- **Premium value without luxury signaling**
- **Clear decisions under stress**
- **Verified contractors, not anonymous marketplace browsing**

The product should not look like a generic contractor directory, a playful chatbot, a futuristic AI demo, or a luxury concierge app.

### Style Name

## Calm Verified Dispatch

A light, blue-led, trust-first operational design system using clean white surfaces, slate neutrals, structured cards, restrained motion, proof-based trust cues, and a helpful but bounded AI assistant.

### First Impression Goal

Within the first 5 seconds, the user should feel:

> “This app understands my issue, looks credible, and can get someone booked quickly.”

---

## 2. Brand Personality

### The Product Should Feel

- Calm
- Capable
- Fast
- Verified
- Professional
- Safe
- Modern
- Clear
- Accountable

### The Product Should Not Feel

- Playful
- Cartoonish
- Salesy
- Chaotic
- Overly futuristic
- Overly luxurious
- Dark and dramatic
- Like a browsing marketplace
- Like a humanized AI companion

### Brand Archetype

InstantService should behave like a **reliable operations dispatcher**.

It should feel like a system that coordinates real work, verifies key details, recommends the best option, and keeps the user informed.

---

## 3. Core UI Principles

### 3.1 One Main Decision Per Screen

Each screen should have one dominant purpose.

Examples:

- Intake screen: describe the problem
- AI result screen: understand the diagnosis
- Tier screen: choose service level
- Dispatch screen: see progress
- Confirmation screen: feel reassured and in control

Avoid mixing multiple major actions on one mobile screen.

### 3.2 Evidence Over Claims

Never rely on vague trust language like:

- “Trusted pros”
- “Top quality”
- “Best service”
- “Fully vetted”

Use specific proof cues instead:

- `License on file`
- `Insurance confirmed`
- `4.9 average rating`
- `132 completed jobs`
- `Accepted 78% of recent requests`
- `Premium coverage active`

### 3.3 AI Should Be Useful, Not Performative

The AI assistant should summarize, structure, and recommend.

It should not feel like:

- A friend
- A mascot
- A character
- A human agent
- A magical robot
- A personality-driven chatbot

### 3.4 Calm Visual Hierarchy

The interface should use spacing, grouping, typography, and restrained color to guide attention.

Do not make everything bright, animated, or highlighted.

### 3.5 Mobile Comes First

All core flows must work beautifully on a phone before desktop views are considered.

Design for:

- One-handed use
- Short text entry
- Large tap targets
- Fast scanning
- Sticky bottom actions
- Minimal visible choices
- Clear progress feedback

---

## 4. Color System

The color system is intentionally narrow. InstantService should use one dominant trust color, a calm support color, sparse warm accents, and a stable slate-neutral foundation.

## 4.1 Core Palette

| Token | Hex | Use |
|---|---:|---|
| `primary` | `#1D4ED8` | Primary actions, selected states, recommended tier, active progress |
| `primaryDark` | `#1E3A8A` | Premium tier, strong trust moments, high-assurance accents |
| `secondary` | `#0F766E` | AI assistant accent, support states, calm operational cues |
| `accent` | `#F59E0B` | Sparse recommendation or coverage highlights |
| `success` | `#15803D` | Completion, confirmation, accepted contractor, verified pass |
| `warning` | `#B45309` | Real urgency, timing risk, attention-needed states |
| `danger` | `#B91C1C` | Errors, failed dispatch, invalid input, severe issue |
| `bg` | `#F8FAFC` | App background |
| `surface` | `#FFFFFF` | Cards, sheets, input surfaces |
| `border` | `#E2E8F0` | Dividers, card borders, input borders |
| `ink` | `#0F172A` | Primary text |
| `subtext` | `#334155` | Secondary text |
| `muted` | `#64748B` | Helper text, timestamps, tertiary labels |

---

## 4.2 Extended Color Tokens

### Primary Blue

| Token | Hex | Use |
|---|---:|---|
| `blue50` | `#EFF6FF` | Light selected backgrounds |
| `blue100` | `#DBEAFE` | Focus rings, soft active backgrounds |
| `blue600` | `#2563EB` | Hover or alternate primary |
| `blue700` | `#1D4ED8` | Primary action |
| `blue900` | `#1E3A8A` | Premium and high-trust emphasis |

### Slate Neutrals

| Token | Hex | Use |
|---|---:|---|
| `slate50` | `#F8FAFC` | Page background |
| `slate100` | `#F1F5F9` | Subtle panels |
| `slate200` | `#E2E8F0` | Borders |
| `slate300` | `#CBD5E1` | Disabled borders |
| `slate500` | `#64748B` | Muted text |
| `slate700` | `#334155` | Secondary text |
| `slate900` | `#0F172A` | Main text |

### Teal Support

| Token | Hex | Use |
|---|---:|---|
| `teal50` | `#F0FDFA` | AI support chip background |
| `teal100` | `#CCFBF1` | Soft assistant backgrounds |
| `teal700` | `#0F766E` | AI assistant accent |

### Amber Accent

| Token | Hex | Use |
|---|---:|---|
| `amber50` | `#FFFBEB` | Coverage chip background |
| `amber100` | `#FEF3C7` | Recommendation highlight background |
| `amber500` | `#F59E0B` | Sparse attention accent |
| `amber700` | `#B45309` | Warning text or filled urgency states |

---

## 4.3 Tier Colors

| Tier | Color | Hex | Meaning |
|---|---|---:|---|
| Basic | Slate | `#475569` | Verified, practical, flexible timing |
| Plus | Blue | `#1D4ED8` | Best balance of speed and proof |
| Premium | Deep Navy | `#1E3A8A` | Priority, accountability, strongest assurance |

### Tier Color Rule

Basic must never look unsafe or disabled.  
Plus should feel like the recommended mainstream choice.  
Premium should feel more accountable, not more luxurious.

---

## 4.4 Color Usage Rules

### Do

- Use blue for primary actions and main selection states.
- Use teal for AI support and calm system intelligence.
- Use amber only for selective attention: `Recommended`, `Coverage`, `Arrives soon`.
- Use green only when something is complete or verified.
- Use red only for real errors or severe issues.
- Keep most screens white, slate, and blue.

### Do Not

- Do not use purple gradients for AI.
- Do not use red or orange as the brand foundation.
- Do not use black and gold for Premium.
- Do not make the whole app dark.
- Do not communicate status through color alone.
- Do not place small white text on amber.

---

## 5. Typography

## 5.1 Primary Font

Use:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Why

Inter is neutral, readable, modern, and appropriate for SaaS, dashboards, mobile forms, and operational interfaces.

Use Inter only for the MVP. Do not introduce a second brand font unless there is a strong future marketing reason.

---

## 5.2 Font Weights

| Weight | Use |
|---:|---|
| `400` | Body text |
| `500` | Labels, helper text, secondary UI |
| `600` | Buttons, chips, cards, navigation |
| `700` | Screen titles, major confirmations, important numbers |

---

## 5.3 Mobile Type Scale

| Token | Size / Line Height | Use |
|---|---|---|
| `caption` | `12px / 16px` | Meta labels, timestamps |
| `small` | `13px / 18px` | Small labels, chips |
| `bodySm` | `14px / 20px` | Compact card text |
| `body` | `16px / 24px` | Default body |
| `lead` | `18px / 26px` | AI lead response, important text |
| `sectionTitle` | `20px / 28px` | Section headings |
| `screenTitle` | `24px / 32px` | Mobile screen titles |
| `hero` | `28px / 36px` | Landing or high-impact title |
| `confirmation` | `34px / 40px` | Confirmation result headline |

---

## 5.4 Typography Rules

### Do

- Use persistent input labels.
- Use short, direct headings.
- Left-align almost all text.
- Keep line lengths short on mobile.
- Use semibold for actionable UI.
- Use large type for status and confirmation.

### Do Not

- Do not use placeholder-only fields.
- Do not center long paragraphs.
- Do not use condensed fonts.
- Do not use playful rounded display fonts.
- Do not use serif headlines in the core dispatch flow.
- Do not use all caps except for tiny metadata labels.

---

## 6. Spacing System

Use a 4px spacing scale.

| Token | Value | Use |
|---|---:|---|
| `space1` | `4px` | Tiny gaps |
| `space2` | `8px` | Icon/text gaps |
| `space3` | `12px` | Compact vertical gaps |
| `space4` | `16px` | Default card padding, screen padding |
| `space5` | `20px` | Larger internal spacing |
| `space6` | `24px` | Section gaps |
| `space8` | `32px` | Major screen separation |
| `space10` | `40px` | Large hero spacing |

### Mobile Defaults

- Screen horizontal padding: `16px`
- Card padding: `16px`
- Large card padding: `20px`
- Section gap: `24px`
- Card gap: `12px` to `16px`
- Sticky footer padding: `12px 16px`

---

## 7. Radius System

| Token | Value | Use |
|---|---:|---|
| `radiusSm` | `10px` | Small chips, compact elements |
| `radiusMd` | `12px` | Buttons, inputs |
| `radiusLg` | `16px` | Cards |
| `radiusXl` | `20px` | Bottom sheets, modals |
| `radiusFull` | `9999px` | Pills, status chips |

### Rule

Corners should feel modern and friendly, but not cute.

Avoid overly pill-shaped main buttons unless the button is part of a chip or small selector.

---

## 8. Elevation and Borders

## 8.1 Border First, Shadow Second

InstantService should rely more on clean borders than heavy shadows.

Cards should feel structured and credible, not floating or decorative.

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 1px rgba(15, 23, 42, 0.04);
--shadow-md: 0 6px 18px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04);
--shadow-lg: 0 14px 32px rgba(15, 23, 42, 0.12);
```

### Elevation Rules

| Surface | Treatment |
|---|---|
| Default card | Border + very light shadow |
| Selected tier card | Strong border + moderate shadow |
| Sticky footer | Top border + slight blur |
| Bottom sheet | Strongest shadow |
| Modal | Strongest shadow + background dim |
| Inline chips | No shadow |

### Do Not Use

- Glassmorphism
- Heavy blur
- Neon glow
- Dramatic floating cards
- Multi-layer stacked shadows

---

## 9. Icons

Use outline icons with a clean operational feel.

Recommended library:

```txt
lucide-react
```

### Icon Style

- Stroke width: `1.75px` to `2px`
- Default size: `20px`
- Small chip icon: `14px` to `16px`
- Large status icon: `40px` to `56px`

### Recommended Icon Concepts

| Concept | Icon Direction |
|---|---|
| Verified | Shield check |
| AI assistant | Sparkle inside structured circle, not a face |
| Dispatch | Route, send, or radar line |
| Contractor | Badge, briefcase, or user-check |
| Time | Clock |
| Coverage | Shield star |
| Success | Circle check |
| Warning | Triangle alert |
| Error | Circle alert |
| Edit | Pencil |
| Details | Chevron down |

### Icon Rules

- Pair icons with text labels whenever meaning matters.
- Do not use icons as decoration in dense screens.
- Do not use emoji as UI icons.
- Do not use robot-face icons for the AI in the core product flow.

---

## 10. Buttons

## 10.1 Button Hierarchy

### Primary Button

Used for the main action on each screen.

Examples:

- `Continue`
- `Analyze issue`
- `Choose Plus`
- `Dispatch request`
- `Confirm booking`

```html
<button class="h-12 w-full rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-200">
  Continue
</button>
```

### Secondary Button

Used for an alternative but safe action.

Examples:

- `Review details`
- `Change tier`
- `Edit request`

```html
<button class="h-12 w-full rounded-md border border-border bg-surface px-4 text-sm font-semibold text-ink shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100">
  Review details
</button>
```

### Tertiary / Ghost Button

Used for low-emphasis actions.

Examples:

- `Why this tier?`
- `View proof`
- `Need help?`

```html
<button class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-subtext hover:bg-slate-100">
  Why this tier?
</button>
```

---

## 10.2 Button Rules

### Do

- Use one primary button per screen.
- Make primary mobile buttons full width.
- Use `48px` to `52px` height.
- Use clear verbs.
- Keep labels short.
- Place primary action near the bottom on mobile when appropriate.

### Do Not

- Do not use gradient CTAs.
- Do not use multiple filled buttons on one screen.
- Do not make destructive actions red unless they are truly destructive.
- Do not use vague labels like `Submit`.
- Do not use tiny inline CTAs for important actions.

---

## 11. Inputs and Forms

## 11.1 Input Style

Inputs should be clear, calm, and label-first.

```html
<label class="mb-1.5 block text-sm font-medium text-ink">
  What service problem are you having?
</label>

<textarea
  class="min-h-[120px] w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-100"
  placeholder="Example: My sink is leaking under the cabinet..."
></textarea>

<p class="mt-2 text-sm text-muted">
  Include what happened, where it is, and how urgent it feels.
</p>
```

## 11.2 Form Rules

### Do

- Use persistent labels.
- Use helper text for ambiguous fields.
- Use field-specific keyboard types.
- Show errors inline.
- Use plain-language correction.
- Keep form fields minimal.

### Do Not

- Do not rely on placeholder text as the only label.
- Do not ask for unnecessary data before the user sees value.
- Do not use long forms in the first step.
- Do not hide errors in toast messages only.

---

## 12. Cards

Cards are the main structural component of the app.

## 12.1 Default Card

```html
<div class="rounded-lg border border-border bg-surface p-4 shadow-sm">
  ...
</div>
```

Use for:

- AI response blocks
- Contractor proof rows
- Booking summaries
- Tier cards
- Dispatch progress
- Confirmation details

## 12.2 Selected / Recommended Card

```html
<div class="rounded-lg border-2 border-primary bg-surface p-4 shadow-md">
  ...
</div>
```

Use for:

- Selected tier
- AI-recommended tier
- Active dispatch result
- Important confirmation card

## 12.3 Card Rules

### Do

- Use headings inside cards.
- Group related proof items together.
- Keep cards visually quiet.
- Use border emphasis before shadow.
- Use chips for metadata.

### Do Not

- Do not over-stack cards inside cards.
- Do not use image-heavy cards in the booking flow.
- Do not use dramatic shadows.
- Do not use glass effects.

---

## 13. Chips and Badges

Chips should make key information quickly scannable.

## 13.1 Common Chips

```html
<span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
  Recommended
</span>
```

```html
<span class="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-secondary">
  AI analyzed
</span>
```

```html
<span class="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-warning">
  Coverage
</span>
```

```html
<span class="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-success">
  Verified
</span>
```

## 13.2 Tier Chips

```html
<span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-tierBasic">
  Basic
</span>
```

```html
<span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-tierPlus">
  Plus
</span>
```

```html
<span class="inline-flex items-center rounded-full bg-blue-950/5 px-2.5 py-1 text-xs font-semibold text-tierPremium">
  Premium
</span>
```

## 13.3 Chip Rules

### Do

- Use chips for status, tier, urgency, category, and proof.
- Pair color with text.
- Keep chip labels to 1 to 3 words.
- Use icons only when they add clarity.

### Do Not

- Do not use too many chips in one row.
- Do not use chips as decoration.
- Do not make all chips bright.
- Do not rely on chip color alone.

---

## 14. AI Assistant Visual System

## 14.1 Assistant Name

Use one of:

- `InstantService Assistant`
- `Dispatch AI`

Recommended default:

## Dispatch AI

This is clear, functional, and not overly human.

Avoid human names like:

- Ava
- Max
- Sam
- Riley

Avoid playful names like:

- FixBot
- HandyBot
- Service Buddy

---

## 14.2 AI Visual Identity

The AI should be represented by an abstract operational mark, not a character.

### Recommended AI Mark

A small circular icon combining:

- Blue outer circle
- Teal inner accent
- Spark/check/route symbol
- No face
- No robot head
- No cartoon expression

### Mascot Rule

Do **not** use a mascot in the core service flow.

A mascot would weaken the reliable, professional dispatch feel and could make the AI seem less serious in urgent real-world service contexts.

A limited abstract assistant mark is acceptable. A character mascot is not.

### Acceptable

- Abstract AI mark
- Small assistant icon
- Structured status symbol
- Motion dot during analysis

### Not Acceptable

- Smiling robot
- Human avatar
- Animal mascot
- Cartoon contractor
- Animated character
- Chatbot with facial expressions

---

## 14.3 AI Response Layout

Use a hybrid chat + structured card model.

### User Message

- Right-aligned
- Compact
- Very light blue background
- Plain text

```html
<div class="ml-auto max-w-[85%] rounded-lg bg-blue-50 px-4 py-3 text-sm text-ink">
  My kitchen sink is leaking under the cabinet.
</div>
```

### Assistant Message

- Full-width white card
- Assistant icon in header
- Short conclusion
- Structured chips
- Disclosure for reasoning
- Clear next step

```html
<div class="rounded-lg border border-border bg-surface p-4 shadow-sm">
  <div class="mb-3 flex items-center gap-2">
    <div class="flex size-8 items-center justify-center rounded-full bg-teal-50 text-secondary">
      <!-- icon -->
    </div>
    <p class="text-sm font-semibold text-ink">Dispatch AI</p>
  </div>

  <p class="text-base leading-6 text-ink">
    This looks like a plumbing issue that should be handled soon.
  </p>

  <div class="mt-3 flex flex-wrap gap-2">
    <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Plumbing</span>
    <span class="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-warning">High urgency</span>
    <span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">Plus recommended</span>
  </div>

  <button class="mt-4 text-sm font-semibold text-primary">
    Why this recommendation?
  </button>
</div>
```

---

## 14.4 AI Voice and Copy

### AI Should Sound

- Calm
- Direct
- Helpful
- Specific
- Bounded
- Non-dramatic

### AI Should Not Sound

- Cute
- Overly emotional
- Overconfident
- Robotic
- Salesy
- Like a human pretending to care

### Good AI Copy

> “This looks like a plumbing issue with moderate urgency. Plus is recommended because it balances faster dispatch with stronger contractor proof.”

> “You can edit this before dispatch.”

> “I found the most relevant service category based on your description.”

### Bad AI Copy

> “Oh no! That sounds terrible. I’m here for you!”

> “I have magically diagnosed your problem.”

> “Premium is the only safe option.”

> “Your perfect pro is waiting!”

---

## 15. Tier System

The tier system should feel graduated, factual, and fair.

Users should understand the difference between tiers without feeling pressured.

---

## 15.1 Basic Tier

### Positioning

Verified help for simple jobs when timing is flexible.

### Visual Treatment

- Slate accent
- White card
- Subtle border
- No warning colors
- No disabled styling

### Descriptor

> Best for simple tasks when timing is flexible.

### Proof Cues

- `Verified contractor`
- `Business identity on file`
- `Standard availability`

### Example Card

```md
Basic
Best for simple tasks when timing is flexible.

Includes:
- Verified contractor
- Standard dispatch
- Basic job details shared

Proof:
License/business identity on file
```

### Rule

Basic must feel safe and legitimate. It is not the “bad” option.

---

## 15.2 Plus Tier

### Positioning

Best balance of speed, reliability, and proof.

### Visual Treatment

- Primary blue accent
- Recommended badge when AI selects it
- Slightly stronger border
- Moderate elevation when selected

### Descriptor

> Best balance of speed and proof.

### Proof Cues

- `Verified contractor`
- `Higher recent rating`
- `Better acceptance rate`
- `Faster expected response`

### Example Card

```md
Plus
Best balance of speed and proof.

Includes:
- Faster dispatch priority
- Stronger contractor proof
- Higher recent acceptance rate

Recommended for this issue
```

### Rule

Plus should usually feel like the default best choice.

---

## 15.3 Premium Tier

### Positioning

Priority dispatch with stronger accountability.

### Visual Treatment

- Deep navy accent
- Small amber coverage chip
- Strongest proof row
- No gold luxury treatment

### Descriptor

> Best for urgent or high-trust jobs.

### Proof Cues

- `Priority dispatch`
- `Premium coverage`
- `Strongest contractor proof`
- `Fastest response window`

### Example Card

```md
Premium
Best for urgent or high-trust jobs.

Includes:
- Priority dispatch
- Strongest contractor proof
- Premium coverage
- Fastest response window

Coverage active
```

### Rule

Premium should feel safer and more accountable, not fancy or elite.

Avoid:

- VIP
- Elite
- Luxury
- White glove
- Gold styling
- Black premium cards

---

## 15.4 Tier Card Structure

Each tier card should include:

1. Tier name
2. One-line descriptor
3. Three benefit bullets max
4. One proof row
5. One timing/accountability row
6. Optional badge: `Recommended` or `Coverage`

Do not use a large comparison table on mobile.

---

## 16. Trust and Verification System

## 16.1 Proof Row

Use proof rows to make trust visible without overwhelming the screen.

```html
<div class="flex items-start gap-3 rounded-md bg-slate-50 p-3">
  <div class="mt-0.5 text-success">
    <!-- shield-check icon -->
  </div>
  <div>
    <p class="text-sm font-semibold text-ink">Verified contractor</p>
    <p class="text-sm text-muted">License/business identity on file</p>
  </div>
</div>
```

---

## 16.2 Contractor Card

A contractor card should include:

- Name or business name
- Verification status
- Rating and review count
- Job/category match
- Acceptance rate if available
- Estimated arrival window
- Tier eligibility
- Contact or details action

### Example Content

```md
Northline Plumbing
Verified contractor

4.9 average · 132 reviews
Accepted 78% of recent requests
Eligible for Plus and Premium jobs

Estimated arrival: 2:30–3:15 PM
```

---

## 16.3 Trust Language Rules

### Use

- `License on file`
- `Insurance confirmed`
- `Business identity verified`
- `Eligible for Plus`
- `Premium coverage active`
- `Reviewed before dispatch`
- `You can edit this before confirming`

### Avoid

- `Fully vetted`
- `Guaranteed best`
- `Certified expert`
- `100% safe`
- `Background checked` unless actually true
- `Government verified` unless actually true
- `Bank-grade security`

---

## 17. Dispatch Progress System

The dispatch screen should reduce uncertainty.

Do not use an endless spinner as the main dispatch experience.

## 17.1 Dispatch Steps

Use a vertical staged progress card:

1. Analyzing request
2. Checking verified pros
3. Waiting for acceptance
4. Booking confirmed

### Example

```md
Dispatch in progress

✓ Request analyzed
✓ Verified pros checked
● Waiting for contractor acceptance
○ Booking confirmed
```

## 17.2 Visual Rules

- Completed steps use green check.
- Active step uses blue or teal active indicator.
- Pending steps use muted slate.
- Include short explanatory text.
- Show estimated response windows where possible.

## 17.3 Loading Copy

### Good

> “Checking eligible contractors near you.”

> “Waiting for a verified contractor to accept.”

> “This usually takes a few moments.”

### Bad

> “Loading…”

> “Please wait…”

> “Finding magic…”

---

## 18. Motion and Interaction

Motion should make the system feel responsive and coordinated.

## 18.1 Motion Personality

- Quiet
- Fast
- Useful
- State-based
- Non-decorative

## 18.2 Timing

| Interaction | Duration |
|---|---:|
| Button press | `120ms` to `150ms` |
| Chip selection | `120ms` to `180ms` |
| Card reveal | `180ms` to `220ms` |
| Bottom sheet open | `220ms` to `280ms` |
| Dispatch step update | `180ms` to `240ms` |

## 18.3 Recommended Easing

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
```

## 18.4 Allowed Motion

- Checkmark fill
- Subtle fade
- Small upward slide
- Active progress pulse
- Button press feedback
- Sheet transition
- Skeleton loading for known layouts

## 18.5 Avoided Motion

- Confetti
- Bouncing chat bubbles
- Animated mascots
- Floating AI particles
- Parallax
- Scrolljacking
- Long fake typing indicators
- Multiple pulsing elements at once

## 18.6 Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 19. Audio Confirmation

The product can use voice/audio confirmation, but audio must remain controlled by the user.

## 19.1 Audio Rules

### Do

- Provide a visible transcript.
- Provide replay.
- Provide mute.
- Use clear play/pause controls.
- Keep confirmation text available without audio.
- Let the user control when audio plays.

### Do Not

- Do not autoplay loud audio.
- Do not make audio the only confirmation.
- Do not hide important details inside audio only.
- Do not use overly emotional voice lines.

### Audio Confirmation UI

Recommended elements:

- Play button
- Transcript
- Booking summary
- Contractor details
- Arrival window
- Tier selected
- Confirmation ID

---

## 20. Mobile Layout System

## 20.1 App Shell

```html
<main class="min-h-dvh bg-bg text-ink">
  <section class="mx-auto flex max-w-md flex-col gap-4 px-4 pb-28 pt-4">
    ...
  </section>

  <div class="fixed inset-x-0 bottom-0 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
    <div class="mx-auto max-w-md">
      <button class="h-12 w-full rounded-md bg-primary text-sm font-semibold text-white shadow-sm">
        Dispatch request
      </button>
    </div>
  </div>
</main>
```

## 20.2 Mobile Rules

### Do

- Use a single-column layout.
- Keep primary action in the thumb-friendly lower area.
- Use sticky footer CTAs on tier and confirmation screens.
- Keep key summary above the fold.
- Use vertical tier cards.
- Use bottom sheets for secondary details.

### Do Not

- Do not use side-by-side tier comparison on phone.
- Do not put the only important CTA in the top-right corner.
- Do not use dense desktop dashboards on mobile.
- Do not hide critical status in small text.
- Do not require excessive typing.

---

## 21. Screen-Level Guidance

## 21.1 Welcome / Entry Screen

### Goal

Reassure the user and get them into problem description quickly.

### Should Include

- Short headline
- One-sentence value prop
- Problem input CTA
- Trust row
- Optional service category examples

### Example Headline

> Get the right service help, fast.

### Example Subtext

> Describe the issue. Dispatch AI recommends the right service tier and helps book a verified contractor.

### Avoid

- Long marketing hero copy
- Stock photo overload
- Mascots
- Multiple competing CTAs

---

## 21.2 Problem Intake Screen

### Goal

Let the user explain the problem with minimal friction.

### Should Include

- Large text area
- Optional guided chips
- Urgency selector
- Location/service area field
- Primary CTA: `Analyze issue`

### Suggested Chips

- `Leaking`
- `No power`
- `Locked out`
- `Appliance issue`
- `Heating/cooling`
- `Not sure`

### Rule

The intake screen should feel like a calm triage form, not a chatbot game.

---

## 21.3 AI Analysis Screen

### Goal

Show that the AI understood the issue and recommend the next step.

### Should Include

- Short AI conclusion
- Category chip
- Urgency chip
- Recommended tier chip
- Explanation disclosure
- Edit option
- CTA: `Choose a tier`

### Example

```md
This looks like a plumbing issue with moderate urgency.

Plumbing · Moderate urgency · Plus recommended

Why this recommendation?
Recommended based on issue type, urgency, and contractor availability.
```

---

## 21.4 Tier Selection Screen

### Goal

Help the user choose Basic, Plus, or Premium without pressure.

### Should Include

- Three vertical cards
- AI recommended badge
- Clear differences
- Proof row per tier
- Sticky CTA

### CTA Examples

- `Continue with Plus`
- `Dispatch with Premium`
- `Choose Basic`

### Avoid

- Large feature matrix
- Fear-selling
- Making Basic look unsafe
- Gold luxury styling for Premium

---

## 21.5 Dispatch Screen

### Goal

Reduce uncertainty while contractor matching happens.

### Should Include

- Staged progress card
- Current step explanation
- Expected timing
- Tier selected
- Option to review request
- No distracting promotional content

### Example Copy

> Checking eligible Plus contractors near you.

---

## 21.6 Contractor Accepted Screen

### Goal

Confirm progress and establish trust in the assigned contractor.

### Should Include

- Success state
- Contractor card
- Verification proof
- Arrival estimate
- Booking details
- Audio confirmation option
- CTA: `View booking`

### Example Headline

> Contractor accepted.

---

## 21.7 Booking Confirmation Screen

### Goal

Create relief and confidence.

### Should Include

- Large success icon
- `Booked` headline
- Confirmation ID
- Contractor details
- Arrival window
- Tier selected
- Coverage status
- Audio replay
- Contact/cancel/review actions

### Tone

Calm relief, not celebration theater.

Avoid confetti or overly excited copy.

---

## 21.8 Contractor Dashboard

The contractor side should be denser and more operational.

### Should Feel

- Efficient
- Clear
- Tactical
- Fast
- Status-aware

### Should Include

- Incoming job card
- Tier label
- Location/area
- Job summary
- Expected payout or job value if available
- Accept/decline actions
- Time sensitivity
- Contractor stats

### Accept/Decline Pattern

```html
<div class="grid grid-cols-2 gap-3">
  <button class="h-12 rounded-md border border-border bg-surface text-sm font-semibold text-ink">
    Decline
  </button>
  <button class="h-12 rounded-md bg-primary text-sm font-semibold text-white">
    Accept
  </button>
</div>
```

---

## 22. Copywriting System

## 22.1 Voice

InstantService copy should be:

- Direct
- Reassuring
- Specific
- Plain-language
- Short
- Action-oriented

## 22.2 Good Words

Use words like:

- Verified
- Recommended
- Eligible
- Confirmed
- Covered
- Dispatch
- Arrival window
- Review
- Edit
- Continue
- Accepted
- On file

## 22.3 Avoid Words

Avoid words like:

- Magical
- Elite
- VIP
- Luxury
- Perfect
- Guaranteed
- Cheapest
- Hurry
- Panic
- Bot
- Buddy
- Instantly guaranteed

## 22.4 CTA Rules

Good CTA labels:

- `Analyze issue`
- `Choose Plus`
- `Dispatch request`
- `Confirm booking`
- `Review details`
- `Edit request`
- `View contractor`

Bad CTA labels:

- `Submit`
- `Go`
- `Next`
- `Let’s do this`
- `Find my perfect pro`
- `Unlock Premium`

---

## 23. Accessibility Rules

## 23.1 Contrast

- Body text must meet at least `4.5:1`.
- Large text must meet at least `3:1`.
- Meaningful UI components must meet at least `3:1`.
- Do not rely on color alone.

## 23.2 Touch Targets

Design important controls to at least:

```txt
44px x 44px minimum
48px x 48px preferred
```

## 23.3 Focus States

All keyboard-operable controls need visible focus states.

Recommended:

```css
focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary
```

## 23.4 Reduced Motion

Support `prefers-reduced-motion`.

All decorative motion should be removable without removing meaning.

## 23.5 Text and Zoom

- Support browser zoom.
- Avoid fixed-height containers that clip text.
- Use readable default text sizes.
- Avoid important horizontal scrolling.

## 23.6 Audio and Voice

- Provide text alternative for audio.
- Never make audio the only way to receive confirmation.
- Do not autoplay important audio.

---

## 24. Imagery and Illustration

## 24.1 Core Product Flow

Use almost no imagery.

The core flow should be structured UI, not illustration-led.

## 24.2 Marketing / Empty States

Imagery may be used outside the transactional flow.

Acceptable:

- Real service-context photography
- Clean device mockups
- Abstract operational illustrations
- Minimal line illustrations

Avoid:

- Cartoon repair workers
- Robot mascots
- Overly happy stock photos
- Dark futuristic AI graphics
- Decorative isometric city scenes
- Fake contractor portraits

---

## 25. Tailwind Theme Tokens

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        primaryDark: "#1E3A8A",
        secondary: "#0F766E",
        accent: "#F59E0B",
        success: "#15803D",
        warning: "#B45309",
        danger: "#B91C1C",

        bg: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E2E8F0",
        ink: "#0F172A",
        subtext: "#334155",
        muted: "#64748B",

        tierBasic: "#475569",
        tierPlus: "#1D4ED8",
        tierPremium: "#1E3A8A",
      },

      borderRadius: {
        sm: "10px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        full: "9999px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(15,23,42,0.06), 0 1px 1px rgba(15,23,42,0.04)",
        md: "0 6px 18px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04)",
        lg: "0 14px 32px rgba(15,23,42,0.12)",
      },

      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["28px", { lineHeight: "36px" }],
        "4xl": ["34px", { lineHeight: "40px" }],
      },
    },
  },
};
```

---

## 26. CSS Variables

```css
:root {
  --color-primary: #1D4ED8;
  --color-primary-dark: #1E3A8A;
  --color-secondary: #0F766E;
  --color-accent: #F59E0B;
  --color-success: #15803D;
  --color-warning: #B45309;
  --color-danger: #B91C1C;

  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-ink: #0F172A;
  --color-subtext: #334155;
  --color-muted: #64748B;

  --radius-sm: 10px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 1px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 6px 18px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 14px 32px rgba(15, 23, 42, 0.12);

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 27. Implementation Checklist

Before a screen is considered aligned with the style guide, check:

### Visual

- [ ] Light background
- [ ] White structured cards
- [ ] Blue primary CTA
- [ ] Slate text hierarchy
- [ ] Limited accent color
- [ ] No decorative gradients
- [ ] No mascot or cartoon AI
- [ ] No dark futuristic styling

### UX

- [ ] One dominant action
- [ ] Clear next step
- [ ] Minimal typing
- [ ] Mobile-first layout
- [ ] Sticky CTA where useful
- [ ] Important information above the fold
- [ ] No unnecessary comparison overload

### Trust

- [ ] Specific proof cues
- [ ] Contractor verification shown plainly
- [ ] AI recommendation is explainable
- [ ] User can review or edit before dispatch
- [ ] No exaggerated trust claims
- [ ] Basic tier does not look unsafe

### Accessibility

- [ ] Body text contrast passes
- [ ] Touch targets are large enough
- [ ] Focus states are visible
- [ ] Color is not the only signal
- [ ] Motion can be reduced
- [ ] Audio has text equivalent

---

## 28. Final Design Verdict

InstantService should use **Calm Verified Dispatch** as its frontend style foundation.

This means:

- Light, clean, mobile-first UI
- Blue-led trust system
- Slate-neutral structure
- Teal AI support cues
- Amber only for sparse attention
- Green only for completion
- Red only for true problems
- Inter as the core font
- Bordered, low-shadow cards
- Structured AI responses
- Proof-heavy contractor information
- Fair, non-manipulative tier design
- No mascot in the core product
- No dark futuristic AI styling
- No luxury black/gold Premium treatment

The final product should feel like a serious, modern service dispatch platform powered by AI — not like an AI toy, not like a contractor directory, and not like a high-pressure upsell funnel.
