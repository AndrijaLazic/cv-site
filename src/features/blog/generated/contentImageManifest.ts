export type ResponsiveContentImageFormat = 'avif' | 'webp'

export type ResponsiveContentImageVariant = {
  src: string
  width: number
}

export type ResponsiveContentImageEntry = {
  width: number
  height: number
  formats: Partial<
    Record<ResponsiveContentImageFormat, ResponsiveContentImageVariant[]>
  >
}

export const contentImageManifest: Record<string, ResponsiveContentImageEntry> =
  {
    '/blog/001-what-is-dfmea/dfmea.webp': {
      width: 1280,
      height: 720,
      formats: {
        avif: [
          {
            src: '/blog/001-what-is-dfmea/dfmea.w360.avif',
            width: 360,
          },
          {
            src: '/blog/001-what-is-dfmea/dfmea.w640.avif',
            width: 640,
          },
          {
            src: '/blog/001-what-is-dfmea/dfmea.w960.avif',
            width: 960,
          },
          {
            src: '/blog/001-what-is-dfmea/dfmea.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/blog/001-what-is-dfmea/dfmea.w360.webp',
            width: 360,
          },
          {
            src: '/blog/001-what-is-dfmea/dfmea.w640.webp',
            width: 640,
          },
          {
            src: '/blog/001-what-is-dfmea/dfmea.w960.webp',
            width: 960,
          },
          {
            src: '/blog/001-what-is-dfmea/dfmea.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/blog/002-what-is-fmea/dfmea-vs-pfmea.webp': {
      width: 1280,
      height: 853,
      formats: {
        avif: [
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w360.avif',
            width: 360,
          },
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w640.avif',
            width: 640,
          },
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w960.avif',
            width: 960,
          },
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w360.webp',
            width: 360,
          },
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w640.webp',
            width: 640,
          },
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w960.webp',
            width: 960,
          },
          {
            src: '/blog/002-what-is-fmea/dfmea-vs-pfmea.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/blog/002-what-is-fmea/fmea-handbook.webp': {
      width: 1400,
      height: 1003,
      formats: {
        avif: [
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w360.avif',
            width: 360,
          },
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w640.avif',
            width: 640,
          },
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w960.avif',
            width: 960,
          },
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w360.webp',
            width: 360,
          },
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w640.webp',
            width: 640,
          },
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w960.webp',
            width: 960,
          },
          {
            src: '/blog/002-what-is-fmea/fmea-handbook.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/blog/003-what-is-pfmea/pfmea.webp': {
      width: 1280,
      height: 720,
      formats: {
        avif: [
          {
            src: '/blog/003-what-is-pfmea/pfmea.w360.avif',
            width: 360,
          },
          {
            src: '/blog/003-what-is-pfmea/pfmea.w640.avif',
            width: 640,
          },
          {
            src: '/blog/003-what-is-pfmea/pfmea.w960.avif',
            width: 960,
          },
          {
            src: '/blog/003-what-is-pfmea/pfmea.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/blog/003-what-is-pfmea/pfmea.w360.webp',
            width: 360,
          },
          {
            src: '/blog/003-what-is-pfmea/pfmea.w640.webp',
            width: 640,
          },
          {
            src: '/blog/003-what-is-pfmea/pfmea.w960.webp',
            width: 960,
          },
          {
            src: '/blog/003-what-is-pfmea/pfmea.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/images/certifications/iso-9001-2015-en.webp': {
      width: 1442,
      height: 2048,
      formats: {
        avif: [
          {
            src: '/images/certifications/iso-9001-2015-en.w360.avif',
            width: 360,
          },
          {
            src: '/images/certifications/iso-9001-2015-en.w640.avif',
            width: 640,
          },
          {
            src: '/images/certifications/iso-9001-2015-en.w960.avif',
            width: 960,
          },
          {
            src: '/images/certifications/iso-9001-2015-en.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/images/certifications/iso-9001-2015-en.w360.webp',
            width: 360,
          },
          {
            src: '/images/certifications/iso-9001-2015-en.w640.webp',
            width: 640,
          },
          {
            src: '/images/certifications/iso-9001-2015-en.w960.webp',
            width: 960,
          },
          {
            src: '/images/certifications/iso-9001-2015-en.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/images/certifications/iso-9001-2015-sr.webp': {
      width: 1441,
      height: 2048,
      formats: {
        avif: [
          {
            src: '/images/certifications/iso-9001-2015-sr.w360.avif',
            width: 360,
          },
          {
            src: '/images/certifications/iso-9001-2015-sr.w640.avif',
            width: 640,
          },
          {
            src: '/images/certifications/iso-9001-2015-sr.w960.avif',
            width: 960,
          },
          {
            src: '/images/certifications/iso-9001-2015-sr.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/images/certifications/iso-9001-2015-sr.w360.webp',
            width: 360,
          },
          {
            src: '/images/certifications/iso-9001-2015-sr.w640.webp',
            width: 640,
          },
          {
            src: '/images/certifications/iso-9001-2015-sr.w960.webp',
            width: 960,
          },
          {
            src: '/images/certifications/iso-9001-2015-sr.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/images/partners/amazon-dark-logo.webp': {
      width: 1800,
      height: 757,
      formats: {
        avif: [
          {
            src: '/images/partners/amazon-dark-logo.w360.avif',
            width: 360,
          },
          {
            src: '/images/partners/amazon-dark-logo.w640.avif',
            width: 640,
          },
          {
            src: '/images/partners/amazon-dark-logo.w960.avif',
            width: 960,
          },
          {
            src: '/images/partners/amazon-dark-logo.w1280.avif',
            width: 1280,
          },
          {
            src: '/images/partners/amazon-dark-logo.w1600.avif',
            width: 1600,
          },
        ],
        webp: [
          {
            src: '/images/partners/amazon-dark-logo.w360.webp',
            width: 360,
          },
          {
            src: '/images/partners/amazon-dark-logo.w640.webp',
            width: 640,
          },
          {
            src: '/images/partners/amazon-dark-logo.w960.webp',
            width: 960,
          },
          {
            src: '/images/partners/amazon-dark-logo.w1280.webp',
            width: 1280,
          },
          {
            src: '/images/partners/amazon-dark-logo.w1600.webp',
            width: 1600,
          },
        ],
      },
    },
    '/images/partners/amazon-light-logo.webp': {
      width: 1800,
      height: 757,
      formats: {
        avif: [
          {
            src: '/images/partners/amazon-light-logo.w360.avif',
            width: 360,
          },
          {
            src: '/images/partners/amazon-light-logo.w640.avif',
            width: 640,
          },
          {
            src: '/images/partners/amazon-light-logo.w960.avif',
            width: 960,
          },
          {
            src: '/images/partners/amazon-light-logo.w1280.avif',
            width: 1280,
          },
          {
            src: '/images/partners/amazon-light-logo.w1600.avif',
            width: 1600,
          },
        ],
        webp: [
          {
            src: '/images/partners/amazon-light-logo.w360.webp',
            width: 360,
          },
          {
            src: '/images/partners/amazon-light-logo.w640.webp',
            width: 640,
          },
          {
            src: '/images/partners/amazon-light-logo.w960.webp',
            width: 960,
          },
          {
            src: '/images/partners/amazon-light-logo.w1280.webp',
            width: 1280,
          },
          {
            src: '/images/partners/amazon-light-logo.w1600.webp',
            width: 1600,
          },
        ],
      },
    },
    '/images/partners/amazon-logo.webp': {
      width: 960,
      height: 290,
      formats: {
        avif: [
          {
            src: '/images/partners/amazon-logo.w360.avif',
            width: 360,
          },
          {
            src: '/images/partners/amazon-logo.w640.avif',
            width: 640,
          },
          {
            src: '/images/partners/amazon-logo.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/images/partners/amazon-logo.w360.webp',
            width: 360,
          },
          {
            src: '/images/partners/amazon-logo.w640.webp',
            width: 640,
          },
          {
            src: '/images/partners/amazon-logo.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/images/partners/aunde.png': {
      width: 383,
      height: 255,
      formats: {
        avif: [
          {
            src: '/images/partners/aunde.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/images/partners/aunde.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/images/partners/grah-logo.webp': {
      width: 526,
      height: 167,
      formats: {
        avif: [
          {
            src: '/images/partners/grah-logo.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/images/partners/grah-logo.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/images/partners/moretto-logo.webp': {
      width: 359,
      height: 81,
      formats: {},
    },
    '/images/partners/sinterfuse-logo.webp': {
      width: 1254,
      height: 246,
      formats: {
        avif: [
          {
            src: '/images/partners/sinterfuse-logo.w360.avif',
            width: 360,
          },
          {
            src: '/images/partners/sinterfuse-logo.w640.avif',
            width: 640,
          },
          {
            src: '/images/partners/sinterfuse-logo.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/images/partners/sinterfuse-logo.w360.webp',
            width: 360,
          },
          {
            src: '/images/partners/sinterfuse-logo.w640.webp',
            width: 640,
          },
          {
            src: '/images/partners/sinterfuse-logo.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/images/partners/zastava-tervo.png': {
      width: 402,
      height: 131,
      formats: {
        avif: [
          {
            src: '/images/partners/zastava-tervo.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/images/partners/zastava-tervo.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/images/product/control-plan-example.webp': {
      width: 1277,
      height: 862,
      formats: {
        avif: [
          {
            src: '/images/product/control-plan-example.w360.avif',
            width: 360,
          },
          {
            src: '/images/product/control-plan-example.w640.avif',
            width: 640,
          },
          {
            src: '/images/product/control-plan-example.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/images/product/control-plan-example.w360.webp',
            width: 360,
          },
          {
            src: '/images/product/control-plan-example.w640.webp',
            width: 640,
          },
          {
            src: '/images/product/control-plan-example.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/images/product/pfd-example-mobile.webp': {
      width: 932,
      height: 1423,
      formats: {
        avif: [
          {
            src: '/images/product/pfd-example-mobile.w360.avif',
            width: 360,
          },
          {
            src: '/images/product/pfd-example-mobile.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/images/product/pfd-example-mobile.w360.webp',
            width: 360,
          },
          {
            src: '/images/product/pfd-example-mobile.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/images/product/pfd-example-new.webp': {
      width: 1479,
      height: 920,
      formats: {
        avif: [
          {
            src: '/images/product/pfd-example-new.w360.avif',
            width: 360,
          },
          {
            src: '/images/product/pfd-example-new.w640.avif',
            width: 640,
          },
          {
            src: '/images/product/pfd-example-new.w960.avif',
            width: 960,
          },
          {
            src: '/images/product/pfd-example-new.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/images/product/pfd-example-new.w360.webp',
            width: 360,
          },
          {
            src: '/images/product/pfd-example-new.w640.webp',
            width: 640,
          },
          {
            src: '/images/product/pfd-example-new.w960.webp',
            width: 960,
          },
          {
            src: '/images/product/pfd-example-new.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/images/product/pfmea.png': {
      width: 1277,
      height: 862,
      formats: {
        avif: [
          {
            src: '/images/product/pfmea.w360.avif',
            width: 360,
          },
          {
            src: '/images/product/pfmea.w640.avif',
            width: 640,
          },
          {
            src: '/images/product/pfmea.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/images/product/pfmea.w360.webp',
            width: 360,
          },
          {
            src: '/images/product/pfmea.w640.webp',
            width: 640,
          },
          {
            src: '/images/product/pfmea.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/001-fmea-excellence/cover.png': {
      width: 1600,
      height: 1600,
      formats: {
        avif: [
          {
            src: '/news/001-fmea-excellence/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/001-fmea-excellence/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/001-fmea-excellence/cover.w960.avif',
            width: 960,
          },
          {
            src: '/news/001-fmea-excellence/cover.w1280.avif',
            width: 1280,
          },
          {
            src: '/news/001-fmea-excellence/cover.w1600.avif',
            width: 1600,
          },
        ],
        webp: [
          {
            src: '/news/001-fmea-excellence/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/001-fmea-excellence/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/001-fmea-excellence/cover.w960.webp',
            width: 960,
          },
          {
            src: '/news/001-fmea-excellence/cover.w1280.webp',
            width: 1280,
          },
          {
            src: '/news/001-fmea-excellence/cover.w1600.webp',
            width: 1600,
          },
        ],
      },
    },
    '/news/001-fmea-excellence/image-1.png': {
      width: 294,
      height: 265,
      formats: {},
    },
    '/news/001-fmea-excellence/image-2.png': {
      width: 530,
      height: 325,
      formats: {
        avif: [
          {
            src: '/news/001-fmea-excellence/image-2.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/news/001-fmea-excellence/image-2.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/news/001-fmea-excellence/image-3.png': {
      width: 489,
      height: 244,
      formats: {
        avif: [
          {
            src: '/news/001-fmea-excellence/image-3.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/news/001-fmea-excellence/image-3.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/news/001-fmea-excellence/image-4.png': {
      width: 469,
      height: 247,
      formats: {
        avif: [
          {
            src: '/news/001-fmea-excellence/image-4.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/news/001-fmea-excellence/image-4.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/news/001-fmea-excellence/image-5.jpg': {
      width: 1024,
      height: 683,
      formats: {
        avif: [
          {
            src: '/news/001-fmea-excellence/image-5.w360.avif',
            width: 360,
          },
          {
            src: '/news/001-fmea-excellence/image-5.w640.avif',
            width: 640,
          },
          {
            src: '/news/001-fmea-excellence/image-5.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/001-fmea-excellence/image-5.w360.webp',
            width: 360,
          },
          {
            src: '/news/001-fmea-excellence/image-5.w640.webp',
            width: 640,
          },
          {
            src: '/news/001-fmea-excellence/image-5.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/001-fmea-excellence/image-6.png': {
      width: 1024,
      height: 725,
      formats: {
        avif: [
          {
            src: '/news/001-fmea-excellence/image-6.w360.avif',
            width: 360,
          },
          {
            src: '/news/001-fmea-excellence/image-6.w640.avif',
            width: 640,
          },
          {
            src: '/news/001-fmea-excellence/image-6.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/001-fmea-excellence/image-6.w360.webp',
            width: 360,
          },
          {
            src: '/news/001-fmea-excellence/image-6.w640.webp',
            width: 640,
          },
          {
            src: '/news/001-fmea-excellence/image-6.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/002-why-excellence/cover.png': {
      width: 1123,
      height: 795,
      formats: {
        avif: [
          {
            src: '/news/002-why-excellence/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/002-why-excellence/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/002-why-excellence/cover.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/002-why-excellence/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/002-why-excellence/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/002-why-excellence/cover.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.jpg': {
      width: 1600,
      height: 1067,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w960.avif',
            width: 960,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w1280.avif',
            width: 1280,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w1600.avif',
            width: 1600,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w960.webp',
            width: 960,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w1280.webp',
            width: 1280,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/cover.w1600.webp',
            width: 1600,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-1.jpg': {
      width: 768,
      height: 512,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-1.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-1.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-1.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-1.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-2.jpg': {
      width: 768,
      height: 312,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-2.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-2.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-2.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-2.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-3.jpg': {
      width: 768,
      height: 512,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-3.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-3.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-3.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-3.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-4.jpg': {
      width: 768,
      height: 512,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-4.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-4.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-4.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-4.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-5.jpg': {
      width: 768,
      height: 512,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-5.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-5.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-5.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-5.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-6.jpg': {
      width: 768,
      height: 333,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-6.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-6.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-6.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-6.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-7.jpg': {
      width: 768,
      height: 655,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-7.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-7.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-7.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-7.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-8.jpg': {
      width: 768,
      height: 512,
      formats: {
        avif: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-8.w360.avif',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-8.w640.avif',
            width: 640,
          },
        ],
        webp: [
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-8.w360.webp',
            width: 360,
          },
          {
            src: '/news/003-fmea-excellence-at-see-automotive-conference-2025/image-8.w640.webp',
            width: 640,
          },
        ],
      },
    },
    '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.png': {
      width: 960,
      height: 621,
      formats: {
        avif: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/cover.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/004-fmea-excellence-and-grah-automotive-partnership/image-1.jpg': {
      width: 624,
      height: 415,
      formats: {
        avif: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-1.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-1.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/news/004-fmea-excellence-and-grah-automotive-partnership/image-2.jpg': {
      width: 624,
      height: 106,
      formats: {
        avif: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-2.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-2.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3-sr.png':
      {
        width: 768,
        height: 710,
        formats: {
          avif: [
            {
              src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3-sr.w360.avif',
              width: 360,
            },
            {
              src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3-sr.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3-sr.w360.webp',
              width: 360,
            },
            {
              src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3-sr.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.png': {
      width: 1600,
      height: 1479,
      formats: {
        avif: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w360.avif',
            width: 360,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w640.avif',
            width: 640,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w960.avif',
            width: 960,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w1280.avif',
            width: 1280,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w1600.avif',
            width: 1600,
          },
        ],
        webp: [
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w360.webp',
            width: 360,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w640.webp',
            width: 640,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w960.webp',
            width: 960,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w1280.webp',
            width: 1280,
          },
          {
            src: '/news/004-fmea-excellence-and-grah-automotive-partnership/image-3.w1600.webp',
            width: 1600,
          },
        ],
      },
    },
    '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/cover.png':
      {
        width: 599,
        height: 599,
        formats: {
          avif: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/cover.w360.avif',
              width: 360,
            },
          ],
          webp: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/cover.w360.webp',
              width: 360,
            },
          ],
        },
      },
    '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-1.png':
      {
        width: 903,
        height: 475,
        formats: {
          avif: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-1.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-1.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-2.jpg':
      {
        width: 493,
        height: 328,
        formats: {
          avif: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-2.w360.avif',
              width: 360,
            },
          ],
          webp: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-2.w360.webp',
              width: 360,
            },
          ],
        },
      },
    '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-3.jpg':
      {
        width: 484,
        height: 363,
        formats: {
          avif: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-3.w360.avif',
              width: 360,
            },
          ],
          webp: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-3.w360.webp',
              width: 360,
            },
          ],
        },
      },
    '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.jpg':
      {
        width: 1024,
        height: 621,
        formats: {
          avif: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.w360.avif',
              width: 360,
            },
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.w640.avif',
              width: 640,
            },
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.w360.webp',
              width: 360,
            },
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.w640.webp',
              width: 640,
            },
            {
              src: '/news/005-fmea-excellence-and-faculty-of-engineering-university-of-kragujevac-partnership/image-4.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/cover.png':
      {
        width: 374,
        height: 374,
        formats: {
          avif: [
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/cover.w360.avif',
              width: 360,
            },
          ],
          webp: [
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/cover.w360.webp',
              width: 360,
            },
          ],
        },
      },
    '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.jpg':
      {
        width: 1024,
        height: 453,
        formats: {
          avif: [
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.w640.avif',
              width: 640,
            },
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.w640.webp',
              width: 640,
            },
            {
              src: '/news/006-fmea-excellence-among-the-300-most-innovative-startups-in-serbia-within-the-startech-program/image-1.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/007-fmea-excellence-joins-techsight/cover.png': {
      width: 1430,
      height: 1430,
      formats: {
        avif: [
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w960.avif',
            width: 960,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w960.webp',
            width: 960,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/cover.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/news/007-fmea-excellence-joins-techsight/image-1.png': {
      width: 1024,
      height: 576,
      formats: {
        avif: [
          {
            src: '/news/007-fmea-excellence-joins-techsight/image-1.w360.avif',
            width: 360,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/image-1.w640.avif',
            width: 640,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/image-1.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/007-fmea-excellence-joins-techsight/image-1.w360.webp',
            width: 360,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/image-1.w640.webp',
            width: 640,
          },
          {
            src: '/news/007-fmea-excellence-joins-techsight/image-1.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/008-fmea-excellence-joins-otp-finsight/cover.png': {
      width: 1380,
      height: 837,
      formats: {
        avif: [
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w960.avif',
            width: 960,
          },
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w960.webp',
            width: 960,
          },
          {
            src: '/news/008-fmea-excellence-joins-otp-finsight/cover.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.png':
      {
        width: 1175,
        height: 768,
        formats: {
          avif: [
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/cover.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.jpg':
      {
        width: 1024,
        height: 652,
        formats: {
          avif: [
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.w640.avif',
              width: 640,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.w640.webp',
              width: 640,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-1.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.jpg':
      {
        width: 1024,
        height: 546,
        formats: {
          avif: [
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.w640.avif',
              width: 640,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.w640.webp',
              width: 640,
            },
            {
              src: '/news/009-fmea-excellence-selected-to-represent-serbia-at-web-summit-2025-in-lisbon/image-2.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/010-fmea-excellence-accepted-into-nvidia-inception/cover.png': {
      width: 468,
      height: 287,
      formats: {
        avif: [
          {
            src: '/news/010-fmea-excellence-accepted-into-nvidia-inception/cover.w360.avif',
            width: 360,
          },
        ],
        webp: [
          {
            src: '/news/010-fmea-excellence-accepted-into-nvidia-inception/cover.w360.webp',
            width: 360,
          },
        ],
      },
    },
    '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.jpg':
      {
        width: 1600,
        height: 1067,
        formats: {
          avif: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w960.avif',
              width: 960,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w960.webp',
              width: 960,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/cover.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-1.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-1.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-1.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-2.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-2.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-2.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-3.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-3.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-3.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-4.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-4.w360.avif',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-4.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-4.w360.webp',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-4.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-5.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-5.w360.avif',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-5.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-5.w360.webp',
              width: 360,
            },
            {
              src: '/news/011-fmea-excellence-among-the-top-35-startups-at-the-startech-pitch-event/image-5.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.jpg':
      {
        width: 1024,
        height: 684,
        formats: {
          avif: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/cover.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-1.jpg':
      {
        width: 768,
        height: 513,
        formats: {
          avif: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-1.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-1.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-2.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-2.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-2.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-3.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-3.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/012-fmea-excellence-at-the-xiii-logistics-and-transport-conference/image-3.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/013-digitalleather-at-web-summit-2025/cover.png': {
      width: 1592,
      height: 1081,
      formats: {
        avif: [
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w960.avif',
            width: 960,
          },
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w1280.avif',
            width: 1280,
          },
        ],
        webp: [
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w960.webp',
            width: 960,
          },
          {
            src: '/news/013-digitalleather-at-web-summit-2025/cover.w1280.webp',
            width: 1280,
          },
        ],
      },
    },
    '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.jpg':
      {
        width: 1600,
        height: 1066,
        formats: {
          avif: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w960.avif',
              width: 960,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w960.webp',
              width: 960,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/cover.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.w640.avif',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.w640.webp',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-1.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.w640.avif',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.w640.webp',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-2.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.w640.avif',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.w640.webp',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-3.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.w360.avif',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.w640.avif',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.w360.webp',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.w640.webp',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-4.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.w360.avif',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.w640.avif',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.w360.webp',
              width: 360,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.w640.webp',
              width: 640,
            },
            {
              src: '/news/014-digitalleather-at-istanbul-development-dialogues-2025/image-5.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/cover.png':
      {
        width: 782,
        height: 586,
        formats: {
          avif: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/cover.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/cover.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-1.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-1.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-1.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-2.jpg':
      {
        width: 768,
        height: 512,
        formats: {
          avif: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-2.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-2.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-3.jpg':
      {
        width: 768,
        height: 539,
        formats: {
          avif: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-3.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/015-fmea-excellence-at-the-10th-international-cooperation-forum/image-3.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.jpg':
      {
        width: 1080,
        height: 788,
        formats: {
          avif: [
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/cover.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/image-1.jpg':
      {
        width: 819,
        height: 1024,
        formats: {
          avif: [
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/image-1.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/016-fmea-excellence-successfully-completes-the-otp-finsight-accelerator/image-1.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.jpg': {
      width: 1600,
      height: 1200,
      formats: {
        avif: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w360.avif',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w640.avif',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w960.avif',
            width: 960,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w1280.avif',
            width: 1280,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w1600.avif',
            width: 1600,
          },
        ],
        webp: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w360.webp',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w640.webp',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w960.webp',
            width: 960,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w1280.webp',
            width: 1280,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/cover.w1600.webp',
            width: 1600,
          },
        ],
      },
    },
    '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.jpg': {
      width: 1000,
      height: 800,
      formats: {
        avif: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.w360.avif',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.w640.avif',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.w360.webp',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.w640.webp',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-1.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.jpg': {
      width: 1000,
      height: 800,
      formats: {
        avif: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.w360.avif',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.w640.avif',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.w360.webp',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.w640.webp',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-2.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.jpg': {
      width: 1000,
      height: 800,
      formats: {
        avif: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.w360.avif',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.w640.avif',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.w360.webp',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.w640.webp',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-3.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.jpg': {
      width: 1000,
      height: 800,
      formats: {
        avif: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.w360.avif',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.w640.avif',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.w360.webp',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.w640.webp',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-4.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.jpg': {
      width: 1000,
      height: 800,
      formats: {
        avif: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.w360.avif',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.w640.avif',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.w960.avif',
            width: 960,
          },
        ],
        webp: [
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.w360.webp',
            width: 360,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.w640.webp',
            width: 640,
          },
          {
            src: '/news/017-fmea-excellence-awarded-a-45-000-startech-grant/image-5.w960.webp',
            width: 960,
          },
        ],
      },
    },
    '/news/018-fmea-excellence-becomes-a-member-of-automotive-cluster-serbia/cover.jpg':
      {
        width: 718,
        height: 280,
        formats: {
          avif: [
            {
              src: '/news/018-fmea-excellence-becomes-a-member-of-automotive-cluster-serbia/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/018-fmea-excellence-becomes-a-member-of-automotive-cluster-serbia/cover.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/018-fmea-excellence-becomes-a-member-of-automotive-cluster-serbia/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/018-fmea-excellence-becomes-a-member-of-automotive-cluster-serbia/cover.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/019-fmea-excellence-at-250-years-of-american-business-excellence/cover.jpg':
      {
        width: 700,
        height: 467,
        formats: {
          avif: [
            {
              src: '/news/019-fmea-excellence-at-250-years-of-american-business-excellence/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/019-fmea-excellence-at-250-years-of-american-business-excellence/cover.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/019-fmea-excellence-at-250-years-of-american-business-excellence/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/019-fmea-excellence-at-250-years-of-american-business-excellence/cover.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.jpg':
      {
        width: 1600,
        height: 1067,
        formats: {
          avif: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w960.avif',
              width: 960,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w960.webp',
              width: 960,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/cover.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.w640.avif',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.w640.webp',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-1.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.w640.avif',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.w640.webp',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-2.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.w640.avif',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.w640.webp',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-3.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.jpg':
      {
        width: 1000,
        height: 800,
        formats: {
          avif: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.w360.avif',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.w640.avif',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.w360.webp',
              width: 360,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.w640.webp',
              width: 640,
            },
            {
              src: '/news/020-fmea-excellence-pitches-to-50-business-angels-at-the-dsi-investor-session/image-4.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.webp':
      {
        width: 1200,
        height: 400,
        formats: {
          avif: [
            {
              src: '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.w360.avif',
              width: 360,
            },
            {
              src: '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.w640.avif',
              width: 640,
            },
            {
              src: '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.w360.webp',
              width: 360,
            },
            {
              src: '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.w640.webp',
              width: 640,
            },
            {
              src: '/news/021-digitalleather-joins-startsmart-see-accelerator-2026/startsmart-logo.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover-preview.webp':
      {
        width: 800,
        height: 533,
        formats: {
          avif: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover-preview.w360.avif',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover-preview.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover-preview.w360.webp',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover-preview.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.webp':
      {
        width: 1620,
        height: 1080,
        formats: {
          avif: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w960.avif',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w960.webp',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/cover.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.webp':
      {
        width: 1620,
        height: 1080,
        formats: {
          avif: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w640.avif',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w960.avif',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w640.webp',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w960.webp',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-1.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.webp':
      {
        width: 1620,
        height: 1080,
        formats: {
          avif: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w640.avif',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w960.avif',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w640.webp',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w960.webp',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-2.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.webp':
      {
        width: 1620,
        height: 1080,
        formats: {
          avif: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w640.avif',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w960.avif',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w640.webp',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w960.webp',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-3.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.webp':
      {
        width: 1620,
        height: 1080,
        formats: {
          avif: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w360.avif',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w640.avif',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w960.avif',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w360.webp',
              width: 360,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w640.webp',
              width: 640,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w960.webp',
              width: 960,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/022-digitalleather-at-eu-opportunities-week-2026-local-development-and-green-transition/image-4.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.webp':
      {
        width: 1280,
        height: 853,
        formats: {
          avif: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w360.avif',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w640.avif',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w960.avif',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w1280.avif',
              width: 1280,
            },
          ],
          webp: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w360.webp',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w640.webp',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w960.webp',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover-preview.w1280.webp',
              width: 1280,
            },
          ],
        },
      },
    '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.webp':
      {
        width: 1280,
        height: 853,
        formats: {
          avif: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w960.avif',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w1280.avif',
              width: 1280,
            },
          ],
          webp: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w960.webp',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/cover.w1280.webp',
              width: 1280,
            },
          ],
        },
      },
    '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-1.webp':
      {
        width: 800,
        height: 1066,
        formats: {
          avif: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-1.w640.avif',
              width: 640,
            },
          ],
          webp: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-1.w640.webp',
              width: 640,
            },
          ],
        },
      },
    '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.webp':
      {
        width: 1500,
        height: 2000,
        formats: {
          avif: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w640.avif',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w960.avif',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w1280.avif',
              width: 1280,
            },
          ],
          webp: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w640.webp',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w960.webp',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-2.w1280.webp',
              width: 1280,
            },
          ],
        },
      },
    '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.webp':
      {
        width: 1280,
        height: 853,
        formats: {
          avif: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w640.avif',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w960.avif',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w1280.avif',
              width: 1280,
            },
          ],
          webp: [
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w640.webp',
              width: 640,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w960.webp',
              width: 960,
            },
            {
              src: '/news/023-fmea-excellence-at-see-automotive-conference-connect-and-supply-2026/image-3.w1280.webp',
              width: 1280,
            },
          ],
        },
      },
    '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover-preview.webp':
      {
        width: 480,
        height: 240,
        formats: {
          avif: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover-preview.w360.avif',
              width: 360,
            },
          ],
          webp: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover-preview.w360.webp',
              width: 360,
            },
          ],
        },
      },
    '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.webp':
      {
        width: 1200,
        height: 600,
        formats: {
          avif: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.w360.avif',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.w640.avif',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.w960.avif',
              width: 960,
            },
          ],
          webp: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.w360.webp',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.w640.webp',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/cover.w960.webp',
              width: 960,
            },
          ],
        },
      },
    '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.webp':
      {
        width: 4000,
        height: 3000,
        formats: {
          avif: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w360.avif',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w640.avif',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w960.avif',
              width: 960,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w360.webp',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w640.webp',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w960.webp',
              width: 960,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-1.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.webp':
      {
        width: 3000,
        height: 4000,
        formats: {
          avif: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w360.avif',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w640.avif',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w960.avif',
              width: 960,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w360.webp',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w640.webp',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w960.webp',
              width: 960,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-2.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
    '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.webp':
      {
        width: 1600,
        height: 1200,
        formats: {
          avif: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w360.avif',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w640.avif',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w960.avif',
              width: 960,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w1280.avif',
              width: 1280,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w1600.avif',
              width: 1600,
            },
          ],
          webp: [
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w360.webp',
              width: 360,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w640.webp',
              width: 640,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w960.webp',
              width: 960,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w1280.webp',
              width: 1280,
            },
            {
              src: '/news/024-fmea-excellence-at-the-68th-international-fair-of-technics-and-technical-achievements/image-3.w1600.webp',
              width: 1600,
            },
          ],
        },
      },
  }
