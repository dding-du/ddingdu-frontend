import type { TypographyStyle, TypographyVariant } from '@/types/typography';

/**
 * Typography styles matching Figma design system
 * All fonts use Pretendard family
 */
export const typographyStyles: Record<TypographyVariant, TypographyStyle> = {
  // Headline - Heavy (800)
  'headline-l': { fontSize: 32, fontWeight: 800, lineHeight: '125%' },
  'headline-m': { fontSize: 28, fontWeight: 800, lineHeight: '125%' },
  'headline-s': { fontSize: 24, fontWeight: 800, lineHeight: '125%' },

  // Title - SemiBold (600)
  'title-l-semibold': { fontSize: 24, fontWeight: 600, lineHeight: '125%' },
  'title-m-semibold': { fontSize: 20, fontWeight: 600, lineHeight: '125%' },
  'title-s-semibold': { fontSize: 18, fontWeight: 600, lineHeight: '125%' },

  // Title - Bold (700)
  'title-l-bold': { fontSize: 24, fontWeight: 700, lineHeight: '125%' },
  'title-m-bold': { fontSize: 20, fontWeight: 700, lineHeight: '125%' },
  'title-s-bold': { fontSize: 18, fontWeight: 700, lineHeight: '125%' },

  // Subtitle - Medium (500)
  'subtitle-l-medium': { fontSize: 20, fontWeight: 500, lineHeight: '130%' },
  'subtitle-m-medium': { fontSize: 18, fontWeight: 500, lineHeight: '130%' },

  // Subtitle - SemiBold (600)
  'subtitle-l-semibold': { fontSize: 20, fontWeight: 600, lineHeight: '130%' },
  'subtitle-m-semibold': { fontSize: 18, fontWeight: 600, lineHeight: '130%' },

  // Body - Regular (400)
  'body-xl-regular': { fontSize: 18, fontWeight: 400, lineHeight: '140%' },
  'body-l-regular': { fontSize: 16, fontWeight: 400, lineHeight: '140%' },
  'body-m-regular': { fontSize: 14, fontWeight: 400, lineHeight: '140%' },
  'body-s-regular': { fontSize: 12, fontWeight: 400, lineHeight: '140%' },

  // Body - Medium (500)
  'body-xl-medium': { fontSize: 18, fontWeight: 500, lineHeight: '140%' },
  'body-l-medium': { fontSize: 16, fontWeight: 500, lineHeight: '140%' },
  'body-m-medium': { fontSize: 14, fontWeight: 500, lineHeight: '140%' },
  'body-s-medium': { fontSize: 12, fontWeight: 500, lineHeight: '140%' },

  // Body - SemiBold (600)
  'body-xl-semibold': { fontSize: 18, fontWeight: 600, lineHeight: '140%' },
  'body-l-semibold': { fontSize: 16, fontWeight: 600, lineHeight: '140%' },
  'body-m-semibold': { fontSize: 14, fontWeight: 600, lineHeight: '140%' },
  'body-s-semibold': { fontSize: 12, fontWeight: 600, lineHeight: '140%' },

  // Caption - Regular (400)
  'caption-l-regular': { fontSize: 12, fontWeight: 400, lineHeight: '140%' },
  'caption-m-regular': { fontSize: 10, fontWeight: 400, lineHeight: '140%' },
};

/**
 * Helper function to get typography CSS class names for Tailwind
 */
export function getTypographyClass(variant: TypographyVariant): string {
  const style = typographyStyles[variant];
  return `text-[${style.fontSize}px] font-[${style.fontWeight}] leading-[${style.lineHeight}]`;
}

/**
 * Helper function to get typography inline styles
 */
export function getTypographyStyle(variant: TypographyVariant): React.CSSProperties {
  const style = typographyStyles[variant];
  return {
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
  };
}
