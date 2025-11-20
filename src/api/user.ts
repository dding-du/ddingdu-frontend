import axiosInstance from "@/lib/axios";
import type { ApiResponse, UserInfoResponseDto } from "./types";

/**
 * 사용자 API
 */
export const userAPI = {
  // 내 정보 조회 (마이페이지)
  getMyInfo: async () => {
    const response = await axiosInstance.get<UserInfoResponseDto>(
      "/api/users/me"
    );
    return response.data;
  },

  // 사용자 정보 조회
  getProfile: async () => {
    const response = await axiosInstance.get<ApiResponse>("/user/profile");
    return response.data;
  },

  // 사용자 정보 수정
  updateProfile: async (data: { name?: string; major?: string }) => {
    const response = await axiosInstance.put<ApiResponse>(
      "/user/profile",
      data
    );
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
