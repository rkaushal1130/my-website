import { Response } from 'express';

export interface StandardSuccessResponse<T = any> {
  success: true;
  data: T;
  message: string;
}

export interface StandardErrorResponse {
  success: false;
  message: string;
  errors: any[];
}

/**
 * Sends a standardized success JSON response.
 * Structure: { success: true, data: { ... }, message: "..." }
 */
export const sendSuccess = <T = any>(
  res: Response,
  data: T = {} as T,
  message = 'Operation completed successfully.',
  statusCode = 200
): Response<StandardSuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    data: data !== undefined && data !== null ? data : {},
    message,
  });
};

/**
 * Sends a standardized error JSON response.
 * Structure: { success: false, message: "...", errors: [...] }
 */
export const sendError = (
  res: Response,
  message = 'Something went wrong.',
  statusCode = 500,
  errors: any[] = []
): Response<StandardErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: Array.isArray(errors) ? errors : (errors ? [errors] : []),
  });
};
