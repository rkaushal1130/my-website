import { api } from './api';

export const contactService = {
  /**
   * Submit a new contact / inquiry message (Public)
   * @param {Object} data
   */
  submitContactForm: async (data) => {
    return api.post('/contact', {
      name: data.name ? data.name.trim() : '',
      email: data.email ? data.email.trim() : '',
      phone: data.phone && data.phone.trim() ? data.phone.trim() : undefined,
      company: data.company && data.company.trim() ? data.company.trim() : undefined,
      service: data.service && data.service.trim() ? data.service.trim() : undefined,
      message: data.message ? data.message.trim() : '',
    });
  },

  submitContact: async (data) => {
    return contactService.submitContactForm(data);
  },

  /**
   * List contact messages with pagination & filters (Admin only)
   * @param {Object} [params]
   */
  getContactMessages: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const queryString = query.toString();
    return api.get(`/contact${queryString ? `?${queryString}` : ''}`);
  },

  getMessages: async (params = {}) => {
    return contactService.getContactMessages(params);
  },

  /**
   * Get single contact message details by ID (Admin only)
   * @param {string} id
   */
  getContactMessage: async (id) => {
    return api.get(`/contact/${id}`);
  },

  getMessageById: async (id) => {
    return contactService.getContactMessage(id);
  },

  /**
   * Update contact message status (Admin only)
   * @param {string} id
   * @param {string} status - NEW | READ | REPLIED | ARCHIVED
   */
  updateContactStatus: async (id, status) => {
    return api.patch(`/contact/${id}`, { status });
  },

  updateMessageStatus: async (id, status) => {
    return contactService.updateContactStatus(id, status);
  },

  /**
   * Permanently delete a contact message (Admin only)
   * @param {string} id
   */
  deleteContactMessage: async (id) => {
    return api.delete(`/contact/${id}`);
  },

  deleteMessage: async (id) => {
    return contactService.deleteContactMessage(id);
  },
};

export default contactService;
