import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Mail,
  Briefcase,
  Users,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  User,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import brandLogo from '../../assets/images/logo.png';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
  { name: 'Contact Messages', path: '/admin/messages', icon: Mail },
  { name: 'Job Openings', path: '/admin/jobs', icon: Briefcase },
  { name: 'Applications', path: '/admin/applications', icon: Users },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const current = navItems.find((item) =>
      item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
    );
    return current ? current.name : 'Console';
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex font-sans antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#121215] border-b border-[#27272a] px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <img src={brandLogo} alt="NeverQuit" className="w-6 h-6 object-contain rounded" />
          <span className="font-semibold text-sm tracking-tight text-white">
            NeverQuit<span className="text-[#ef4444]">.ai</span> Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white"
        >
          {mobileNavOpen ? <X className="w-5 h-5 text-[#ef4444]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-60 bg-[#0c0c0e] border-r border-[#27272a] flex flex-col justify-between transition-transform duration-200 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="h-14 px-5 border-b border-[#27272a] flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#18181b] border border-[#27272a] flex items-center justify-center p-0.5">
              <img src={brandLogo} alt="NeverQuit" className="w-full h-full object-contain rounded-sm" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                NeverQuit<span className="text-[#ef4444]">.ai</span>
              </span>
            </div>
            <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46]">
              ADMIN
            </span>
          </div>

          {/* Navigation Section */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-[#71717a] uppercase tracking-wider">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#18181b] text-white border border-[#27272a]'
                        : 'text-[#a1a1aa] hover:bg-[#121215] hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#71717a]" />
                    <span>{item.name}</span>
                  </div>
                  {location.pathname === item.path && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* User Footer & Sign out */}
        <div className="p-3 border-t border-[#27272a] space-y-2">
          <div className="px-3 py-2 rounded-lg bg-[#121215] border border-[#27272a] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#27272a] text-[#ef4444] flex items-center justify-center font-semibold text-xs shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden text-left flex-1 min-w-0">
              <span className="block text-xs font-medium text-white truncate">{user?.name || 'Administrator'}</span>
              <span className="block text-[10px] text-[#71717a] truncate">{user?.email || 'admin@neverquit.ai'}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Link
              to="/"
              target="_blank"
              className="flex-1 py-1.5 px-2 rounded-md bg-transparent hover:bg-[#18181b] text-[#a1a1aa] hover:text-white text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 py-1.5 px-2 rounded-md bg-transparent hover:bg-red-950/30 text-[#ef4444] text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Sign Out</span>
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0">
        {/* Top Header Bar */}
        <header className="h-14 bg-[#0c0c0e] border-b border-[#27272a] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-[#71717a]">
            <span>Console</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#18181b] border border-[#27272a] text-[11px] text-[#a1a1aa]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Production API: Online</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
