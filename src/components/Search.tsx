import React from 'react';

interface StarButtonProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * 별 버튼 컴포넌트
 * 즐겨찾기 토글용
 */
export function StarButton({ active = false, onClick, className = '' }: StarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 flex items-center justify-center shrink-0 ${className}`}
      aria-label={active ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      type="button"
    >
      {active ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#CAD777"
          />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#B3B7BD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

/**
 * 검색 입력창 컴포넌트
 */
export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = '검색어를 입력하세요',
  className = '',
}: SearchInputProps) {
  return (
    <div className={`bg-[#f0f2f5] px-4 py-3 rounded-lg flex items-center gap-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent body-l-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="w-[13.5px] h-[13.5px] flex items-center justify-center shrink-0"
          aria-label="검색어 지우기"
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="6" fill="#A3A7AD" />
            <path
              d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

interface SearchResultItemProps {
  text: string;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  onClick?: () => void;
  className?: string;
}

/**
 * 검색 결과 항목 컴포넌트
 */
export function SearchResultItem({
  text,
  favorite = false,
  onToggleFavorite,
  onClick,
  className = '',
}: SearchResultItemProps) {
  return (
    <div className={className}>
      <div
        className="bg-white flex items-center gap-2 px-7 py-4 cursor-pointer hover:bg-[#f0f2f5]"
        onClick={onClick}
      >
        <p className="flex-1 body-l-regular text-[#101010]">{text}</p>
        <StarButton active={favorite} onClick={onToggleFavorite} />
      </div>
      <div className="h-px bg-[#f0f2f5] mx-5" />
    </div>
  );
}

interface MyClassItemProps {
  name: string;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  onClick?: () => void;
  className?: string;
}

/**
 * 내 강의 항목 컴포넌트
 */
export function MyClassItem({
  name,
  favorite = false,
  onToggleFavorite,
  onClick,
  className = '',
}: MyClassItemProps) {
  return (
    <div
      className={`bg-white flex items-center gap-2 px-6 py-4 cursor-pointer hover:bg-[#f0f2f5] ${className}`}
      onClick={onClick}
    >
      <p className="flex-1 body-l-regular text-[#101010]">{name}</p>
      <StarButton active={favorite} onClick={onToggleFavorite} />
    </div>
  );
}

interface BottomSheetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * 하단 시트 컴포넌트
 */
export function BottomSheet({ title, children, className = '' }: BottomSheetProps) {
  return (
    <div
      className={`
        bg-white
        rounded-t-[24px]
        shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.06)]
        overflow-hidden
        ${className}
      `}
    >
      {/* 핸들 바 */}
      <div className="bg-white flex items-center justify-center px-2 py-2 h-6">
        <div className="w-10 h-1 bg-[#c7cacf] rounded" />
      </div>

      {/* 타이틀 */}
      <div className="bg-white flex items-center justify-center px-2 py-[10px]">
        <h2 className="text-[18px] font-bold leading-[25px] text-[#101010] text-center">
          {title}
        </h2>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-[#f0f2f5] mx-5" />

      {/* 내용 */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">{children}</div>
    </div>
  );
}
