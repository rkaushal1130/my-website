import React, { useState, useEffect } from 'react';
import { careerService } from '../../services';
import {
  Users,
  Trash2,
  ExternalLink,
  Eye,
  Search,
  Loader2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
} from 'lucide-react';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const statuses = ['ALL', 'RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED'];

  useEffect(() => {
    loadApplications(1);
  }, [activeStatus]);

  const loadApplications = async (page = 1) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = {
        page,
        limit: 10,
      };
      if (activeStatus !== 'ALL') {
        params.status = activeStatus;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await careerService.getApplications(params);
      const items = res?.data?.items || res?.data || [];
      setApplications(items);
      if (res?.data?.pagination || res?.pagination) {
        setPagination(res.data?.pagination || res.pagination);
      } else {
        setPagination({ page, limit: 10, total: items.length, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
      setErrorMessage(err.message || 'Failed to fetch candidate applications.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadApplications(1);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await careerService.updateApplicationStatus(id, newStatus);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
      await loadApplications(pagination.page);
    } catch (err) {
      alert(err.message || 'Failed to update application status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this application?')) return;
    try {
      await careerService.deleteApplication(id);
      if (selectedApp?.id === id) setSelectedApp(null);
      await loadApplications(pagination.page);
    } catch (err) {
      alert(err.message || 'Failed to delete application.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Candidate Applications
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Review applicant profiles, evaluate candidate pitch notes, and advance hiring stages.
          </p>
        </div>
      </div>

      {/* Control Bar: Search & Status Filter */}
      <div className="p-3 rounded-xl bg-[#121215] border border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search candidates, roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#09090b] border border-[#27272a] text-white placeholder-[#71717a] text-xs focus:border-[#ef4444] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#09090b] border border-[#27272a] rounded-lg p-1 w-full md:w-auto overflow-x-auto">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeStatus === st
                  ? 'bg-[#18181b] text-white border border-[#27272a]'
                  : 'text-[#71717a] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-800/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Applications Table */}
      <div className="rounded-xl bg-[#121215] border border-[#27272a] overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-[#71717a] text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-[#ef4444]" />
            <span>Loading candidate records...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#71717a] space-y-2">
            <Users className="w-8 h-8 mx-auto text-[#3f3f46]" />
            <p>No candidate applications match the current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#09090b] text-[#71717a] uppercase tracking-wider font-mono text-[10px] border-b border-[#27272a]">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Role Applied For</th>
                  <th className="py-3 px-4">Hiring Status</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#18181b]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="block font-semibold text-white text-sm">{app.name}</span>
                      <span className="block text-[11px] text-[#a1a1aa]">{app.email}</span>
                      {app.phone && <span className="block text-[10px] text-[#71717a]">{app.phone}</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                        {app.jobTitle}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-semibold bg-[#09090b] border focus:outline-none cursor-pointer ${
                          app.status === 'HIRED'
                            ? 'text-emerald-400 border-emerald-800/40'
                            : app.status === 'SHORTLISTED'
                            ? 'text-blue-400 border-blue-800/40'
                            : app.status === 'REVIEWING'
                            ? 'text-amber-400 border-amber-800/40'
                            : app.status === 'REJECTED'
                            ? 'text-[#71717a] border-[#27272a]'
                            : 'text-[#ef4444] border-red-800/40'
                        }`}
                      >
                        <option value="RECEIVED" className="bg-[#18181b]">RECEIVED</option>
                        <option value="REVIEWING" className="bg-[#18181b]">REVIEWING</option>
                        <option value="SHORTLISTED" className="bg-[#18181b]">SHORTLISTED</option>
                        <option value="REJECTED" className="bg-[#18181b]">REJECTED</option>
                        <option value="HIRED" className="bg-[#18181b]">HIRED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#71717a]">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                        title="View Candidate Application"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(app.id)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-red-950/40 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-3 border-t border-[#27272a] bg-[#09090b] flex items-center justify-between text-xs text-[#71717a]">
          <span>
            Page {pagination.page} of {pagination.totalPages || 1} ({pagination.total || applications.length} items)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => loadApplications(pagination.page - 1)}
              className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => loadApplications(pagination.page + 1)}
              className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* View Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-[#121215] border border-[#27272a] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedApp.name}</h3>
                <span className="text-[11px] text-[#ef4444] font-medium">{selectedApp.jobTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-[#71717a] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#09090b] border border-[#27272a]">
                <div>
                  <span className="text-[#71717a] block text-[10px]">Email</span>
                  <span className="font-semibold text-white">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[10px]">Phone</span>
                  <span className="text-white">{selectedApp.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[10px]">Current Status</span>
                  <span className="text-emerald-400 font-semibold">{selectedApp.status}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[10px]">Resume / Document</span>
                  {selectedApp.resumeUrl ? (
                    <a
                      href={selectedApp.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#ef4444] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Open Document</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[#71717a]">None provided</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[#71717a] block text-[10px] mb-1">Cover Note / Candidate Pitch</span>
                <p className="p-3.5 rounded-lg bg-[#09090b] border border-[#27272a] text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedApp.coverLetter || 'No cover letter attached.'}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#71717a]">Update stage:</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                    className="px-2 py-1 rounded bg-[#09090b] border border-[#27272a] text-white text-xs"
                  >
                    <option value="RECEIVED">RECEIVED</option>
                    <option value="REVIEWING">REVIEWING</option>
                    <option value="SHORTLISTED">SHORTLISTED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="HIRED">HIRED</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-1.5 rounded-lg bg-[#ef4444] text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
