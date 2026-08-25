import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Forbidden = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-radial-glow opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full rounded-3xl bg-[#0D0D10] border border-[#242424] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent" />

        {/* Red Shield Icon */}
        <div className="w-20 h-20 rounded-3xl bg-[#FF1F26]/10 border border-[#FF1F26]/40 flex items-center justify-center text-[#FF1F26] mx-auto mb-6 shadow-[0_0_35px_rgba(255,31,38,0.35)] animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/50 text-[#FF3030] border border-red-800/60 mb-4 uppercase tracking-wider font-mono">
          <Lock className="w-3.5 h-3.5" />
          <span>Error 403 • Forbidden</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Administrator Access Required
        </h1>

        <p className="text-sm text-[#A8A8A8] leading-relaxed mb-6">
          Your account <span className="text-white font-semibold">({user?.email || 'Authenticated User'})</span> does not possess the administrative role required to access the NeverQuit.ai operations console.
        </p>

        <div className="p-4 rounded-2xl bg-[#050505] border border-[#242424] text-xs text-[#737373] text-left mb-8 space-y-1">
          <div className="flex justify-between">
            <span>Your Assigned Role:</span>
            <span className="font-mono text-white/90 font-semibold">{user?.role || 'USER'}</span>
          </div>
          <div className="flex justify-between">
            <span>Required Role:</span>
            <span className="font-mono text-[#FF1F26] font-semibold">ADMIN</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 py-3 px-4 rounded-xl bg-[#1A1A1E] hover:bg-[#242428] border border-[#242424] hover:border-[#FF1F26] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 py-3 px-4 rounded-xl bg-[#FF1F26] hover:bg-[#FF3030] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign in as Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
