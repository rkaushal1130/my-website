/**
 * Centralized API Client for NeverQuit.ai React Frontend
 *
 * Backend Response Protocol:
 * Success: { "success": true, "data": {}, "message": "..." }
 * Error:   { "success": false, "message": "...", "errors": [] }
 *
 * Centralized HTTP Error Normalization:
 * - 400: Bad Request & client validation errors
 * - 401: Unauthorized (clears session & redirects when appropriate)
 * - 403: Forbidden ("You don't have permission to perform this action.")
 * - 404: Not Found ("The requested resource was not found.")
 * - 409: Conflict ("A resource with this identifier already exists.")
 * - 422: Unprocessable Entity
 * - 429: Rate Limited ("Too many requests. Please try again later.")
 * - 500: Server Error ("Something went wrong. Please try again later.")
 *
 * Never displays raw database errors or stack traces to the user.
 */

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:5000/api';

const TOKEN_KEY = 'neverquit_auth_token';

export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      // Ignore in restricted environments
    }
  },
  remove: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Ignore
    }
  },
};

/**
 * Standardizes backend error messages based on HTTP status codes
 * and shields raw internal errors.
 */
export function normalizeErrorMessage(status, data) {
  const backendMsg = data && typeof data === 'object' && typeof data.message === 'string' ? data.message : '';

  // Prevent raw database/Prisma errors from surfacing
  const containsRawDbError =
    backendMsg.includes('Prisma') ||
    backendMsg.includes('SQL') ||
    backendMsg.includes('database') ||
    backendMsg.includes('SELECT') ||
    backendMsg.includes('INSERT') ||
    backendMsg.includes('foreign key') ||
    backendMsg.includes('unique constraint');

  switch (status) {
    case 400:
      return (!containsRawDbError && backendMsg) || 'Invalid request. Please verify your input.';
    case 401:
      return (!containsRawDbError && backendMsg) || 'Authentication required. Please sign in.';
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return (!containsRawDbError && backendMsg) || 'The requested resource was not found.';
    case 409:
      return (!containsRawDbError && backendMsg) || 'A conflict occurred. This record may already exist.';
    case 422:
      return (!containsRawDbError && backendMsg) || 'Unable to process request. Please check submitted data.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Something went wrong. Please try again later.';
    default:
      return (!containsRawDbError && backendMsg) || 'An unexpected error occurred. Please try again.';
  }
}

/**
 * Standard HTTP Request Wrapper
 */
export async function request(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  // Attach Bearer token from storage if available
  const token = tokenStorage.get();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Includes HTTP-only cookies
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage = normalizeErrorMessage(response.status, data);

      const error = new Error(errorMessage);
      error.status = response.status;
      error.errors = (data && typeof data === 'object' && Array.isArray(data.errors)) ? data.errors : [];
      error.data = data;
      error.success = false;

      // Handle 401 Unauthorized for active sessions
      if (response.status === 401) {
        const hadToken = !!tokenStorage.get();
        if (hadToken) {
          tokenStorage.remove();
          // If the user was actively navigating in the admin panel, trigger session expiration
          if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
            window.location.href = '/login';
          }
        }
      }

      throw error;
    }

    // Standardize successful JSON response
    return data;
  } catch (error) {
    // Distinguish network drop vs HTTP status error
    if (!error.status) {
      error.message = 'Unable to connect to the server. Please check your network connection.';
      error.status = 0;
      error.errors = [];
      error.success = false;
    }
    throw error;
  }
}

export const api = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
