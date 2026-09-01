import { api } from './api';

export const careerService = {
  /**
   * List available published job openings (Public)
   * @param {Object} [params]
   */
  getJobs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.department) query.append('department', params.department);
    if (params.location) query.append('location', params.location);
    if (params.employmentType) query.append('employmentType', params.employmentType);
    if (params.published !== undefined) query.append('published', String(params.published));
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    return api.get(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * List all job openings including drafts (Admin only)
   * @param {Object} [params]
   */
  getAdminJobs: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.department) query.append('department', params.department);
    if (params.location) query.append('location', params.location);
    if (params.employmentType) query.append('employmentType', params.employmentType);
    if (params.published !== undefined) query.append('published', String(params.published));
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    return api.get(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Get single job opening details by slug
   * @param {string} slug
   */
  getJobBySlug: async (slug) => {
    return api.get(`/jobs/${slug}`);
  },

  /**
   * Create a new job posting (Admin only)
   * @param {Object} data
   */
  createJob: async (data) => {
    return api.post('/jobs', data);
  },

  /**
   * Update an existing job posting (Admin only)
   * @param {string} id
   * @param {Object} data
   */
  updateJob: async (id, data) => {
    return api.patch(`/jobs/${id}`, data);
  },

  /**
   * Delete a job posting (Admin only)
   * @param {string} id
   */
  deleteJob: async (id) => {
    return api.delete(`/jobs/${id}`);
  },

  /**
   * Submit candidate job application (Public)
   * @param {Object} payload
   */
  submitApplication: async (payload) => {
    return api.post('/applications', payload);
  },

  /**
   * List candidate applications with pagination & filters (Admin only)
   * @param {Object} [params]
   */
  getApplications: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.status) query.append('status', params.status);
    if (params.jobTitle) query.append('jobTitle', params.jobTitle);
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    return api.get(`/applications${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Get single application details by ID (Admin only)
   * @param {string} id
   */
  getApplication: async (id) => {
    return api.get(`/applications/${id}`);
  },

  getApplicationById: async (id) => {
    return careerService.getApplication(id);
  },

  /**
   * Update application status (Admin only)
   * @param {string} id
   * @param {string} status - RECEIVED | REVIEWING | SHORTLISTED | REJECTED | HIRED
   */
  updateApplicationStatus: async (id, status) => {
    return api.patch(`/applications/${id}`, { status });
  },

  /**
   * Delete an application (Admin only)
   * @param {string} id
   */
  deleteApplication: async (id) => {
    return api.delete(`/applications/${id}`);
  },
};

export default careerService;
