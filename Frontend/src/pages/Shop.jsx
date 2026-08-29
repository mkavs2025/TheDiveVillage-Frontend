import { useState, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { SHOP_PRODUCTS } from '../utils/products'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'
import Button from '../components/Button'
import picture3 from '../assets/Picture3.png'

const CATEGORIES = [
  { key: 'all', label: 'All Merchandise' },
  { key: 'Tops', label: 'Tops' },
  { key: 'Swimwear', label: 'Swimwear' },
  { key: 'Bottoms', label: 'Bottoms' },
  { key: 'Accessories', label: 'Accessories & Bags' },
]

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [addedToast, setAddedToast] = useState(null)
  const { addItem } = useCart()

  const handleQuickAdd = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      inventoryId: product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: product.image,
        selectedSize: product.sizes?.[0] || 'M',
        selectedColor: product.colors?.[0]?.name || 'Standard',
      },
    })
    setAddedToast(product.title)
    setTimeout(() => setAddedToast(null), 3000)
  }

  const filteredProducts = useMemo(() => {
    let list = [...SHOP_PRODUCTS]

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory || p.tag === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 5) - (a.rating || 5))
    }

    return list
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-navy font-body pt-24 sm:pt-32 pb-24" style={{ textShadow: 'none' }}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 z-50 rounded-2xl bg-navy text-white px-6 py-4 shadow-float flex items-center gap-3 border border-white/20"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs">
              ✓
            </span>
            <div>
              <p className="text-xs text-white/70">Added to Bag</p>
              <p className="text-sm font-bold">{addedToast}</p>
            </div>
            <Link to="/cart" className="ml-3 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-navy hover:bg-white transition">
              View Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-[40px] overflow-hidden bg-navy text-white shadow-lift border border-white/10 flex flex-col justify-center min-h-[340px]">
          <img
            src={picture3}
            alt="Merchandise"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="relative z-10 p-8 sm:p-16 max-w-xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3">
              Merchandise
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Gear up with The Dive Village.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STORE CONTROLS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-card border border-navy/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search rash guards, suits, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-navy/15 bg-[#FAFAFA] pl-12 pr-4 py-3 text-sm focus:border-navy focus:bg-white focus:outline-none transition shadow-inner"
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-3.5 text-xs text-navy/40 hover:text-navy">✕</button>}
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-navy/60 uppercase tracking-wider whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-navy/15 bg-[#FAFAFA] px-4 py-2.5 text-xs sm:text-sm font-bold text-navy focus:border-navy focus:bg-white focus:outline-none transition cursor-pointer"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-2 mt-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.key
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-white text-navy/70 border border-navy/10 hover:bg-navy/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT LISTINGS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center text-xs font-bold text-navy/60">
          <span>Showing {filteredProducts.length} product{filteredProducts.length !== 1 && 's'}</span>
          {selectedCategory !== 'all' && (
            <button onClick={() => { setSelectedCategory('all'); setSearchQuery('') }} className="text-accent hover:underline">Clear filters</button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-navy/5 my-8">
            <h3 className="font-heading text-2xl font-bold mb-2">No products matched.</h3>
            <Button onClick={() => { setSelectedCategory('all'); setSearchQuery('') }} className="bg-navy text-white">Reset Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCardItem key={product.id} product={product} onQuickAdd={handleQuickAdd} />
            ))}
          </div>
        )}
      </section>

      {/* 5. STORE ASSURANCES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[40px] bg-white border border-navy/5 p-8 sm:p-14 shadow-card grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl mb-3">🔄</span>
            <h4 className="font-heading text-lg font-bold text-navy">15-Day Free Returns</h4>
            <p className="text-xs text-navy/70 mt-1">Hassle-free size exchange and easy returns if the fit isn't 100% perfect.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl mb-3">🔒</span>
            <h4 className="font-heading text-lg font-bold text-navy">256-Bit SSL Checkout</h4>
            <p className="text-xs text-navy/70 mt-1">Secure payment processing via Stripe, UPI, Cards, and Net Banking.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl mb-3">🤿</span>
            <h4 className="font-heading text-lg font-bold text-navy">Ocean Tested</h4>
            <p className="text-xs text-navy/70 mt-1">Every suit and rash guard is tested by our divemasters in open sea.</p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-navy text-white p-10 sm:p-16 relative overflow-hidden shadow-lift">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">Wear the Ocean.</h2>
            <p className="text-sm sm:text-base text-white/80 mb-8 leading-relaxed">
              5% of all merchandise profits are donated to coral reef restoration programs.
            </p>
            <Button as={Link} to="/cart" className="bg-accent text-navy hover:bg-white border-none">View Cart →</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductCardItem({ product, onQuickAdd }) {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      onClick={() => navigate(`/shop/${product.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group rounded-[32px] bg-white border border-navy/5 p-6 shadow-card hover:shadow-float transition duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="relative mb-5">
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F0F2F5] flex items-center justify-center p-4 relative">
            <img
              src={product.image}
              alt={product.title}
              className={`max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105 ${
                isHovered && product.video ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {product.video && (
              <video
                ref={videoRef}
                src={product.video}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            )}
          </div>
          {product.tag && (
            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-navy rounded-full shadow-sm z-10">
              {product.tag}
            </span>
          )}
          <span className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold rounded-full z-10">● In Stock</span>
        </div>

        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-1">{product.category}</span>
          <h3 className="font-heading text-xl font-bold text-navy leading-snug group-hover:text-accent transition">{product.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-1.5">
            <span>★ {product.rating || '4.9'}</span>
            <span className="text-navy/40 font-normal">({product.reviewCount || 120} reviews)</span>
          </div>
          <p className="text-xs text-navy/70 line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
          <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-navy/50 text-[10px] uppercase font-bold mr-1">Colors:</span>
              {product.colors?.slice(0, 4).map((c, idx) => (
                <span key={idx} className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
            <div className="text-navy/60 font-semibold text-[11px]">
              Sizes: {product.sizes?.slice(0, 3).join(', ')}{product.sizes?.length > 3 ? '+' : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-navy/10 flex items-center justify-between gap-3">
        <span className="text-[10px] text-emerald-600 font-bold">Inquire within</span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#F0F2F5] px-3.5 py-2.5 text-xs font-bold text-navy group-hover:bg-navy/10 transition">Details</span>
          <button onClick={(e) => onQuickAdd(product, e)} className="rounded-full bg-navy text-white px-4 py-2.5 text-xs font-bold hover:bg-accent transition shadow-sm flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
