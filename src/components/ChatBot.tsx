import React from 'react';

/**
 * 챗봇 캐릭터 컴포넌트
 * 54x76px 크기의 귀여운 봇 캐릭터
 */
export function BotCharacter({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-[76px] h-[54px] ${className}`}>
      {/* 배경 - 파란색 둥근 사각형 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[76px] h-[54px] bg-[#87a7e8] rounded-[12px]" />
      </div>

      {/* 얼굴 - 흰색 둥근 사각형 */}
      <div
        className="absolute bg-white rounded-[12px]"
        style={{
          top: '9px',
          left: '12px',
          width: '52px',
          height: '27px',
        }}
      />

      {/* 눈 - 두 개의 작은 점 */}
      <div className="absolute flex gap-[6px]" style={{ top: '18px', left: '24px' }}>
        <div className="w-[3px] h-[3px] bg-[#44474c] rounded-full" />
        <div className="w-[3px] h-[3px] bg-[#44474c] rounded-full" />
      </div>

      {/* 입 - 작은 곡선 */}
      <div className="absolute" style={{ top: '26px', left: '29px' }}>
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
          <path
            d="M1 1C1 1 4 7 9 7C14 7 17 1 17 1"
            stroke="#44474c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

interface BotMessageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 봇 메시지 버블 컴포넌트
 * 왼쪽 정렬, 회색 배경
 */
export function BotMessage({ children, className = '' }: BotMessageProps) {
  return (
    <div className={`flex flex-col gap-2 items-start px-5 py-2 ${className}`}>
      <BotCharacter />
      <div className="bg-[#f0f2f5] max-w-[280px] min-w-[40px] px-4 py-3 rounded-[20px]">
        <div className="body-l-regular text-[#101010]">{children}</div>
      </div>
    </div>
  );
}

interface UserMessageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 사용자 메시지 버블 컴포넌트
 * 오른쪽 정렬, 파란색 배경
 */
export function UserMessage({ children, className = '' }: UserMessageProps) {
  return (
    <div className={`flex flex-col items-end justify-center px-5 py-2 ${className}`}>
      <div className="bg-[#87a7e8] max-w-[280px] min-w-[40px] px-4 py-3 rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px]">
        <p className="body-l-regular text-white text-right">{children}</p>
      </div>
    </div>
  );
}

interface RecommendChipProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

/**
 * 추천 질문 칩 컴포넌트
 * 클릭 가능한 작은 버튼
 */
export function RecommendChip({ text, onClick, className = '' }: RecommendChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-white border border-[#dcdfe3]
        px-[14px] py-[10px] h-8
        rounded-full
        caption-l-regular text-[#74787e]
        whitespace-nowrap
        hover:bg-[#f0f2f5] transition-colors
        ${className}
      `}
      type="button"
    >
      {text}
    </button>
  );
}

interface ChatInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  placeholder?: string;
  className?: string;
}

/**
 * 채팅 입력 컴포넌트
 * 입력창 + 전송 버튼
 */
export function ChatInput({
  value = '',
  onChange,
  onSend,
  placeholder = '강의정보 무엇이든 물어보세요',
  className = '',
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <div
      className={`
        bg-[#f0f2f5] border border-[#dcdfe3]
        flex items-center gap-2
        pl-4 pr-1 py-[10px] h-10
        rounded-full
        ${className}
      `}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="
          flex-1 bg-transparent
          body-l-regular text-[#101010]
          placeholder:text-[#b3b7bd]
          outline-none
        "
      />
      <button
        onClick={onSend}
        className="w-[42.667px] h-[42.667px] flex items-center justify-center shrink-0"
        aria-label="전송"
        type="button"
      >
        <SendIcon />
      </button>
    </div>
  );
}

/**
 * 전송 아이콘 컴포넌트
 */
function SendIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[26.667px] h-[26.667px]"
    >
      <path
        d="M24 3L12 15M24 3L16 24L12 15M24 3L3 11L12 15"
        stroke="#44474c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
