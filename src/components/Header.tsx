"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  serviceName?: string;
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
  serviceName = "((서비스명))",
  className = "",
}: HeaderProps) {
  const router = useRouter();

  const onProfileClick = () => {
    router.push("/myPage");
  };

  const onArchiveClick = () => {
    router.push("/archive");
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0
        bg-white
        shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]
        flex items-center justify-between
        h-[60px] px-5
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
        <img src="/profile.svg" alt="Profile" className="w-24 h-24" />
      </button>

      {/* 중앙: 서비스명 */}
      <h1
        className="font-[var(--font-gmarket)] font-medium text-[18px] leading-[23px] text-center text-[#101010] shrink-0"
        style={{ fontFamily: "var(--font-gmarket), sans-serif" }}
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
        <img src="/subject.svg" alt="Profile" className="w-24 h-24" />
      </button>
    </header>
  );
}

export default Header;
