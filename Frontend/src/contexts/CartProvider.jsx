import { useCallback, useEffect, useMemo, useState } from 'react'
import { cartService } from '../services/cartService'
import { CartContext } from './CartContext'

function loadLocalCart() {
  try {
    const raw = localStorage.getItem('tdv_cart_v1')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadLocalCart())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('tdv_cart_v1', JSON.stringify(items))
  }, [items])

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await cartService.get()
      if (Array.isArray(data?.items)) setItems(data.items)
    } catch {
      /* keep local cart when API offline */
    } finally {
      setLoading(false)
    }
  }, [])

  const addItem = useCallback(async ({ inventoryId, quantity = 1, product }) => {
    const id = inventoryId || product?.id
    setItems((prev) => {
      const existing = prev.find((i) => i.inventoryId === id || i.id === id)
      if (existing) {
        return prev.map((i) =>
          i.inventoryId === id || i.id === id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [
        ...prev,
        {
          id: `local-${id}-${Date.now()}`,
          inventoryId: id,
          quantity,
          product: product || { id, name: 'Dive Item', price: 0 },
        },
      ]
    })

    try {
      await cartService.addItem({ inventoryId: id, quantity })
    } catch {
      /* optimistic local add */
    }
  }, [])

  const removeItem = useCallback(async (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId && i.inventoryId !== itemId))
    try {
      await cartService.removeItem(itemId)
    } catch {
      /* optimistic */
    }
  }, [])

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) => (i.id === itemId || i.inventoryId === itemId ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + (i.quantity || 0), 0),
    [items]
  )

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const price = i.product?.price ?? i.price ?? 0
        return sum + price * (i.quantity || 0)
      }, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      loading,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refresh,
    }),
    [items, loading, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, refresh]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
