import React from 'react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showClose?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

/**
 * 페이지 공통 헤더 컴포넌트
 * 뒤로가기 또는 닫기 버튼 + 타이틀
 */
export function PageHeader({
  title,
  showBack = false,
  showClose = false,
  onBack,
  onClose,
  className = '',
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <header className={`bg-white flex items-center gap-2 px-5 pt-6 pb-4 ${className}`}>
      {/* 뒤로가기 버튼 */}
      {showBack && (
        <button
          onClick={handleBack}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="뒤로가기"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#44474C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* 타이틀 */}
      <h1
        className="flex-1 text-[18px] font-medium leading-[23px] text-[#101010]"
        style={{ fontFamily: 'var(--font-gmarket), sans-serif' }}
      >
        {title}
      </h1>

      {/* 닫기 버튼 */}
      {showClose && (
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="닫기"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="#44474C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </header>
  );
}

export default PageHeader;
