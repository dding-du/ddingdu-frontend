/**
 * API 응답 타입
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * 토큰 응답 타입
 */
export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

/**
 * 강의 응답 타입
 */
export interface LectureResponseDto {
  id: number;
  lectureId: number;
  lectureName: string;
  professorName: string;
  lectureCode: string;
  department?: string;
  credits?: number;
  semester?: string;
}

/**
 * 수강 요청 타입
 */
export interface TakeRequestDto {
  lectureId: number;
  userId: number;
}

/**
 * 사용자 정보 응답 타입
 */
export interface UserInfoResponseDto {
  userId: number;
  mjuId: string;
  name: string;
  email: string;
  major: string;
}

/**
 * 수강 응답 타입
 */
export interface TakeResponseDto {
  id: number;
  lectureId: number;
  lectureName: string;
  professorName: string;
  lectureCode: string;
  department?: string;
  credits?: number;
  semester?: string;
}

/**
 * 챗봇 응답 타입
 */
export interface ChatResponseDto {
  message: string;
}
