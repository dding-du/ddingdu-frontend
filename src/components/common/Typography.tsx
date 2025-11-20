import type { TypographyVariant } from '@/types/typography';

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Typography component based on Figma design system
 * Uses Pretendard font family with predefined styles
 *
 * @example
 * ```tsx
 * <Typography variant="headline-l">Main Headline</Typography>
 * <Typography variant="body-m-regular">Body text</Typography>
 * <Typography variant="caption-l-regular" as="span">Caption</Typography>
 * ```
 */
export function Typography({
  variant,
  children,
  className = '',
  as: Component = 'p',
}: TypographyProps) {
  return (
    <Component className={`${variant} ${className}`}>
      {children}
    </Component>
  );
}

// Convenient component variants for common use cases
export function Headline({ children, size = 'l', className = '' }: {
  children: React.ReactNode;
  size?: 'l' | 'm' | 's';
  className?: string;
}) {
  return <Typography variant={`headline-${size}` as TypographyVariant} className={className} as="h1">{children}</Typography>;
}

export function Title({ children, size = 'm', weight = 'semibold', className = '' }: {
  children: React.ReactNode;
  size?: 'l' | 'm' | 's';
  weight?: 'semibold' | 'bold';
  className?: string;
}) {
  return <Typography variant={`title-${size}-${weight}` as TypographyVariant} className={className} as="h2">{children}</Typography>;
}

export function Subtitle({ children, size = 'm', weight = 'medium', className = '' }: {
  children: React.ReactNode;
  size?: 'l' | 'm';
  weight?: 'medium' | 'semibold';
  className?: string;
}) {
  return <Typography variant={`subtitle-${size}-${weight}` as TypographyVariant} className={className} as="h3">{children}</Typography>;
}

export function Body({ children, size = 'm', weight = 'regular', className = '' }: {
  children: React.ReactNode;
  size?: 'xl' | 'l' | 'm' | 's';
  weight?: 'regular' | 'medium' | 'semibold';
  className?: string;
}) {
  return <Typography variant={`body-${size}-${weight}` as TypographyVariant} className={className}>{children}</Typography>;
}

export function Caption({ children, size = 'l', className = '' }: {
  children: React.ReactNode;
  size?: 'l' | 'm';
  className?: string;
}) {
  return <Typography variant={`caption-${size}-regular` as TypographyVariant} className={className} as="span">{children}</Typography>;
}
