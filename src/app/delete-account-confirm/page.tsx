'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';

export default function DeleteAccountConfirmPage() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteAccount = () => {
    if (!isChecked) return;

    if (confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      console.log('회원 탈퇴 실행');
      // TODO: 회원 탈퇴 API 호출
      alert('회원 탈퇴가 완료되었습니다.');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <PageHeader title="회원 탈퇴" showBack />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col gap-6 mt-6">
        {/* 경고 박스 */}
        <div className="px-8">
          <div className="flex gap-[6px] items-start">
            {/* 경고 아이콘 */}
            <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0 mt-[2px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="7.5" fill="#F93838" />
                <path
                  d="M9 5V10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="13" r="0.75" fill="white" />
              </svg>
            </div>

            {/* 경고 텍스트 */}
            <div className="flex-1 flex flex-col gap-1">
              <h2 className="body-l-medium text-[#101010]">
                서비스 탈퇴 전 꼭 읽어주세요
              </h2>
              <p className="body-m-regular text-[#74787e]">
                회원 탈퇴는 영구적인 계정 삭제로 복구될 수 없습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 체크박스 */}
        <div className="px-8">
          <button
            onClick={handleCheckboxChange}
            className="flex items-center gap-[5px] w-full"
            type="button"
          >
            {/* 체크박스 아이콘 */}
            <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
              {isChecked ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="15"
                    height="15"
                    rx="3.5"
                    fill="#87A7E8"
                    stroke="#87A7E8"
                  />
                  <path
                    d="M5 9L8 12L13 6"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="15"
                    height="15"
                    rx="3.5"
                    fill="#C7CACF"
                  />
                  <path
                    d="M5 9L8 12L13 6"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* 체크박스 레이블 */}
            <span className="flex-1 body-m-regular text-[#101010] text-left">
              위 유의사항을 확인했습니다.
            </span>
          </button>
        </div>

        {/* 회원 탈퇴 버튼 */}
        <div className="px-8 py-2">
          <button
            onClick={handleDeleteAccount}
            disabled={!isChecked}
            className={`
              w-full
              ${isChecked ? 'bg-[#87a7e8]' : 'bg-[#c7cacf]'}
              text-white
              px-2 py-3
              rounded-lg
              body-m-medium
              text-center
              transition-colors
              ${isChecked ? 'hover:bg-[#7599d9] cursor-pointer' : 'cursor-not-allowed'}
            `}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
