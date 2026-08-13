import { useCallback, useEffect, useMemo, useState } from 'react'
import { WishlistContext } from './WishlistContext'

function loadWishlist() {
  try {
    const raw = localStorage.getItem('tdv_wishlist_v1')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => loadWishlist())

  useEffect(() => {
    localStorage.setItem('tdv_wishlist_v1', JSON.stringify(items))
  }, [items])

  const toggle = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id)
      if (exists) return prev.filter((i) => i.id !== product.id)
      return [...prev, product]
    })
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const isWishlisted = useCallback(
    (id) => items.some((i) => i.id === id),
    [items]
  )

  const value = useMemo(
    () => ({ items, toggle, remove, isWishlisted, count: items.length }),
    [items, toggle, remove, isWishlisted]
  )

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}
