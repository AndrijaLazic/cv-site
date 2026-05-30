/**
 * Background preset definitions.
 * Each preset maps to CSS classes defined in backgrounds.css.
 * Backgrounds use CSS custom property design tokens for both light and dark modes.
 */

export type BackgroundVariant =
  | 'radial-simple'
  | 'radial-layered'
  | 'grid-pattern'
  | 'hero-gradient'
  | 'features-gradient'
  | 'contact-gradient'
  | 'contact-animated'
  | 'aurora'
  | 'mesh-blobs'
  | 'sunset-gradient'

export type OverlayDef = {
  /** Tailwind/CSS classes applied to the overlay element */
  className: string
}

export type BackgroundPreset = {
  /** CSS class applied to the section element for the background */
  sectionClassName: string
  /** Absolutely positioned overlay elements rendered inside the section */
  overlays?: OverlayDef[]
  /** Whether this preset has an animated variant toggled by .bg-animated */
  supportsAnimation: boolean
}

/**
 * All available background presets.
 *
 * 1. radial-simple   - single centered radial gradient, light and subtle
 * 2. radial-layered  - multi-stop radial + linear gradient, premium depth
 * 3. grid-pattern    - dot/grid lines over a gradient base
 * 4. aurora          - shifting gradient aurora (animated via .bg-animated)
 * 5. mesh-blobs      - drifting blurred glow orbs (animated via .bg-animated)
 * 6. contact-animated - animated IDE grid and scanline
 */
export const backgroundPresets: Record<BackgroundVariant, BackgroundPreset> = {
  'radial-simple': {
    sectionClassName: 'bg-preset-radial-simple',
    supportsAnimation: false,
  },

  'radial-layered': {
    sectionClassName: 'bg-preset-radial-layered',
    supportsAnimation: false,
  },

  'grid-pattern': {
    sectionClassName: 'bg-preset-grid-pattern',
    supportsAnimation: false,
  },

  'hero-gradient': {
    sectionClassName: 'bg-preset-hero-gradient',
    supportsAnimation: false,
  },

  'features-gradient': {
    sectionClassName: 'bg-preset-features-gradient',
    supportsAnimation: false,
  },

  'contact-gradient': {
    sectionClassName: 'bg-preset-contact-gradient',
    supportsAnimation: false,
  },

  'contact-animated': {
    sectionClassName: 'bg-preset-contact-animated',
    supportsAnimation: true,
  },

  aurora: {
    sectionClassName: 'bg-preset-aurora',
    supportsAnimation: true,
  },

  'mesh-blobs': {
    sectionClassName: 'bg-preset-mesh-blobs',
    supportsAnimation: true,
    overlays: [
      {
        // Large primary orb, top-left
        className:
          'bg-blob-orb bg-blob-orb-primary bg-blob-drift-1 absolute -top-[20%] -left-[15%] h-[60%] w-[60%] opacity-60',
      },
      {
        // Medium accent orb, bottom-right
        className:
          'bg-blob-orb bg-blob-orb-accent bg-blob-drift-2 absolute -right-[12%] -bottom-[10%] h-[50%] w-[50%] opacity-50',
      },
      {
        // Soft secondary orb, center
        className:
          'bg-blob-orb bg-blob-orb-soft bg-blob-drift-3 absolute top-[35%] left-[40%] h-[45%] w-[40%] opacity-45',
      },
    ],
  },

  'sunset-gradient': {
    sectionClassName: 'bg-preset-sunset-gradient',
    supportsAnimation: false,
  },
}
