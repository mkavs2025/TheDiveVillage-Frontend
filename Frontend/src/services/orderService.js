import api from './api'

export const orderService = {
  create: (payload) => api.post('/api/orders', payload),
  getById: (id) => api.get(`/api/orders/${id}`),
  adminList: () => api.get('/api/orders/admin/list'),
}
