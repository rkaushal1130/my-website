import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in as Admin
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        const destination = location.state?.from?.pathname || '/admin';
        navigate(destination, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        email: email.trim(),
        password,
      });

      const user = response?.data?.user;
      if (user?.role === 'ADMIN') {
        const destination = location.state?.from?.pathname || '/admin';
        navigate(destination, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Login failure:', err);
      setErrorMessage(
        err.message || 'Invalid email or password. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden text-left">
      {/* Background Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-glow opacity-80 pointer-events-none" />

      {/* Back to Site Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-xs font-medium text-[#A8A8A8] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#FF1F26]" />
        <span>Back to NeverquiT AI</span>
      </Link>

      <div className="relative z-10 max-w-md w-full rounded-3xl bg-[#0D0D10] border border-[#242424] p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-white/10 flex items-center justify-center mx-auto mb-4 p-1 shadow-[0_0_20px_rgba(255,31,38,0.25)]">
            <img src={brandLogo} alt="NeverquiT AI" className="w-full h-full object-contain rounded-xl" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FF1F26]/10 text-[#FF1F26] border border-[#FF1F26]/30 mb-3 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Operations Console</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Admin Sign In
          </h1>
          <p className="text-xs text-[#A8A8A8] mt-1">
            Enter your credentials to access management controls.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#FF1F26]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#CCCCCC] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@neverquit.ai"
                className="w-full min-h-[46px] pl-10 pr-4 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all disabled:opacity-60"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#CCCCCC] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full min-h-[46px] pl-10 pr-4 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all disabled:opacity-60"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-sm font-bold shadow-[0_0_25px_rgba(255,31,38,0.35)] hover:shadow-[0_0_35px_rgba(255,31,38,0.55)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#1C1C20] text-center">
          <p className="text-[11px] text-[#737373]">
            Protected by NeverquiT AI enterprise zero-trust authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
