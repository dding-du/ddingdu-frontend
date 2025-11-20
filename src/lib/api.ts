import axiosInstance from "./axios";

/**
 * API 응답 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * 인증 API
 */
export const authAPI = {
  // 로그인
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post<ApiResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  // 회원가입
  signup: async (data: {
    studentId: string;
    name: string;
    email: string;
    password: string;
    major: string;
  }) => {
    const response = await axiosInstance.post<ApiResponse>("/auth/signup", data);
    return response.data;
  },

  // 이메일 인증번호 전송
  sendVerificationCode: async (email: string) => {
    const response = await axiosInstance.post<string>(
      "/api/auth/email/send",
      { email }
    );
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
    const response = await axiosInstance.post<string>("/api/auth/email/verify", {
      email,
      code,
    });
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
    const response = await axiosInstance.post<ApiResponse>("/auth/logout");
    return response.data;
  },
};

/**
 * 사용자 API
 */
export const userAPI = {
  // 사용자 정보 조회
  getProfile: async () => {
    const response = await axiosInstance.get<ApiResponse>("/user/profile");
    return response.data;
  },

  // 사용자 정보 수정
  updateProfile: async (data: {
    name?: string;
    major?: string;
  }) => {
    const response = await axiosInstance.put<ApiResponse>("/user/profile", data);
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await axiosInstance.put<ApiResponse>(
      "/user/change-password",
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  },

  // 회원 탈퇴
  deleteAccount: async (password: string) => {
    const response = await axiosInstance.delete<ApiResponse>("/user/account", {
      data: { password },
    });
    return response.data;
  },
};

/**
 * 강의 API
 */
export const courseAPI = {
  // 전체 강의 목록 조회
  getAllCourses: async () => {
    const response = await axiosInstance.get<ApiResponse>("/courses");
    return response.data;
  },

  // 내 강의 목록 조회
  getMyCourses: async () => {
    const response = await axiosInstance.get<ApiResponse>("/courses/my");
    return response.data;
  },

  // 강의 검색
  searchCourses: async (query: string) => {
    const response = await axiosInstance.get<ApiResponse>("/courses/search", {
      params: { q: query },
    });
    return response.data;
  },

  // 강의 즐겨찾기 추가
  addToFavorites: async (courseId: string) => {
    const response = await axiosInstance.post<ApiResponse>(
      `/courses/${courseId}/favorite`
    );
    return response.data;
  },

  // 강의 즐겨찾기 제거
  removeFromFavorites: async (courseId: string) => {
    const response = await axiosInstance.delete<ApiResponse>(
      `/courses/${courseId}/favorite`
    );
    return response.data;
  },
};

/**
 * 챗봇 API
 */
export const chatAPI = {
  // 메시지 전송
  sendMessage: async (message: string) => {
    const response = await axiosInstance.post<ApiResponse>("/chat/message", {
      message,
    });
    return response.data;
  },

  // 채팅 기록 조회
  getChatHistory: async () => {
    const response = await axiosInstance.get<ApiResponse>("/chat/history");
    return response.data;
  },
};

/**
 * 에러 핸들링 유틸리티
 */
export const handleApiError = (error: any): string => {
  if (error.response) {
    // 서버 응답이 있는 경우
    return error.response.data?.message || "서버 오류가 발생했습니다.";
  } else if (error.request) {
    // 요청은 전송되었으나 응답이 없는 경우
    return "서버와 연결할 수 없습니다.";
  } else {
    // 요청 설정 중 오류 발생
    return error.message || "알 수 없는 오류가 발생했습니다.";
  }
};
