import { useCallback, useEffect, useMemo, useState } from 'react'
import { cartService } from '../services/cartService'
import { CartContext } from './CartContext'
import { useAuth } from '../hooks/useAuth'

function getCartStorageKey(user) {
  if (user?.uid) return `tdv_cart_user_${user.uid}`
  if (user?.email) return `tdv_cart_user_${user.email}`
  return 'tdv_cart_v1'
}

function loadLocalCart(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const storageKey = useMemo(() => getCartStorageKey(user), [user])
  const [items, setItems] = useState(() => {
    const userCart = loadLocalCart(getCartStorageKey(user))
    if (user && userCart.length === 0) {
      // If logging in and user cart is empty, merge any guest cart items
      const guestCart = loadLocalCart('tdv_cart_v1')
      if (guestCart.length > 0) return guestCart
    }
    return userCart
  })
  const [loading, setLoading] = useState(false)

  // Sync state when storageKey/user changes
  useEffect(() => {
    const loaded = loadLocalCart(storageKey)
    if (loaded.length > 0) {
      setItems(loaded)
    } else if (user) {
      const guestCart = loadLocalCart('tdv_cart_v1')
      if (guestCart.length > 0) {
        setItems(guestCart)
      }
    }
  }, [storageKey, user])

  // Save cart to local storage whenever items or storageKey change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
    if (user) {
      localStorage.setItem('tdv_cart_v1', JSON.stringify(items))
    }
  }, [items, storageKey, user])

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await cartService.get()
      if (Array.isArray(data?.items) && data.items.length > 0) {
        setItems(data.items)
      }
    } catch {
      /* keep local cart when API offline */
    } finally {
      setLoading(false)
    }
  }, [])

  const addItem = useCallback(async (arg1, qtyParam, colorParam, sizeParam) => {
    let inventoryId, quantity, rawProduct, selectedColor, selectedSize

    if (arg1 && typeof arg1 === 'object' && ('product' in arg1 || 'inventoryId' in arg1)) {
      inventoryId = arg1.inventoryId
      quantity = typeof arg1.quantity === 'number' ? arg1.quantity : 1
      rawProduct = arg1.product || arg1
      selectedColor = arg1.product?.selectedColor || arg1.selectedColor
      selectedSize = arg1.product?.selectedSize || arg1.selectedSize
    } else if (arg1 && typeof arg1 === 'object') {
      rawProduct = arg1
      quantity = typeof qtyParam === 'number' ? qtyParam : 1
      selectedColor = colorParam || arg1.colors?.[0]?.name || 'Standard'
      selectedSize = sizeParam || arg1.sizes?.[0] || 'Standard'
      inventoryId = `${arg1.id}-${selectedSize}-${selectedColor}`
    } else {
      return
    }

    const id = inventoryId || `${rawProduct.id || 'item'}-${Date.now()}`
    const name = rawProduct.title || rawProduct.name || 'Dive Gear'
    const price = typeof rawProduct.price === 'number' ? rawProduct.price : (rawProduct.product?.price || 0)
    const image = rawProduct.image || (rawProduct.images && rawProduct.images[0]) || ''

    const cleanProduct = {
      ...rawProduct,
      id: rawProduct.id || id,
      name,
      title: name,
      price,
      image,
      selectedColor: selectedColor || rawProduct.selectedColor || 'Standard',
      selectedSize: selectedSize || rawProduct.selectedSize || 'Standard',
    }

    setItems((prev) => {
      const existing = prev.find((i) => i.inventoryId === id || i.id === id)
      if (existing) {
        return prev.map((i) =>
          i.inventoryId === id || i.id === id
            ? { ...i, quantity: i.quantity + quantity, product: cleanProduct }
            : i
        )
      }
      return [
        ...prev,
        {
          id: `local-${id}-${Date.now()}`,
          inventoryId: id,
          quantity,
          product: cleanProduct,
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
