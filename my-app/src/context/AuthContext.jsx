import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, tokenStorage } from '../services';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authenticate session against the backend as the source of truth
  const verifyAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authService.getCurrentUser();
      if (response?.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
        tokenStorage.remove();
      }
    } catch {
      // If unauthenticated or token expired, cleanly reset state
      setUser(null);
      tokenStorage.remove();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  /**
   * Log in user and establish session
   * @param {string|Object} emailOrPayload
   * @param {string} [password]
   */
  const login = async (emailOrPayload, password) => {
    const response = await authService.login(emailOrPayload, password);
    if (response?.data?.user) {
      setUser(response.data.user);
    }
    return response;
  };

  /**
   * Log out user and destroy session
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore
    } finally {
      setUser(null);
      tokenStorage.remove();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        logout,
        verifyAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
