import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Mail,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Loader2,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { projectService, contactService, careerService } from '../../services';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    newMessages: 0,
    activeJobs: 0,
    applications: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [projRes, msgRes, jobsRes, appsRes] = await Promise.allSettled([
        projectService.getProjects({ limit: 100 }),
        contactService.getMessages({ limit: 100 }),
        careerService.getJobs({ limit: 100 }),
        careerService.getApplications({ limit: 100 }),
      ]);

      const projects = projRes.status === 'fulfilled' ? projRes.value?.data?.items || projRes.value?.data || [] : [];
      const messages = msgRes.status === 'fulfilled' ? msgRes.value?.data?.items || msgRes.value?.data || [] : [];
      const jobs = jobsRes.status === 'fulfilled' ? jobsRes.value?.data?.items || jobsRes.value?.data || [] : [];
      const applications = appsRes.status === 'fulfilled' ? appsRes.value?.data?.items || appsRes.value?.data || [] : [];

      const publishedCount = projects.filter((p) => p.published).length;
      const newMessagesCount = messages.filter((m) => m.status === 'NEW').length;
      const activeJobsCount = jobs.filter((j) => j.published).length;

      setMetrics({
        totalProjects: projects.length,
        publishedProjects: publishedCount,
        newMessages: newMessagesCount,
        activeJobs: activeJobsCount,
        applications: applications.length,
      });

      setRecentMessages(messages.slice(0, 5));
      setRecentApplications(applications.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Projects',
      value: metrics.totalProjects,
      desc: 'All showcase items',
      link: '/admin/projects',
      icon: FolderGit2,
      badgeColor: 'bg-zinc-800 text-zinc-300',
    },
    {
      label: 'Published Projects',
      value: metrics.publishedProjects,
      desc: 'Visible to public',
      link: '/admin/projects',
      icon: CheckCircle2,
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40',
    },
    {
      label: 'New Messages',
      value: metrics.newMessages,
      desc: 'Unread inquiries',
      link: '/admin/messages',
      icon: Mail,
      badgeColor: metrics.newMessages > 0 ? 'bg-red-950/60 text-[#ef4444] border border-red-800/40' : 'bg-zinc-800 text-zinc-400',
    },
    {
      label: 'Active Jobs',
      value: metrics.activeJobs,
      desc: 'Published openings',
      link: '/admin/jobs',
      icon: Briefcase,
      badgeColor: 'bg-blue-950/60 text-blue-400 border border-blue-800/40',
    },
    {
      label: 'Applications',
      value: metrics.applications,
      desc: 'Total candidate submissions',
      link: '/admin/applications',
      icon: Users,
      badgeColor: 'bg-purple-950/60 text-purple-400 border border-purple-800/40',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            System Overview
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Monitor real-time metrics across inquiries, projects, and recruitment pipelines.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboardData}
          disabled={isLoading}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] text-[#fafafa] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#ef4444]' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-4 rounded-xl bg-[#121215] border border-[#27272a] hover:border-[#3f3f46] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#a1a1aa] font-medium">{card.label}</span>
                  <div className="w-7 h-7 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] group-hover:text-white">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-2xl font-bold text-white tracking-tight">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-[#71717a]" /> : card.value}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#1e1e22] flex items-center justify-between">
                <span className="text-[11px] text-[#71717a]">{card.desc}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a] group-hover:text-white transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Contact Messages & Candidate Applications Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Recent Inquiries */}
        <div className="rounded-xl bg-[#121215] border border-[#27272a] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#ef4444]" />
              <h3 className="text-sm font-bold text-white">Recent Inquiries</h3>
            </div>
            <Link to="/admin/messages" className="text-xs text-[#a1a1aa] hover:text-white flex items-center gap-1 font-medium">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-xs text-[#71717a]">Loading inquiries...</div>
          ) : recentMessages.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717a]">No contact messages recorded.</div>
          ) : (
            <div className="divide-y divide-[#1e1e22]">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="block font-semibold text-white truncate">{msg.name}</span>
                    <span className="block text-[11px] text-[#71717a] truncate">{msg.email}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                      msg.status === 'NEW'
                        ? 'bg-red-950/50 text-[#ef4444] border border-red-800/40'
                        : 'bg-[#18181b] text-[#a1a1aa]'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl bg-[#121215] border border-[#27272a] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Recent Applications</h3>
            </div>
            <Link to="/admin/applications" className="text-xs text-[#a1a1aa] hover:text-white flex items-center gap-1 font-medium">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-xs text-[#71717a]">Loading applications...</div>
          ) : recentApplications.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717a]">No applications submitted yet.</div>
          ) : (
            <div className="divide-y divide-[#1e1e22]">
              {recentApplications.map((app) => (
                <div key={app.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="block font-semibold text-white truncate">{app.name}</span>
                    <span className="block text-[11px] text-[#71717a] truncate">{app.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-[#a1a1aa] border border-[#27272a]">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
