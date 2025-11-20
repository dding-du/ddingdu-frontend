"use client";

import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleEditId = () => {
    console.log("아이디 수정");
  };

  const handleEditPassword = () => {
    console.log("비밀번호 수정");
  };

  const handleLogout = () => {
    console.log("로그아웃");
    // 로그아웃 로직 구현
  };

  const handleDeleteAccount = () => {
    // 비밀번호 확인 페이지로 이동
    router.push("/delete-account");
  };

  // 아이콘
  const IconArrowDown = () => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-[-90deg]"
      >
        <path
          d="M4.5 6.75L9 11.25L13.5 6.75"
          stroke="#A3A7AD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-white flex items-center gap-2 px-5 pt-6 pb-4">
        <h1
          className="flex-1 text-[18px] font-medium leading-[23px] text-[#101010]"
          style={{ fontFamily: "var(--font-gmarket), sans-serif" }}
        >
          마이페이지
        </h1>
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
      </header>

      {/* 메인 컨텐츠 */}
      <div className="max-w-[520px] mx-auto w-full">
        <div className="flex flex-col gap-6 mt-6">
          {/* 사용자 정보 섹션 */}
          <div className="flex flex-col">
            {/* 아이디 */}
            <button
              onClick={handleEditId}
              className="flex items-center justify-between px-8 py-4 hover:bg-[#f0f2f5] transition-colors"
            >
              <span className="flex-1 flex flex-start body-l-regular text-[#101010]">
                이베일
              </span>
              <div className="flex items-center gap-4">
                <span className="body-m-regular text-[#74787e]">admin</span>
                {/* <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-[-90deg]"
                >
                  <path
                    d="M4.5 6.75L9 11.25L13.5 6.75"
                    stroke="#A3A7AD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                <div className="w-[18px]" />
              </div>
            </button>

            {/* 비밀번호 */}
            <button
              onClick={handleEditPassword}
              className="flex items-center justify-between px-8 py-4 hover:bg-[#f0f2f5] transition-colors"
            >
              <span className="flex flex-start body-l-regular text-[#101010]">
                비밀번호
              </span>
              <div className="flex items-center gap-4">
                <span className="body-m-regular text-[#74787e]">●●●●●●●●●</span>
                <IconArrowDown />
              </div>
            </button>
          </div>

          {/* 버튼 섹션 */}
          <div className="flex gap-2 px-8 py-2">
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="flex-1 bg-[#87a7e8] text-white px-2 py-3 rounded-lg body-m-medium text-center hover:bg-[#7599d9] transition-colors"
            >
              로그아웃
            </button>

            {/* 회원 탈퇴 버튼 */}
            <button
              onClick={handleDeleteAccount}
              className="flex-1 bg-[#c7cacf] text-white px-2 py-3 rounded-lg body-m-medium text-center hover:bg-[#b3b7bd] transition-colors"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
