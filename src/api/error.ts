/**
 * 에러 핸들링 유틸리티
 */
export const handleApiError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const err = error as {
      response?: { data?: { message?: string } };
      request?: unknown;
      message?: string;
    };

    if (err.response) {
      // 서버 응답이 있는 경우
      return err.response.data?.message || '서버 오류가 발생했습니다.';
    } else if (err.request) {
      // 요청은 전송되었으나 응답이 없는 경우
      return '서버와 연결할 수 없습니다.';
    } else if (err.message) {
      // 요청 설정 중 오류 발생
      return err.message;
    }
  }
  return '알 수 없는 오류가 발생했습니다.';
};
