import api from './api'

export const cartService = {
  get: () => api.get('/api/cart'),
  addItem: ({ inventoryId, quantity }) =>
    api.post('/api/cart/items', { inventoryId, quantity }),
  removeItem: (id) => api.delete(`/api/cart/items/${id}`),
}
