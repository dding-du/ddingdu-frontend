import React from "react";

interface StarButtonProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * 별 버튼 컴포넌트
 * 즐겨찾기 토글용
 */
export function StarButton({
  active = false,
  onClick,
  className = "",
}: StarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 flex items-center justify-center shrink-0 ${className}`}
      aria-label={active ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      type="button"
    >
      {active ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#CAD777"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
  placeholder = "검색어를 입력하세요",
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`bg-[#f0f2f5] px-4 py-3 rounded-lg flex items-center gap-2 ${className}`}
    >
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
  professor?: string;
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
  professor,
  favorite = false,
  onToggleFavorite,
  onClick,
  className = "",
}: SearchResultItemProps) {
  return (
    <div
      className={`bg-white flex items-start gap-2 px-8 py-3 cursor-pointer hover:bg-[#f0f2f5] ${className}`}
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col gap-1">
        <p className="body-l-regular text-[#101010]">{text}</p>
        {professor && (
          <p className="body-s-regular text-[#74787e]">{professor}</p>
        )}
      </div>
      <StarButton active={favorite} onClick={onToggleFavorite} />
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
  className = "",
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
  isExpanded?: boolean;
  onToggle?: () => void;
}

/**
 * 드래그 가능한 하단 시트 컴포넌트
 * 핸들 바를 드래그하거나 클릭하여 확장/축소 가능
 */
export function BottomSheet({
  title,
  children,
  className = "",
  isExpanded = true,
  onToggle,
}: BottomSheetProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [currentY, setCurrentY] = React.useState(0);

  // 드래그 시작
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setCurrentY(clientY);
  };

  // 드래그 중
  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;
    setCurrentY(clientY);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;

    // 50px 이상 드래그하면 토글
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && isExpanded) {
        // 아래로 드래그 → 축소
        onToggle?.();
      } else if (deltaY < 0 && !isExpanded) {
        // 위로 드래그 → 확장
        onToggle?.();
      }
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // 드래그 중일 때의 실시간 높이 계산
  const getDragOffset = () => {
    if (!isDragging) return 0;
    return currentY - startY;
  };

  const dragOffset = getDragOffset();

  return (
    <div
      className={`
        bg-white
        rounded-t-[24px]
        shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.06)]
        overflow-hidden
        ${!isDragging ? "transition-all duration-300 ease-in-out" : ""}
        ${className}
      `}
      style={{
        maxHeight: isExpanded ? "70vh" : "68px",
        transform: isDragging
          ? `translateY(${Math.max(0, dragOffset)}px)`
          : "translateY(0)",
      }}
    >
      {/* 핸들 바 - 드래그 가능 영역 */}
      <div
        className="bg-white flex items-center justify-center px-2 py-2 h-6 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={isDragging ? handleMouseMove : undefined}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={onToggle}
      >
        <div
          className={`w-10 h-1 bg-[#c7cacf] rounded transition-transform duration-200 ${
            isExpanded ? "" : "rotate-180"
          }`}
        />
      </div>

      {/* 타이틀 */}
      <div
        className="bg-white flex items-center justify-center px-2 py-[10px] cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-[18px] font-bold leading-[25px] text-[#101010] text-center">
          {title}
        </h2>
      </div>

      {/* 구분선 */}
      <div
        className={`h-px bg-[#f0f2f5] mx-5 transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 내용 */}
      <div
        className={`overflow-y-auto transition-all duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          maxHeight: isExpanded ? "calc(70vh - 68px)" : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
}
