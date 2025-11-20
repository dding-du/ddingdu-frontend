"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const majors = [
  "응용소프트웨어전공",
  "데이터사이언스전공",
  "인공지능전공",
  "디지털콘텐츠디자인학과",
];

export default function SignupPage() {
  const router = useRouter();

  // Form states
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [major, setMajor] = useState("");

  // Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);

  // Validation states
  const [isStudentIdValid, setIsStudentIdValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasEnglish, setHasEnglish] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  // Timer and verification sent state
  const [timeLeft, setTimeLeft] = useState(299); // 4:59
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const validateStudentId = (id: string) => {
    const isValid = /^\d{8}$/.test(id);
    setIsStudentIdValid(isValid);
  };

  const validateName = (name: string) => {
    const isValid = name.length > 0 && name.length <= 20;
    setIsNameValid(isValid);
  };

  const validateEmail = (email: string) => {
    const isValid = /@mju\.ac\.kr$/.test(email);
    setIsEmailValid(isValid);
    // TODO: Check email availability
    setIsEmailAvailable(isValid);
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

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudentId(value);
    validateStudentId(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
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

  const handleEmailClear = () => {
    setEmail("");
    setIsEmailValid(false);
    setIsEmailAvailable(false);
  };

  const handleVerificationCodeClear = () => {
    setVerificationCode("");
  };

  const handleResendCode = () => {
    console.log("인증번호 전송/재전송");
    setIsVerificationSent(true);
    setTimeLeft(299);
    // TODO: 인증번호 전송 API 호출
  };

  const handleVerify = () => {
    console.log("인증 확인");
    // TODO: 인증 확인 API 호출
    setIsVerified(true);
  };

  const handleSignup = () => {
    console.log("회원가입", {
      studentId,
      name,
      email,
      password,
      major,
    });
    // TODO: 회원가입 API 호출
    alert("회원가입이 완료되었습니다.");
    router.push("/");
  };

  const isFormValid =
    isStudentIdValid &&
    isNameValid &&
    isEmailValid &&
    isEmailAvailable &&
    isVerified &&
    hasEnglish &&
    hasNumber &&
    hasSpecialChar &&
    isPasswordLengthValid &&
    isPasswordMatch;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-24">
      <div className="max-w-[520px] w-full flex flex-col gap-12 items-center">
        {/* 타이틀 */}
        <h1
          className="text-[18px] font-medium leading-[23px] text-[#101010] text-center w-full"
          style={{ fontFamily: "var(--font-gmarket), sans-serif" }}
        >
          회원가입
        </h1>

        <div className="w-full flex flex-col gap-6 items-center">
          {/* 봇 캐릭터 */}
          <div className="flex items-center justify-center gap-1">
            <img src="/logo.svg" alt="logo" />
          </div>

          <div className="w-full flex flex-col gap-6">
            {/* 학번 */}
            <div className="px-8 flex flex-col gap-1">
              <input
                type="text"
                value={studentId}
                onChange={handleStudentIdChange}
                placeholder="학번"
                maxLength={8}
                className="bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
              />
              <div className="flex items-center gap-1 px-2">
                <span
                  className={`caption-m-regular ${
                    isStudentIdValid ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                  }`}
                >
                  숫자 8자리
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7L6 10L11 4"
                    stroke={isStudentIdValid ? "#3e6fd0" : "#b3b7bd"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* 이름 */}
            <div className="px-8 flex flex-col gap-1">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="이름"
                maxLength={20}
                className="bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
              />
              <div className="flex items-center gap-1 px-2">
                <span
                  className={`caption-m-regular ${
                    isNameValid ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                  }`}
                >
                  한/영문 20자리 이하
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7L6 10L11 4"
                    stroke={isNameValid ? "#3e6fd0" : "#b3b7bd"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* 이메일 */}
            <div className="px-8 flex flex-col gap-1">
              <div className="flex gap-1">
                <div className="flex-1 bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center gap-2">
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
                  onClick={handleResendCode}
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
              <div className="flex items-center gap-3 px-2">
                <div className="flex items-center gap-1">
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
                <div className="flex items-center gap-1">
                  <span
                    className={`caption-m-regular ${
                      isEmailAvailable ? "text-[#3e6fd0]" : "text-[#b3b7bd]"
                    }`}
                  >
                    사용 가능 이메일
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L6 10L11 4"
                      stroke={isEmailAvailable ? "#3e6fd0" : "#b3b7bd"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 인증번호 */}
            <div className="px-8 flex flex-col gap-1">
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
                  {!isVerified && (
                    <span className="caption-m-regular text-[#f93838]">
                      {Math.floor(timeLeft / 60)}:
                      {String(timeLeft % 60).padStart(2, "0")}
                    </span>
                  )}
                  {verificationCode && !isVerified && (
                    <button
                      onClick={handleVerificationCodeClear}
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
                  className="w-[80px] bg-[#2f4f97] text-white rounded-lg body-m-medium hover:bg-[#264080] transition-colors"
                >
                  확인
                </button>
              </div>
              <div className="flex items-center gap-1 px-2">
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

            {/* 비밀번호 */}
            <div className="px-8 flex flex-col gap-1">
              <div className="bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호"
                  className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
              <div className="flex items-center gap-3 px-2 flex-wrap">
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

            {/* 비밀번호 확인 */}
            <div className="px-8 flex flex-col gap-1">
              <div className="bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center gap-2">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  placeholder="비밀번호 확인"
                  className="flex-1 bg-transparent body-m-regular text-[#101010] placeholder:text-[#b3b7bd] outline-none"
                />
                <button
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
                >
                  {showPasswordConfirm ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
              <div className="flex items-center gap-1 px-2">
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

            {/* 전공 선택 */}
            <div className="px-8 relative">
              <button
                onClick={() => setShowMajorDropdown(!showMajorDropdown)}
                className="w-full bg-white border border-[#c7cacf] rounded-lg px-4 py-3 h-[44px] flex items-center justify-between body-m-regular text-[#101010]"
              >
                {major === "" ? (
                  <span className="text-[#c7cacf]">전공</span>
                ) : (
                  <span>{major}</span>
                )}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={`transform transition-transform ${
                    showMajorDropdown ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M3 5L7 9L11 5"
                    stroke={major === "" ? "#c7cacf" : "#44474C"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {showMajorDropdown && (
                <div className="absolute top-full left-8 right-8 mt-1 bg-white border border-[#c7cacf] rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                  {majors.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMajor(m);
                        setShowMajorDropdown(false);
                      }}
                      className="w-full px-4 py-3 body-m-regular text-[#101010] text-left hover:bg-[#f0f2f5] transition-colors"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <div className="px-8 py-2">
              <button
                onClick={handleSignup}
                disabled={!isFormValid}
                className={`w-full ${
                  isFormValid ? "bg-[#2f4f97]" : "bg-[#c7cacf]"
                } text-white px-2 py-3 rounded-lg body-m-medium text-center transition-colors ${
                  isFormValid
                    ? "hover:bg-[#264080] cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
