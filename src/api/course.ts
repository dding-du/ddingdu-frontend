import axiosInstance from "@/lib/axios";
import type { ApiResponse, LectureResponseDto } from "./types";

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

  // 강의명으로 강의 조회
  searchByLectureName: async (lectureName: string) => {
    const response = await axiosInstance.get<LectureResponseDto[]>(
      `/api/lectures/lecture-name/${encodeURIComponent(lectureName)}`
    );
    return response.data;
  },

  // 교수명으로 강의 조회
  searchByProfessor: async (professorName: string) => {
    const response = await axiosInstance.get<LectureResponseDto[]>(
      `/api/lectures/professor/${encodeURIComponent(professorName)}`
    );
    return response.data;
  },

  // 강의번호로 강의 조회
  searchByLectureCode: async (lectureCode: string) => {
    const response = await axiosInstance.get<LectureResponseDto[]>(
      `/api/lectures/number/${encodeURIComponent(lectureCode)}`
    );
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
