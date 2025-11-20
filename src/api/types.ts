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
