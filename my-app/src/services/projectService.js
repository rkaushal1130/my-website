import { api } from './api';

export const projectService = {
  /**
   * Retrieve published projects (Public)
   * @param {Object} [params]
   */
  getProjects: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.featured !== undefined) query.append('featured', String(params.featured));
    if (params.published !== undefined) query.append('published', String(params.published));
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    return api.get(`/projects${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Retrieve all projects including unpublished (Admin only)
   * @param {Object} [params]
   */
  getAdminProjects: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.category) query.append('category', params.category);
    if (params.featured !== undefined) query.append('featured', String(params.featured));
    if (params.published !== undefined) query.append('published', String(params.published));
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    return api.get(`/projects${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Retrieve single project by unique slug
   * @param {string} slug
   */
  getProjectBySlug: async (slug) => {
    return api.get(`/projects/${slug}`);
  },

  /**
   * Create a new project (Admin only)
   * @param {Object} data
   */
  createProject: async (data) => {
    return api.post('/projects', data);
  },

  /**
   * Update an existing project (Admin only)
   * @param {string} id
   * @param {Object} data
   */
  updateProject: async (id, data) => {
    return api.patch(`/projects/${id}`, data);
  },

  /**
   * Delete a project (Admin only)
   * @param {string} id
   */
  deleteProject: async (id) => {
    return api.delete(`/projects/${id}`);
  },
};

export default projectService;
