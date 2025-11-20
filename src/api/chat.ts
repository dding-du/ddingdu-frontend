import axiosInstance from '@/lib/axios';
import type { ApiResponse } from './types';

/**
 * 챗봇 API
 */
export const chatAPI = {
  // 메시지 전송
  sendMessage: async (message: string) => {
    const response = await axiosInstance.post<ApiResponse>('/chat/message', {
      message,
    });
    return response.data;
  },

  // 채팅 기록 조회
  getChatHistory: async () => {
    const response = await axiosInstance.get<ApiResponse>('/chat/history');
    return response.data;
  },
};
