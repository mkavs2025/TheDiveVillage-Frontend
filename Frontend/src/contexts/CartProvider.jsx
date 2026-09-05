import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cartService } from '../services/cartService'
import { CartContext } from './CartContext'
import { useAuth } from '../hooks/useAuth'

function getCartStorageKey(user) {
  if (user?.uid) return `tdv_cart_user_${user.uid}`
  return null
}

function loadLocalCart(storageKey) {
  if (!storageKey) return []
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
  const [items, setItems] = useState(() => (storageKey ? loadLocalCart(storageKey) : []))
  const [loading, setLoading] = useState(false)
  const activeUserUidRef = useRef(user?.uid || null)

  // Sync state and load authoritative backend cart when user changes
  useEffect(() => {
    activeUserUidRef.current = user?.uid || null

    if (!user?.uid) {
      setItems([])
      return
    }

    // 1. Initial optimistic load from user-isolated cache
    const cached = loadLocalCart(storageKey)
    setItems(cached)

    // 2. Fetch authoritative cart from backend for this user
    let isCancelled = false
    setLoading(true)

    cartService
      .get()
      .then((res) => {
        if (isCancelled || activeUserUidRef.current !== user.uid) return
        const backendItems = res?.data?.data?.cart?.items || res?.data?.cart?.items
        if (Array.isArray(backendItems)) {
          setItems(backendItems)
          if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(backendItems))
          }
        }
      })
      .catch(() => {
        /* Keep cached user items on network error */
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [user?.uid, storageKey])

  // Save current items to user-specific cache
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(items))
    }
  }, [items, storageKey])

  const refresh = useCallback(async () => {
    if (!user?.uid) {
      setItems([])
      return
    }
    setLoading(true)
    try {
      const res = await cartService.get()
      const backendItems = res?.data?.data?.cart?.items || res?.data?.cart?.items
      if (Array.isArray(backendItems)) {
        setItems(backendItems)
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(backendItems))
        }
      }
    } catch {
      /* Keep existing state on error */
    } finally {
      setLoading(false)
    }
  }, [user?.uid, storageKey])

  const addItem = useCallback(
    async (arg1, qtyParam, colorParam, sizeParam) => {
      let inventoryId, quantity, rawProduct, selectedColor, selectedSize

      if (arg1 && typeof arg1 === 'object' && ('product' in arg1 || 'inventoryId' in arg1)) {
        inventoryId = arg1.inventoryId
        quantity = typeof arg1.quantity === 'number' ? arg1.quantity : 1
        rawProduct = arg1.product || arg1
        selectedColor = arg1.product?.selectedColor || arg1.selectedColor || 'Standard'
        selectedSize = arg1.product?.selectedSize || arg1.selectedSize || 'Standard'
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
      const price = typeof rawProduct.price === 'number' ? rawProduct.price : parseFloat(rawProduct.price || 0)
      const image = rawProduct.image || (rawProduct.images && rawProduct.images[0]) || ''

      const cleanProduct = {
        ...rawProduct,
        id: rawProduct.id || id,
        name,
        title: name,
        price,
        image,
        selectedColor,
        selectedSize,
      }

      // Optimistic update
      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.inventoryId === id || i.id === id || i.product?.id === cleanProduct.id)
        if (existingIndex > -1) {
          const updated = [...prev]
          const cur = updated[existingIndex]
          updated[existingIndex] = {
            ...cur,
            quantity: cur.quantity + quantity,
            product: cleanProduct,
            subtotal: price * (cur.quantity + quantity),
          }
          return updated
        }
        return [
          ...prev,
          {
            id: `temp-${id}-${Date.now()}`,
            inventoryId: id,
            quantity,
            price,
            subtotal: price * quantity,
            product: cleanProduct,
          },
        ]
      })

      // Backend sync
      if (user?.uid) {
        try {
          const res = await cartService.addItem({
            inventoryId: id,
            quantity,
            product: cleanProduct,
            productSnapshot: {
              title: name,
              sku: cleanProduct.id || id,
              price,
              image,
              selectedSize,
              selectedColor,
              category: cleanProduct.category || 'Gear',
            },
          })
          const backendItems = res?.data?.data?.cart?.items || res?.data?.cart?.items
          if (Array.isArray(backendItems) && activeUserUidRef.current === user.uid) {
            setItems(backendItems)
          }
        } catch {
          /* optimistic fallback retained */
        }
      }
    },
    [user?.uid]
  )

  const removeItem = useCallback(
    async (itemId) => {
      setItems((prev) => prev.filter((i) => i.id !== itemId && i.inventoryId !== itemId))
      if (user?.uid) {
        try {
          const res = await cartService.removeItem(itemId)
          const backendItems = res?.data?.data?.cart?.items || res?.data?.cart?.items
          if (Array.isArray(backendItems) && activeUserUidRef.current === user.uid) {
            setItems(backendItems)
          }
        } catch {
          /* optimistic */
        }
      }
    },
    [user?.uid]
  )

  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      const validQty = Math.max(1, parseInt(quantity, 10) || 1)
      setItems((prev) =>
        prev.map((i) =>
          i.id === itemId || i.inventoryId === itemId
            ? { ...i, quantity: validQty, subtotal: (i.price || i.product?.price || 0) * validQty }
            : i
        )
      )

      if (user?.uid) {
        try {
          const res = await cartService.updateQuantity(itemId, validQty)
          const backendItems = res?.data?.data?.cart?.items || res?.data?.cart?.items
          if (Array.isArray(backendItems) && activeUserUidRef.current === user.uid) {
            setItems(backendItems)
          }
        } catch {
          /* optimistic */
        }
      }
    },
    [user?.uid]
  )

  const clearCart = useCallback(async () => {
    setItems([])
    if (user?.uid) {
      try {
        await cartService.clear()
      } catch {
        /* optimistic */
      }
    }
  }, [user?.uid])

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

