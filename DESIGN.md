---
name: Cinematic Jazz Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e3beb8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#aa8984'
  outline-variant: '#5a403c'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#8b0000'
  on-primary-container: '#ff907f'
  inverse-primary: '#b52619'
  secondary: '#ffe2ab'
  on-secondary: '#402d00'
  secondary-container: '#ffbf00'
  on-secondary-container: '#6d5000'
  tertiary: '#e9c349'
  on-tertiary: '#3c2f00'
  tertiary-container: '#cca730'
  on-tertiary-container: '#4f3e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#920703'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#fbbc00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-script:
    fontFamily: Vintage Calligraphic (Custom)
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-xl:
    fontFamily: Newsreader
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 32px
  margin-edge: 64px
  column-count: '12'
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style

The brand personality of this design system is sophisticated, nocturnal, and deeply atmospheric. It targets a high-end creative audience, evoking the smoky, intellectual ambiance of a 1960s jazz club combined with the prestige of a limited-edition art monograph. The emotional response is one of nostalgia, exclusivity, and focused storytelling.

The visual style is a fusion of **Minimalism** and **Tactile Analog**. It rejects the sterile perfection of modern digital interfaces in favor of a "living" surface. Every screen should feel like a frame from a 35mm film reel, utilizing high-contrast lighting (chiaroscuro) to direct the eye. The aesthetic is defined by heavy grain, intentional light leaks on the periphery, and a soft optical blur on non-essential background elements, creating a sense of physical depth and historical weight.

## Colors

The palette is rooted in a "Noir" foundation. The primary background is a rich, near-black (heavy black shadows), providing the canvas for dramatic highlights.

- **Primary (Deep Red):** Used for high-impact accents, active states, and evocative storytelling elements. It should feel like velvet or aged wine.
- **Secondary (Warm Amber):** Used for interactive cues and subtle highlights. It mimics the glow of a stage spotlight or a vacuum tube.
- **Tertiary (Gold):** Reserved for prestige markers, branding flourishes, and fine-line borders. 
- **Neutral:** A range of blacks and deep charcoals to manage depth.

Apply a 5-10% opacity grain overlay across all color fills to maintain the analog film texture.

## Typography

This design system employs a three-tier typographic hierarchy to establish its editorial tone:

1.  **The Signature:** A vintage calligraphic script used sparingly for branding and personal marks. It represents the "artist's hand."
2.  **The Editorial Voice:** **Newsreader** is used for titles and headlines. It should be set with high contrast—either very large or with significant surrounding whitespace. Its serif stems provide the intellectual authority of a broadsheet.
3.  **The Functional Layer:** **Inter** provides a clean, utilitarian contrast to the expressive serif. It ensures readability for navigation and metadata, maintaining a professional "Swiss" undertone amidst the cinematic drama.

## Layout & Spacing

The layout follows a **Fixed Modular Grid** inspired by mid-century editorial design. The grid is rigid to provide a sense of order, but content is art-directed to "float" within it, often breaking the vertical rhythm for dramatic effect.

- **Margins:** Generous 64px outer margins create a "matted frame" effect, pushing content toward the center to increase perceived value.
- **Asymmetry:** Use empty columns to create tension. Heavy use of whitespace (or "black space") is encouraged to emphasize singular focal points.
- **Rhythm:** Spacing should be extreme—either very tight for grouped metadata or very wide (80px+) between sections to allow the visuals to breathe.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Optical Effects** rather than traditional drop shadows.

- **The Base:** The deepest black (#080808) serves as the "stage."
- **Surfaces:** Elevated components like cards use a slightly lighter charcoal with a 1px Gold or Deep Red border at 20% opacity.
- **Atmosphere:** Use "Light Leaks" (linear gradients of Warm Amber at 5-10% opacity) to suggest a light source coming from off-screen.
- **Focus:** Primary content should be crisp, while secondary background elements should have a subtle Gaussian blur (3-5px) to simulate a shallow depth of field.

## Shapes

The design system utilizes **Sharp (0)** edges across all primary UI components. This reinforces the "cut" feel of a film strip and the precision of editorial print. 

Circular elements are permitted only for specific decorative "record" motifs or small profile avatars to provide a rare geometric counterpoint to the prevailing rectangular grid. All buttons, input fields, and containers must maintain 90-degree corners.

## Components

- **Buttons:** Ghost-style with a 1px solid Gold border or solid Deep Red fills. Use `label-caps` typography. Hover states should trigger a subtle "glow" effect rather than a color change.
- **Cards:** Borderless by default. Use high-contrast photography as the background, with text overlays using a "Scrim" (bottom-up black gradient) to ensure legibility.
- **Input Fields:** Minimalist single-line underlines in Tertiary Gold. Labels should sit above in `label-caps`.
- **Navigation:** A persistent but unobtrusive sidebar or bottom-docked menu. Use extreme letter spacing for menu items.
- **Film Grain Overlay:** A global `div` with a fixed position, 5% opacity, and a looping noise animation to simulate the flicker of a projector.
- **Project Dividers:** Use thin, 1px horizontal lines that do not span the full width of the container, mimicking the "crop marks" of a printing press.