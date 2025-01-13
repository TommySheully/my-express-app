// responseTypes.ts
import { ValidationError } from 'express-validator';

export interface SuccessResponse<T> {
  data: T;
  message: string;
}

export interface ErrorResponse {
  data: null | Record<string, ValidationError>
  message: string;
}
