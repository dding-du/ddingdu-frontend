"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";

export default function DeleteAccountPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(""); // 입력 시 에러 메시지 제거
  };

  const handleSubmit = () => {
    if (!password) {
      setError("비밀번호를 입력해 주세요");
      return;
    }

    // TODO: 비밀번호 확인 API 호출
    console.log("비밀번호 확인:", password);

    // 비밀번호 확인 성공 시 최종 확인 페이지로 이동
    router.push("/delete-account-confirm");
  };

  const handleFindPassword = () => {
    console.log("비밀번호 찾기");
    // TODO: 비밀번호 찾기 페이지로 이동
  };

  const isValid = password.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <PageHeader title="비밀번호 확인" showBack />

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col gap-4 mt-6">
        {/* 안내 문구 */}
        <div className="px-8">
          <p className="body-l-regular text-[#101010]">
            보안을 위해 비밀번호를 입력해 주세요
          </p>
        </div>

        {/* 입력 섹션 */}
        <div className="flex flex-col gap-1">
          {/* 비밀번호 입력 */}
          <div className="px-8 py-1">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해 주세요"
              className={`
                w-full
                bg-white
                border ${error ? "border-[#f93838]" : "border-[#c7cacf]"}
                rounded-lg
                px-4 py-3
                body-m-regular
                text-[#101010]
                placeholder:text-[#b3b7bd]
                outline-none
                focus:border-[#87a7e8]
                transition-colors
              `}
            />
            {/* 에러 메시지 */}
            {error && (
              <p className="text-[10px] leading-[14px] text-[#f93838] mt-1 px-2">
                *{error}
              </p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-col gap-1 items-center">
            {/* 다음 버튼 */}
            <div className="px-8 py-2 w-full">
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`
                  w-full
                  ${isValid ? "bg-[#87a7e8]" : "bg-[#c7cacf]"}
                  text-white
                  px-2 py-3
                  rounded-lg
                  body-m-medium
                  text-center
                  transition-colors
                  ${isValid ? "hover:bg-[#7599d9]" : "cursor-not-allowed"}
                `}
              >
                다음
              </button>
            </div>

            {/* 비밀번호 찾기 링크 */}
            <button
              onClick={handleFindPassword}
              className="body-m-regular text-[#b3b7bd] underline text-center"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
