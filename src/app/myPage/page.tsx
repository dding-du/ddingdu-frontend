"use client";

import { authAPI, handleApiError, userAPI } from "@/api";
import type { UserInfoResponseDto } from "@/api/types";
import { PageHeader } from "@/components/common/PageHeader";
import { majors } from "@/constans/major";
import { tokenManager } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 조회
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userAPI.getMyInfo();
        setUserInfo(data);
      } catch (error) {
        const errorMessage = handleApiError(error);
        console.error("사용자 정보 조회 오류:", errorMessage);
        // 401 에러인 경우 로그인 페이지로 리다이렉트
        if (errorMessage.includes("401") || errorMessage.includes("인증")) {
          tokenManager.clearTokens();
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleClose = () => {
    router.back();
  };

  const handleEditPassword = () => {
    router.push("/delete-account?type=myPage");
    // TODO: 비밀번호 변경 페이지로 이동
  };

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await authAPI.logout();

      // 토큰 및 자동 로그인 정보 삭제
      tokenManager.clearTokens();

      // 로그인 페이지로 이동
      router.push("/login");
    } catch (error) {
      // 에러가 발생해도 로컬 토큰은 삭제하고 로그인 페이지로 이동
      const errorMessage = handleApiError(error);
      console.error("로그아웃 오류:", errorMessage);

      tokenManager.clearTokens();
      router.push("/login");
    }
  };

  const handleDeleteAccount = () => {
    router.push("/delete-account");
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="마이페이지" showClose onClose={handleClose} />
        <div className="flex items-center justify-center h-[calc(100vh-60px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#87a7e8]"></div>
        </div>
      </div>
    );
  }

  // 사용자 정보가 없을 때
  if (!userInfo) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="마이페이지" showClose onClose={handleClose} />
        <div className="flex items-center justify-center h-[calc(100vh-60px)]">
          <p className="body-l-regular text-[#74787e]">
            사용자 정보를 불러올 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

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
                {userInfo.mjuId}
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
                <span className="body-m-regular text-[#101010]">●●●●●●●●●</span>
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
                {majors.find((major) => major.value === userInfo.major)?.label}
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
