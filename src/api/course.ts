import axiosInstance from '@/lib/axios';
import type { ApiResponse } from './types';

/**
 * 강의 API
 */
export const courseAPI = {
  // 전체 강의 목록 조회
  getAllCourses: async () => {
    const response = await axiosInstance.get<ApiResponse>('/courses');
    return response.data;
  },

  // 내 강의 목록 조회
  getMyCourses: async () => {
    const response = await axiosInstance.get<ApiResponse>('/courses/my');
    return response.data;
  },

  // 강의 검색
  searchCourses: async (query: string) => {
    const response = await axiosInstance.get<ApiResponse>('/courses/search', {
      params: { q: query },
    });
    return response.data;
  },

  // 강의 즐겨찾기 추가
  addToFavorites: async (courseId: string) => {
    const response = await axiosInstance.post<ApiResponse>(`/courses/${courseId}/favorite`);
    return response.data;
  },

  // 강의 즐겨찾기 제거
  removeFromFavorites: async (courseId: string) => {
    const response = await axiosInstance.delete<ApiResponse>(`/courses/${courseId}/favorite`);
    return response.data;
  },
};
