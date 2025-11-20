/**
 * Typography system based on Figma design
 * Font Family: Pretendard
 */

export type FontWeight = 400 | 500 | 600 | 700 | 800;

export type FontSize = 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32;

export type LineHeight = '125%' | '130%' | '140%';

export interface TypographyStyle {
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
}

// Headline styles
export type HeadlineVariant = 'headline-l' | 'headline-m' | 'headline-s';

// Title styles
export type TitleVariant =
  | 'title-l-semibold'
  | 'title-m-semibold'
  | 'title-s-semibold'
  | 'title-l-bold'
  | 'title-m-bold'
  | 'title-s-bold';

// Subtitle styles
export type SubtitleVariant =
  | 'subtitle-l-medium'
  | 'subtitle-m-medium'
  | 'subtitle-l-semibold'
  | 'subtitle-m-semibold';

// Body styles
export type BodyVariant =
  | 'body-xl-regular'
  | 'body-l-regular'
  | 'body-m-regular'
  | 'body-s-regular'
  | 'body-xl-medium'
  | 'body-l-medium'
  | 'body-m-medium'
  | 'body-s-medium'
  | 'body-xl-semibold'
  | 'body-l-semibold'
  | 'body-m-semibold'
  | 'body-s-semibold';

// Caption styles
export type CaptionVariant = 'caption-l-regular' | 'caption-m-regular';

export type TypographyVariant =
  | HeadlineVariant
  | TitleVariant
  | SubtitleVariant
  | BodyVariant
  | CaptionVariant;
