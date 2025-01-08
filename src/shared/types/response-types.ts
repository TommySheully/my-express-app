// responseTypes.ts
export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export interface ErrorResponse {
  data: null;
  message: string;
}
