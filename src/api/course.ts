import axiosInstance from "@/lib/axios";
import type {
  ApiResponse,
  LectureResponseDto,
  TakeRequestDto,
  TakeResponseDto,
} from "./types";

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

  // 내 강의 조회 (수강정보 조회)
  getMyLectures: async (userId: number) => {
    const response = await axiosInstance.get<TakeResponseDto[]>(
      `/api/takes/my-lecture/${userId}`
    );
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

  // 강의 보관 (수강정보 추가)
  takeLecture: async (lectureId: number) => {
    const requestBody: TakeRequestDto = { lectureId };
    const response = await axiosInstance.post<ApiResponse>(
      "/api/takes",
      requestBody
    );
    return response.data;
  },

  // 강의 보관 해제 (수강정보 삭제)
  dropLecture: async (lectureId: number) => {
    const requestBody: TakeRequestDto = { lectureId };
    const response = await axiosInstance.delete<ApiResponse>("/api/takes", {
      data: requestBody,
    });
    return response.data;
  },
};
