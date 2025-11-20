import React from 'react';

interface HeaderProps {
  serviceName?: string;
  onProfileClick?: () => void;
  onArchiveClick?: () => void;
  className?: string;
}

/**
 * 공용 헤더 컴포넌트 (GNB)
 * Figma 디자인 기반: node-id=463:287
 *
 * @example
 * ```tsx
 * <Header serviceName="MyPlace" />
 * <Header serviceName="서비스명" onProfileClick={() => {}} onArchiveClick={() => {}} />
 * ```
 */
export function Header({
  serviceName = '((서비스명))',
  onProfileClick,
  onArchiveClick,
  className = '',
}: HeaderProps) {
  return (
    <header
      className={`
        bg-white
        shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]
        flex items-center justify-between
        px-5 pt-6 pb-3
        w-full
        ${className}
      `}
      data-component="header"
    >
      {/* 왼쪽: 프로필 아이콘 */}
      <button
        onClick={onProfileClick}
        className="flex items-center justify-center w-6 h-6 shrink-0"
        aria-label="프로필"
        type="button"
      >
        <ProfileIcon />
      </button>

      {/* 중앙: 서비스명 */}
      <h1
        className="font-[var(--font-gmarket)] font-medium text-[18px] leading-[23px] text-center text-[#101010] shrink-0"
        style={{ fontFamily: 'var(--font-gmarket), sans-serif' }}
      >
        {serviceName}
      </h1>

      {/* 오른쪽: 보관함 아이콘 */}
      <button
        onClick={onArchiveClick}
        className="flex items-center justify-center w-6 h-6 shrink-0"
        aria-label="보관함"
        type="button"
      >
        <ArchiveIcon />
      </button>
    </header>
  );
}

/**
 * 프로필 아이콘 컴포넌트
 * 24x24px SVG 아이콘
 */
function ProfileIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      {/* 프로필 아이콘 - 원형 헤드 + 어깨 */}
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="#44474C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 20C5 16.6863 7.68629 14 11 14H13C16.3137 14 19 16.6863 19 20"
        stroke="#44474C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 보관함 아이콘 컴포넌트
 * 24x24px SVG 아이콘
 */
function ArchiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      {/* 보관함 아이콘 - 상자 모양 */}
      <rect
        x="4"
        y="5"
        width="16"
        height="15"
        rx="2"
        stroke="#44474C"
        strokeWidth="1.5"
      />
      <rect
        x="7"
        y="10"
        width="10"
        height="2"
        rx="1"
        stroke="#44474C"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default Header;
