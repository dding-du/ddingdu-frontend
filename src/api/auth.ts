import axiosInstance, { tokenManager } from "@/lib/axios";
import type { ApiResponse, TokenResponseDto } from "./types";

/**
 * 인증 API
 */
export const authAPI = {
  // 로그인
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post<TokenResponseDto>(
      "/api/auth/login",
      {
        email,
        password,
      }
    );
    return response.data;
  },

  // 회원가입
  signup: async (data: {
    mjuId: string;
    name: string;
    email: string;
    password: string;
    major: string;
    verificationCode: string;
  }) => {
    const response = await axiosInstance.post<TokenResponseDto>(
      "/api/auth/signup",
      data
    );
    return response.data;
  },

  // 이메일 인증번호 전송
  sendVerificationCode: async (email: string) => {
    const response = await axiosInstance.post<string>("/api/auth/email/send", {
      email,
    });
    return response.data;
  },

  // 이메일 인증번호 재전송 (1분 쿨다운)
  resendVerificationCode: async (email: string) => {
    const response = await axiosInstance.post<string>(
      "/api/auth/email/resend",
      { email }
    );
    return response.data;
  },

  // 인증번호 확인
  verifyCode: async (email: string, code: string) => {
    const response = await axiosInstance.post<string>(
      "/api/auth/email/verify",
      {
        email,
        code,
      }
    );
    return response.data;
  },

  // 비밀번호 재설정 요청 (인증 코드 전송)
  requestPasswordReset: async (email: string) => {
    const response = await axiosInstance.post<string>(
      "/api/auth/password/reset-request",
      {
        email,
      }
    );
    return response.data;
  },

  // 비밀번호 찾기
  resetPassword: async (email: string, newPassword: string) => {
    const response = await axiosInstance.post<ApiResponse>(
      "/auth/reset-password",
      {
        email,
        newPassword,
      }
    );
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await axiosInstance.post<string>("/api/auth/logout");
    return response.data;
  },

  // 리프래쉬
  refresh: async () => {
    const refreshToken = tokenManager.getRefreshToken();
    const response = await axiosInstance.post<TokenResponseDto>(
      `/api/auth/refresh`,
      { refreshToken }
    );
    return response.data;
  },
};
