import React, { useState, useEffect } from 'react';
import { careerService } from '../../services';
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  Search,
  Loader2,
  AlertCircle,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewJob, setViewJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    department: 'Engineering',
    location: 'Remote / Global',
    employmentType: 'Full-time',
    description: '',
    requirements: '',
    salaryRange: '$120k - $180k',
    published: true,
  });

  const departments = ['ALL', 'Engineering', 'Design', 'Business', 'Marketing'];

  useEffect(() => {
    loadJobs(1);
  }, [departmentFilter, statusFilter]);

  const loadJobs = async (page = 1) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = {
        page,
        limit: 10,
      };

      if (departmentFilter !== 'ALL') {
        params.department = departmentFilter;
      }
      if (statusFilter === 'PUBLISHED') {
        params.published = true;
      } else if (statusFilter === 'DRAFT') {
        params.published = false;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await careerService.getAdminJobs(params);
      const items = res?.data?.items || res?.data || [];
      setJobs(items);
      if (res?.data?.pagination || res?.pagination) {
        setPagination(res.data?.pagination || res.pagination);
      } else {
        setPagination({ page, limit: 10, total: items.length, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
      setErrorMessage(err.message || 'Failed to fetch job postings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadJobs(1);
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      slug: '',
      department: 'Engineering',
      location: 'Remote / Global',
      employmentType: 'Full-time',
      description: '',
      requirements: '',
      salaryRange: '',
      published: true,
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditJob(job);
    setFormData({
      title: job.title || '',
      slug: job.slug || '',
      department: job.department || 'Engineering',
      location: job.location || 'Remote / Global',
      employmentType: job.employmentType || 'Full-time',
      description: job.description || '',
      requirements: job.requirements || '',
      salaryRange: job.salaryRange || '',
      published: !!job.published,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editJob) {
        await careerService.updateJob(editJob.id, formData);
        setEditJob(null);
      } else {
        await careerService.createJob(formData);
        setIsCreateModalOpen(false);
      }
      await loadJobs(pagination.page);
    } catch (err) {
      alert(err.message || 'Failed to save job opening.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this job opening?')) return;
    try {
      await careerService.deleteJob(id);
      if (viewJob?.id === id) setViewJob(null);
      await loadJobs(pagination.page);
    } catch (err) {
      alert(err.message || 'Failed to delete job opening.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Job Openings
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Post and manage recruitment vacancies, requirements, and job status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-3.5 py-2 rounded-lg bg-[#ef4444] hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Job Opening</span>
        </button>
      </div>

      {/* Control Bar: Search & Department Filters */}
      <div className="p-3 rounded-xl bg-[#121215] border border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search job roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#09090b] border border-[#27272a] text-white placeholder-[#71717a] text-xs focus:border-[#ef4444] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] rounded-lg px-2 py-1">
            <span className="text-[11px] text-[#71717a]">Dept:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="bg-[#18181b] text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] rounded-lg px-2 py-1">
            <span className="text-[11px] text-[#71717a]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-[#18181b] text-white">All</option>
              <option value="PUBLISHED" className="bg-[#18181b] text-white">Published</option>
              <option value="DRAFT" className="bg-[#18181b] text-white">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-800/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Jobs Table */}
      <div className="rounded-xl bg-[#121215] border border-[#27272a] overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-[#71717a] text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-[#ef4444]" />
            <span>Loading job postings...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#71717a] space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-[#3f3f46]" />
            <p>No job postings match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#09090b] text-[#71717a] uppercase tracking-wider font-mono text-[10px] border-b border-[#27272a]">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Type & Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#18181b]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="block font-semibold text-white text-sm">{job.title}</span>
                      <span className="block font-mono text-[11px] text-[#71717a]">/{job.slug}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                        {job.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-white block">{job.employmentType}</span>
                      <span className="text-[#71717a] text-[11px] block">{job.location}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        job.published
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                          : 'bg-amber-950/50 text-amber-400 border border-amber-800/40'
                      }`}>
                        {job.published ? 'ACTIVE' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setViewJob(job)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                        title="View Job Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(job)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                        title="Edit Job"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(job.id)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-red-950/40 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
                        title="Delete Job"
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
            Page {pagination.page} of {pagination.totalPages || 1} ({pagination.total || jobs.length} items)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => loadJobs(pagination.page - 1)}
              className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => loadJobs(pagination.page + 1)}
              className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create / Edit Job Modal */}
      {(isCreateModalOpen || editJob) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-[#121215] border border-[#27272a] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h3 className="text-sm font-bold text-white">
                {editJob ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditJob(null);
                }}
                className="text-[#71717a] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Senior Machine Learning Engineer"
                  className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a1a1aa] mb-1 font-medium">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a1a1aa] mb-1 font-medium">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a1a1aa] mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Remote / Global"
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                  />
                </div>

                <div className="flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span>Active Opening</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed role description..."
                  className="w-full p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                />
              </div>

              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Requirements</label>
                <textarea
                  rows={2}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Key technical qualifications..."
                  className="w-full p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditJob(null);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-[#18181b] text-[#a1a1aa] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-[#ef4444] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editJob ? 'Update Opening' : 'Post Job'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Job Modal */}
      {viewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-[#121215] border border-[#27272a] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div>
                <h3 className="text-sm font-bold text-white">{viewJob.title}</h3>
                <span className="text-[11px] font-mono text-[#71717a]">/{viewJob.slug}</span>
              </div>
              <button
                type="button"
                onClick={() => setViewJob(null)}
                className="text-[#71717a] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-white border border-[#27272a]">
                  {viewJob.department}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                  {viewJob.employmentType}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  viewJob.published ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                }`}>
                  {viewJob.published ? 'ACTIVE' : 'DRAFT'}
                </span>
              </div>

              <div>
                <span className="text-[#71717a] block text-[10px] mb-1">Description</span>
                <p className="p-3 rounded-lg bg-[#09090b] border border-[#27272a] text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {viewJob.description}
                </p>
              </div>

              {viewJob.requirements && (
                <div>
                  <span className="text-[#71717a] block text-[10px] mb-1">Requirements</span>
                  <p className="p-3 rounded-lg bg-[#09090b] border border-[#27272a] text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-28 overflow-y-auto">
                    {viewJob.requirements}
                  </p>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewJob(null)}
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

export default AdminJobs;
