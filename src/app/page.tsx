"use client";

import { authAPI, handleApiError } from "@/lib/api";
import { tokenManager } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@mju\.ac\.kr$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError && validateEmail(value)) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleEmailClear = () => {
    setEmail("");
    setEmailError("");
  };

  const handleLogin = async () => {
    let hasError = false;

    if (!email || !validateEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("비밀번호를 입력해 주세요.");
      hasError = true;
    }

    if (!hasError) {
      try {
        const tokenResponse = await authAPI.login(email, password);

        // tokenManager를 통해 토큰 저장
        tokenManager.setTokens(
          tokenResponse.accessToken,
          tokenResponse.refreshToken
        );

        // 자동 로그인 설정 저장
        tokenManager.setAutoLogin(autoLogin);

        // 홈으로 이동
        router.push("/home");
      } catch (error) {
        const errorMessage = handleApiError(error);
        setPasswordError(errorMessage);
      }
    }
  };

  const handleFindPassword = () => {
    router.push("/find-password");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-[120px]">
      <div className="max-w-[520px] w-full flex flex-col gap-12 items-center">
        {/* 타이틀 */}
        <h1
          className="text-[18px] font-medium leading-[23px] text-[#101010] text-center w-full"
          style={{ fontFamily: "var(--font-gmarket), sans-serif" }}
        >
          로그인
        </h1>

        <div className="w-full flex flex-col gap-6 items-center">
          {/* 봇 캐릭터 */}
          <div className="flex items-center justify-center gap-1">
            <img src="logo.svg" alt="logo" />
          </div>

          <div className="w-full flex flex-col gap-3">
            {/* 입력 필드들 */}
            <div className="w-full flex flex-col">
              {/* 이메일 입력 */}
              <div className="px-8 py-1 flex flex-col gap-[2px]">
                <div
                  className={`bg-white border ${
                    emailError ? "border-[#f93838]" : "border-[#c7cacf]"
                  } rounded-lg px-4 py-3 flex items-center gap-2 h-[44px]`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="이메일"
                    className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                  />
                  {email && (
                    <button
                      onClick={handleEmailClear}
                      className="w-[13.5px] h-[13.5px] flex items-center justify-center shrink-0"
                      aria-label="이메일 지우기"
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
                {emailError && (
                  <p className="text-[10px] leading-[14px] text-[#f93838] px-2">
                    *{emailError}
                  </p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div className="px-8 py-1 flex flex-col gap-[2px]">
                <div
                  className={`bg-white border ${
                    passwordError ? "border-[#f93838]" : "border-[#c7cacf]"
                  } rounded-lg px-4 py-3 flex items-center gap-2 h-[44px]`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호"
                    className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                  />
                  {password && (
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
                      aria-label={
                        showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                      }
                      type="button"
                    >
                      {showPassword ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.25 9C2.25 9 4.875 3.75 9 3.75C13.125 3.75 15.75 9 15.75 9C15.75 9 13.125 14.25 9 14.25C4.875 14.25 2.25 9 2.25 9Z"
                            stroke="#B3B7BD"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                            stroke="#B3B7BD"
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
                          <path
                            d="M2.25 9C2.25 9 4.875 3.75 9 3.75C13.125 3.75 15.75 9 15.75 9C15.75 9 13.125 14.25 9 14.25C4.875 14.25 2.25 9 2.25 9Z"
                            stroke="#B3B7BD"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 15L15 3"
                            stroke="#B3B7BD"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                {passwordError && (
                  <p className="text-[10px] leading-[14px] text-[#f93838] px-2">
                    *{passwordError}
                  </p>
                )}
              </div>
            </div>

            {/* 자동 로그인 체크박스 */}
            <div className="px-8">
              <button
                onClick={() => setAutoLogin(!autoLogin)}
                className="flex items-center gap-[5px]"
                type="button"
              >
                <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                  {autoLogin ? (
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
                        stroke="#B3B7BD"
                        strokeWidth="1.5"
                        fill="transparent"
                      />
                      <path
                        d="M5 9L8 12L13 6"
                        stroke="#B3B7BD"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="body-m-regular text-[#101010]">
                  자동 로그인
                </span>
              </button>
            </div>

            {/* 버튼들 */}
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col items-center">
                {/* 로그인 버튼 */}
                <div className="px-8 py-2 w-full">
                  <button
                    onClick={handleLogin}
                    disabled={!isLoginEnabled}
                    className={`w-full ${
                      isLoginEnabled ? "bg-[#2f4f97]" : "bg-[#c7cacf]"
                    } text-white px-2 py-3 rounded-lg body-m-medium text-center transition-colors ${
                      isLoginEnabled
                        ? "hover:bg-[#264080] cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                  >
                    로그인
                  </button>
                </div>

                {/* 비밀번호 찾기 */}
                <button
                  onClick={handleFindPassword}
                  className="body-m-regular text-[#74787e] underline text-center"
                >
                  비밀번호 찾기
                </button>
              </div>

              {/* 회원가입 버튼 */}
              <div className="px-8 py-2 w-full">
                <button
                  onClick={handleSignup}
                  className="w-full bg-white border border-[#c7cacf] text-[#74787e] px-2 py-3 rounded-lg body-m-medium text-center hover:bg-[#f0f2f5] transition-colors"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
