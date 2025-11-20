import axiosInstance from "@/lib/axios";
import type { ApiResponse, ChatResponseDto } from "./types";

/**
 * 챗봇 API
 */
export const chatAPI = {
  // 메시지 전송
  sendMessage: async (message: string) => {
    const response = await axiosInstance.post<ApiResponse<ChatResponseDto>>(
      "/api/chat/stream/test",
      {
        userId: 2,
        message,
      }
    );
    return response.data;
  },
};
