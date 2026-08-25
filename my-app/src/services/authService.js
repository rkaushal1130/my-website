import { api, tokenStorage } from './api';

export const authService = {
  /**
   * Authenticate user with email and password
   * Supports both login(email, password) and login({ email, password })
   * @param {string|Object} emailOrPayload
   * @param {string} [password]
   * @returns {Promise<Object>} API response with user and optional token
   */
  login: async (emailOrPayload, password) => {
    const payload =
      typeof emailOrPayload === 'object'
        ? { email: emailOrPayload.email, password: emailOrPayload.password }
        : { email: emailOrPayload, password };

    const response = await api.post('/auth/login', payload);
    if (response?.data?.token) {
      tokenStorage.set(response.data.token);
    }
    return response;
  },

  /**
   * Register a new user account
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.email
   * @param {string} payload.password
   */
  register: async ({ name, email, password }) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response?.data?.token) {
      tokenStorage.set(response.data.token);
    }
    return response;
  },

  /**
   * Log out user, clearing backend session and client storage
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Clear client state even if backend session was already expired
    } finally {
      tokenStorage.remove();
    }
  },

  /**
   * Retrieve current authenticated user profile
   * GET /api/auth/me
   */
  getCurrentUser: async () => {
    return api.get('/auth/me');
  },

  /**
   * Alias helper for getMe
   */
  getMe: async () => {
    return authService.getCurrentUser();
  },

  /**
   * Check if token exists locally
   */
  isAuthenticated: () => {
    return !!tokenStorage.get();
  },

  getToken: () => tokenStorage.get(),
  setToken: (token) => tokenStorage.set(token),
  removeToken: () => tokenStorage.remove(),
};

export default authService;
