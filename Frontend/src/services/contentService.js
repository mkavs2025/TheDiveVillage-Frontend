import api from './api'

export const contentService = {
  getFaq: () => api.get('/api/content/faq'),
  createFaq: (payload) => api.post('/api/content/faq', payload),
  getAuditLogs: () => api.get('/api/admin/audit-logs'),
}
