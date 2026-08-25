import React, { useState, useEffect } from 'react';
import { projectService } from '../../services';
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  FolderGit2,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'AI',
    image: '',
    featured: false,
    published: true,
  });

  const categories = ['ALL', 'AI', 'Machine Learning', 'Automation', 'Data', 'Consulting'];

  useEffect(() => {
    loadProjects(1);
  }, [categoryFilter, statusFilter]);

  const loadProjects = async (page = 1) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const params = {
        page,
        limit: 10,
      };

      if (categoryFilter !== 'ALL') {
        params.category = categoryFilter;
      }
      if (statusFilter === 'PUBLISHED') {
        params.published = true;
      } else if (statusFilter === 'DRAFT') {
        params.published = false;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await projectService.getAdminProjects(params);
      const items = res?.data?.items || res?.data || [];
      setProjects(items);
      if (res?.data?.pagination || res?.pagination) {
        setPagination(res.data?.pagination || res.pagination);
      } else {
        setPagination({ page, limit: 10, total: items.length, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
      setErrorMessage(err.message || 'Failed to fetch projects.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProjects(1);
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      category: 'AI',
      image: '',
      featured: false,
      published: true,
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditProject(proj);
    setFormData({
      title: proj.title || '',
      slug: proj.slug || '',
      description: proj.description || '',
      category: proj.category || 'AI',
      image: proj.image || '',
      featured: !!proj.featured,
      published: !!proj.published,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editProject) {
        await projectService.updateProject(editProject.id, formData);
        setEditProject(null);
      } else {
        await projectService.createProject(formData);
        setIsCreateModalOpen(false);
      }
      await loadProjects(pagination.page);
    } catch (err) {
      alert(err.message || 'Failed to save project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;
    try {
      await projectService.deleteProject(id);
      if (viewProject?.id === id) setViewProject(null);
      await loadProjects(pagination.page);
    } catch (err) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Manage showcase projects, case studies, and public visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-3.5 py-2 rounded-lg bg-[#ef4444] hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-3 rounded-xl bg-[#121215] border border-[#27272a] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#09090b] border border-[#27272a] text-white placeholder-[#71717a] text-xs focus:border-[#ef4444] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-[#09090b] border border-[#27272a] rounded-lg px-2 py-1">
            <span className="text-[11px] text-[#71717a]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#18181b] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Published Status Filter */}
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

      {/* Projects Table */}
      <div className="rounded-xl bg-[#121215] border border-[#27272a] overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-[#71717a] text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-[#ef4444]" />
            <span>Loading projects data...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#71717a] space-y-2">
            <FolderGit2 className="w-8 h-8 mx-auto text-[#3f3f46]" />
            <p>No projects match your search or filter parameters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#09090b] text-[#71717a] uppercase tracking-wider font-mono text-[10px] border-b border-[#27272a]">
                <tr>
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-[#18181b]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="block font-semibold text-white text-sm">{proj.title}</span>
                      <span className="block font-mono text-[11px] text-[#71717a]">/{proj.slug}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-zinc-300 border border-[#27272a]">
                        {proj.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        proj.published
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/40'
                          : 'bg-amber-950/50 text-amber-400 border border-amber-800/40'
                      }`}>
                        {proj.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {proj.featured ? (
                        <span className="text-emerald-400 font-semibold text-[11px]">Yes</span>
                      ) : (
                        <span className="text-[#71717a] text-[11px]">No</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setViewProject(proj)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg bg-[#18181b] hover:bg-red-950/40 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
                        title="Delete Project"
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
            Page {pagination.page} of {pagination.totalPages || 1} ({pagination.total || projects.length} items)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => loadProjects(pagination.page - 1)}
              className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => loadProjects(pagination.page + 1)}
              className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create / Edit Project Modal */}
      {(isCreateModalOpen || editProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-[#121215] border border-[#27272a] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <h3 className="text-sm font-bold text-white">
                {editProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditProject(null);
                }}
                className="text-[#71717a] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enterprise AI Agent Workforce"
                  className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                />
              </div>

              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Slug (Leave blank to auto-generate)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="enterprise-ai-agent-workforce"
                  className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a1a1aa] mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                  >
                    <option value="AI">AI</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Automation">Automation</option>
                    <option value="Data">Data</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span>Published</span>
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Featured</span>
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
                  placeholder="High-throughput autonomous agent system..."
                  className="w-full p-2.5 rounded-lg bg-[#09090b] border border-[#27272a] text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditProject(null);
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
                  <span>{editProject ? 'Update Project' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {viewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-[#121215] border border-[#27272a] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div>
                <h3 className="text-sm font-bold text-white">{viewProject.title}</h3>
                <span className="text-[11px] font-mono text-[#71717a]">/{viewProject.slug}</span>
              </div>
              <button
                type="button"
                onClick={() => setViewProject(null)}
                className="text-[#71717a] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#18181b] text-white border border-[#27272a]">
                  {viewProject.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                  viewProject.published ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'
                }`}>
                  {viewProject.published ? 'PUBLISHED' : 'DRAFT'}
                </span>
                {viewProject.featured && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-purple-400 bg-purple-950/40">
                    FEATURED
                  </span>
                )}
              </div>

              <div>
                <span className="text-[#71717a] block text-[10px] mb-1">Description</span>
                <p className="p-3 rounded-lg bg-[#09090b] border border-[#27272a] text-zinc-200 leading-relaxed">
                  {viewProject.description}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewProject(null)}
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

export default AdminProjects;
