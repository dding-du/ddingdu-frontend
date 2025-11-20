"use client";

import { authAPI, handleApiError } from "@/api";
import { PageHeader } from "@/components/common/PageHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FindPasswordPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Validation states
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasEnglish, setHasEnglish] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  // Timer and verification sent state
  const [timeLeft, setTimeLeft] = useState(299); // 4:59
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isVerificationSent && timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVerificationSent, timeLeft, isVerified]);

  const validateEmail = (email: string) => {
    const isValid = /@mju\.ac\.kr$/.test(email);
    setIsEmailValid(isValid);
  };

  const validatePassword = (pwd: string) => {
    setHasEnglish(/[a-zA-Z]/.test(pwd));
    setHasNumber(/\d/.test(pwd));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pwd));
    setIsPasswordLengthValid(pwd.length >= 8 && pwd.length <= 20);
  };

  const validatePasswordMatch = (pwd: string, confirm: string) => {
    setIsPasswordMatch(pwd === confirm && pwd.length > 0);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    validatePasswordMatch(value, passwordConfirm);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    validatePasswordMatch(password, value);
  };

  const handleSendCode = async () => {
    try {
      // 비밀번호 재설정 요청 API 사용 (재전송 기능 없음, 매번 새로 요청)
      const message = await authAPI.requestPasswordReset(email);

      setIsVerificationSent(true);
      setTimeLeft(299);
      alert(message);
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    }
  };

  const handleVerify = async () => {
    try {
      const message = await authAPI.verifyCode(email, verificationCode);
      setIsVerified(true);
      alert(message);
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    }
  };

  const handleSubmit = async () => {
    try {
      const message = await authAPI.resetPassword(email, password);
      alert(message || "비밀번호가 재설정되었습니다.");
      router.push("/login");
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    }
  };

  const isFormValid =
    isEmailValid &&
    isVerified &&
    hasEnglish &&
    hasNumber &&
    hasSpecialChar &&
    isPasswordLengthValid &&
    isPasswordMatch;

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <PageHeader title="비밀번호 찾기" showBack />

      {/* 메인 컨텐츠 */}
      <div className="max-w-[520px] mx-auto w-full">
        <div className="flex flex-col gap-6 mt-6">
          {/* 이메일 입력 */}
          <div className="flex flex-col gap-1">
            <div className="px-8 py-1">
              <div className="flex gap-1">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="이메일"
                  className="flex-1 bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                />
                <button
                  onClick={handleSendCode}
                  disabled={!isEmailValid}
                  className={`w-[80px] ${
                    !isEmailValid
                      ? "bg-[#b3b7bd] !cursor-default"
                      : "bg-[#2f4f97]  hover:bg-[#264080]"
                  } text-white rounded-lg body-m-medium transition-colors`}
                >
                  {isVerificationSent ? "재전송" : "인증번호"}
                </button>
              </div>
            </div>
            <div className="px-8 flex items-center gap-1">
              <span
                className={`caption-m-regular ${
                  isEmailValid ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                }`}
              >
                명지대학교 이메일 형식
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7L6 10L11 4"
                  stroke={isEmailValid ? "#3e6fd0" : "#b3b7bd"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 인증번호 입력 */}
          <div className="flex flex-col gap-1">
            <div className="px-8 py-1">
              <div className="flex gap-1">
                <div className="flex-1 bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="인증번호"
                    maxLength={6}
                    className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                  />
                  {!isVerified && isVerificationSent && (
                    <span className="caption-m-regular text-[#f93838]">
                      {Math.floor(timeLeft / 60)}:
                      {String(timeLeft % 60).padStart(2, "0")}
                    </span>
                  )}
                  {verificationCode && !isVerified && (
                    <button
                      onClick={() => setVerificationCode("")}
                      className="w-[13.5px] h-[13.5px] flex items-center justify-center shrink-0"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
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
                <button
                  onClick={handleVerify}
                  disabled={verificationCode === ""}
                  className={`w-[80px] ${
                    verificationCode === ""
                      ? "bg-[#b3b7bd] !cursor-default"
                      : "bg-[#2f4f97]  hover:bg-[#264080]"
                  } text-white rounded-lg body-m-medium  transition-colors`}
                >
                  확인
                </button>
              </div>
            </div>
            <div className="px-8 flex items-center gap-1">
              <span
                className={`caption-m-regular ${
                  isVerified ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                }`}
              >
                인증 완료
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7L6 10L11 4"
                  stroke={isVerified ? "#3e6fd0" : "#b3b7bd"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {isVerified && (
            <div className="flex flex-col gap-6">
              {/* 새 비밀번호 입력 */}
              <div className="px-8 flex flex-col gap-1">
                <div className="bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="새 비밀번호"
                    className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
                  >
                    {showPassword ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
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
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span
                      className={`caption-m-regular ${
                        hasEnglish ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                      }`}
                    >
                      영문 포함
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7L6 10L11 4"
                        stroke={hasEnglish ? "#3e6fd0" : "#b3b7bd"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`caption-m-regular ${
                        hasNumber ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                      }`}
                    >
                      숫자 포함
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7L6 10L11 4"
                        stroke={hasNumber ? "#3e6fd0" : "#b3b7bd"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`caption-m-regular ${
                        hasSpecialChar ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                      }`}
                    >
                      특수문자 포함
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7L6 10L11 4"
                        stroke={hasSpecialChar ? "#3e6fd0" : "#b3b7bd"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`caption-m-regular ${
                        isPasswordLengthValid
                          ? "text-[#3e6fd0]"
                          : "text-[#b3b7bd]"
                      }`}
                    >
                      8~20자 이내
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7L6 10L11 4"
                        stroke={isPasswordLengthValid ? "#3e6fd0" : "#b3b7bd"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 비밀번호 확인 입력 */}
              <div className="px-8 flex flex-col gap-1">
                <div className="bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center gap-2">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    placeholder="새 비밀번호 확인"
                    className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                  />
                  <button
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
                  >
                    {showPasswordConfirm ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
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
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`caption-m-regular ${
                      isPasswordMatch ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                    }`}
                  >
                    비밀번호 일치
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L6 10L11 4"
                      stroke={isPasswordMatch ? "#3e6fd0" : "#b3b7bd"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* 제출 버튼 */}
          <div className="px-8 py-2">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full ${
                isFormValid ? "bg-[#2f4f97]" : "bg-[#c7cacf]"
              } text-white px-2 py-3 rounded-lg body-m-medium text-center transition-colors ${
                isFormValid
                  ? "hover:bg-[#264080] cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
