"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleEditPassword = () => {
    console.log("비밀번호 수정");
    // TODO: 비밀번호 변경 페이지로 이동
  };

  const handleLogout = () => {
    console.log("로그아웃");
    router.push("/");
    // TODO: 로그아웃 API 호출
  };

  const handleDeleteAccount = () => {
    router.push("/delete-account");
  };

  // 사용자 정보 (실제로는 API에서 가져와야 함)
  const userInfo = {
    studentId: "60261121",
    name: "홍길동",
    email: "ddingdu@mju.ac.kr",
    password: "●●●●●●●●●",
    major: "데이터사이언스전공",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <PageHeader title="마이페이지" showClose onClose={handleClose} />

      {/* 메인 컨텐츠 */}
      <div className="max-w-[520px] mx-auto w-full">
        <div className="flex flex-col gap-12 mt-6">
          {/* 사용자 정보 섹션 */}
          <div className="flex flex-col">
            {/* 학번 */}
            <div className="flex items-center justify-between px-8 py-4">
              <span className="flex-1 body-l-regular text-[#101010]">학번</span>
              <span className="body-m-regular text-[#74787e]">
                {userInfo.studentId}
              </span>
            </div>

            {/* 이름(닉네임) */}
            <div className="flex items-center justify-between px-8 py-4">
              <span className="flex-1 body-l-regular text-[#101010]">
                이름(닉네임)
              </span>
              <span className="body-m-regular text-[#74787e]">
                {userInfo.name}
              </span>
            </div>

            {/* 이메일 */}
            <div className="flex items-center justify-between px-8 py-4">
              <span className="flex-1 body-l-regular text-[#101010]">
                이메일
              </span>
              <span className="body-m-regular text-[#74787e]">
                {userInfo.email}
              </span>
            </div>

            {/* 비밀번호 */}
            <button
              onClick={handleEditPassword}
              className="flex items-center justify-between px-8 py-4 hover:bg-[#f0f2f5] transition-colors"
            >
              <span className="flex flex-start body-l-regular text-[#101010]">
                비밀번호
              </span>
              <div className="flex items-center gap-4">
                <span className="body-m-regular text-[#101010]">
                  {userInfo.password}
                </span>
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
                    stroke="#44474C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* 전공 */}
            <div className="flex items-center justify-between px-8 py-4">
              <span className="flex-1 body-l-regular text-[#101010]">전공</span>
              <span className="body-m-regular text-[#74787e]">
                {userInfo.major}
              </span>
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className="flex gap-2 px-8 py-2">
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="flex-1 border-[#C7CACF] border-[1px] text-[#74787E] px-2 py-3 rounded-lg body-m-medium text-center hover:bg-[#C7CACF] transition-colors"
            >
              로그아웃
            </button>

            {/* 회원 탈퇴 버튼 */}
            <button
              onClick={handleDeleteAccount}
              className="flex-1 border-[#C7CACF] border-[1px] text-[#74787E] px-2 py-3 rounded-lg body-m-medium text-center hover:bg-[#C7CACF] transition-colors"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
