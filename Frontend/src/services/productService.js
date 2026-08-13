import api from './api'

export const productService = {
  list: (params = {}) => api.get('/api/products', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (payload) => api.post('/api/products', payload),
  update: (id, payload) => api.put(`/api/products/${id}`, payload),
  remove: (id) => api.delete(`/api/products/${id}`),
  getInventory: (productId) => api.get(`/api/inventory/${productId}`),
  updateInventory: (id, payload) => api.put(`/api/inventory/${id}`, payload),
}
