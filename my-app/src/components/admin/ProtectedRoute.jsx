import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';
import Forbidden from '../../pages/Forbidden';

/**
 * ProtectedRoute: Enforces backend-verified authentication and ADMIN role check.
 * - Redirects unauthenticated users to /login
 * - Shows 403 Forbidden page if authenticated user lacks ADMIN privileges
 */
const ProtectedRoute = ({ children, requireAdmin = true }) => {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // 1. Loading verification state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF1F26]" />
        <p className="text-sm text-[#A8A8A8] font-medium tracking-wide">
          Verifying security credentials with server...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated: Redirect to /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Authenticated but lacks ADMIN privileges: Show 403 Forbidden page
  if (requireAdmin && !isAdmin) {
    return <Forbidden />;
  }

  // 4. Authorized: Render protected components
  return children;
};

export default ProtectedRoute;
