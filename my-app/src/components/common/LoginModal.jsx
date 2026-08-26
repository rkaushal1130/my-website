import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2, User, LogOut } from 'lucide-react';
import { authService } from '../../services';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkAuthStatus();
    }
  }, [isOpen]);

  const checkAuthStatus = async () => {
    if (authService.isAuthenticated()) {
      try {
        const res = await authService.getMe();
        if (res?.data?.user) {
          setCurrentUser(res.data.user);
        }
      } catch {
        authService.removeToken();
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        email: email.trim(),
        password,
      });

      const user = response?.data?.user;
      setCurrentUser(user);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setCurrentUser(null);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#030303]/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0D0D10] border border-[#242424] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-left">
        {/* Top Glow & Accent Line */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF1F26]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-[#141416] border border-[#242424] text-[#A7A7A7] hover:text-white hover:border-[#FF1F26] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {currentUser ? (
          /* Authenticated User Profile View */
          <div className="py-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FF1F26]/10 border border-[#FF1F26]/30 flex items-center justify-center text-[#FF1F26]">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{currentUser.name}</h3>
                <p className="text-xs text-[#A7A7A7]">{currentUser.email}</p>
                <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF1F26]/20 text-[#FF1F26] border border-[#FF1F26]/30 uppercase">
                  Role: {currentUser.role}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#050505] border border-[#242424] text-xs text-[#A7A7A7] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#737373]">Authentication State:</span>
                <span className="text-emerald-400 font-semibold">Active JWT Session</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">User ID:</span>
                <span className="font-mono text-white/80">{currentUser.id?.slice(0, 8)}...</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="flex-1 py-3 rounded-xl bg-[#1A1A1E] hover:bg-red-950/40 border border-[#242424] hover:border-[#FF1F26] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4 text-[#FF1F26]" />}
                <span>Sign Out</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : isSuccess ? (
          /* Success Screen */
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Login Successful</h3>
            <p className="text-xs text-[#A7A7A7]">Welcome back to NeverquiT AI.</p>
          </div>
        ) : (
          /* Sign In Form */
          <div>
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FF1F26] uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>NeverquiT AI Admin & Staff</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Sign In</h2>
              <p className="text-xs text-[#A7A7A7]">
                Authenticate to manage projects, candidates, and client messages.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#FF1F26]" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full min-h-[44px] pl-10 pr-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#CCCCCC] mb-1.5 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full min-h-[44px] pl-10 pr-3.5 rounded-xl bg-[#050505] border border-[#242424] text-sm text-white placeholder-[#525252] focus:border-[#FF1F26] focus:ring-2 focus:ring-[#FF1F26]/20 focus:outline-none transition-all"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,31,38,0.3)] hover:shadow-[0_0_30px_rgba(255,31,38,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
