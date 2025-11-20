import axiosInstance from "@/lib/axios";
import type { ApiResponse, ChatResponseDto } from "./types";

/**
 * 챗봇 API
 */
export const chatAPI = {
  // 메시지 전송
  sendMessage: async (userId: number, message: string): Promise<any> => {
    const response = await axiosInstance.post<ApiResponse<ChatResponseDto>>(
      "/api/chat/stream/test",
      {
        userId,
        message,
      }
    );
    return response || "";
  },
};
