import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { SHOP_PRODUCTS } from '../utils/products'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'
import Button from '../components/Button'

const CATEGORIES = [
  { key: 'all', label: 'All Merchandise' },
  { key: 'Branded Merch', label: 'Branded Merch' },
  { key: 'Wetsuits', label: 'Wetsuits' },
  { key: 'Rash Guards', label: 'Rash Guards' },
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
      list = list.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    return list
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-navy font-body pt-20 sm:pt-28 pb-24 overflow-x-hidden" style={{ textShadow: 'none' }}>
      
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
              <p className="text-xs text-white/70">Added to your cart</p>
              <p className="text-sm font-bold">{addedToast}</p>
            </div>
            <Link to="/cart" className="ml-3 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-navy hover:bg-white transition">
              View Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO BANNER */}
      <section className="relative w-full bg-gradient-to-b from-[#E5F1F6] to-[#FAFAFA] px-4 py-16 sm:py-24 lg:px-8 text-center flex flex-col items-center border-b border-navy/5">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block bg-black/5 rounded-full px-4 py-1.5 text-xs font-bold text-navy/70 uppercase tracking-widest mb-4">
            Official Merchandise & Pro Gear
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-navy text-balance mb-4 leading-tight">
            The Dive Village Store
          </h1>
          <p className="text-base sm:text-xl text-navy/70 mb-8 italic font-heading max-w-xl mx-auto">
            Thoughtfully crafted ocean apparel, pro-grade wetsuits, UPF 50+ rash guards, and branded essentials tested in real island waters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-navy/60">
            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
              🚚 Free Shipping ₹1,999+
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
              ♻️ GOTS Organic & Recycled
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
              🔄 15-Day Easy Exchanges
            </span>
          </div>
        </div>
      </section>

      {/* 2. FEATURES MARQUEE */}
      <section className="bg-navy text-white py-3.5 w-full overflow-hidden flex">
        <div className="flex animate-marquee min-w-max">
          <div className="flex items-center gap-12 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase">
            <span>🌊 Premium Limestone Neoprene</span>
            <span>☀️ UPF 50+ Sun Protection</span>
            <span>👕 GOTS Certified Organic Cotton</span>
            <span>🧵 4-Way Hyper-Stretch</span>
            <span>🤿 Ocean Tested in Lakshadweep & Andamans</span>
            <span>🔒 100% Genuine Branded Gear</span>
          </div>
          <div className="flex items-center gap-12 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase">
            <span>🌊 Premium Limestone Neoprene</span>
            <span>☀️ UPF 50+ Sun Protection</span>
            <span>👕 GOTS Certified Organic Cotton</span>
            <span>🧵 4-Way Hyper-Stretch</span>
            <span>🤿 Ocean Tested in Lakshadweep & Andamans</span>
            <span>🔒 100% Genuine Branded Gear</span>
          </div>
        </div>
      </section>

      {/* 3. STORE CONTROLS (SEARCH, FILTER & SORT) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search gear, hoodies, rash guards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-white border border-navy/10 pl-11 pr-4 py-3 text-sm text-navy outline-none focus:ring-2 focus:ring-accent/50 shadow-soft"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-bold text-navy/60 uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-2xl bg-white border border-navy/10 px-4 py-3 text-xs sm:text-sm font-bold text-navy outline-none shadow-soft"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none">
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
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery('') }}
              className="text-accent hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-navy/5 my-8">
            <h3 className="font-heading text-2xl font-bold mb-2">No products matched your search.</h3>
            <p className="text-navy/60 text-sm mb-6">Try adjusting your filters or search keywords.</p>
            <Button onClick={() => { setSelectedCategory('all'); setSearchQuery('') }} className="bg-navy text-white">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-[32px] bg-white border border-navy/5 p-6 shadow-card hover:shadow-float transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="relative mb-5">
                    <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F0F2F5] flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-navy rounded-full shadow-sm">
                        {product.tag}
                      </span>
                    )}

                    <span className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold rounded-full">
                      ● In Stock
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-1">
                      {product.category}
                    </span>
                    <Link to={`/shop/${product.id}`} className="block">
                      <h3 className="font-heading text-xl font-bold text-navy leading-snug group-hover:text-accent transition">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-1.5">
                      <span>★ {product.rating || '4.9'}</span>
                      <span className="text-navy/40 font-normal">({product.reviewCount || 120} reviews)</span>
                    </div>

                    <p className="text-xs text-navy/70 line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Available Colors and Sizes */}
                    <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-between text-xs">
                      {/* Color swatches */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-navy/50 text-[10px] uppercase font-bold mr-1">Colors:</span>
                        {product.colors?.slice(0, 4).map((c, idx) => (
                          <span
                            key={idx}
                            title={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>

                      {/* Sizes indicator */}
                      <div className="text-navy/60 font-semibold text-[11px]">
                        Sizes: {product.sizes?.slice(0, 3).join(', ')}{product.sizes?.length > 3 ? '+' : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-4 border-t border-navy/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-emerald-600 font-bold block">Inquire within</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/shop/${product.id}`}
                      className="rounded-full bg-[#F0F2F5] px-3.5 py-2.5 text-xs font-bold text-navy hover:bg-navy/10 transition"
                    >
                      Details
                    </Link>
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="rounded-full bg-navy text-white px-4 py-2.5 text-xs font-bold hover:bg-accent transition shadow-sm flex items-center gap-1.5"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. STORE GUARANTEES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[40px] bg-white border border-navy/5 p-8 sm:p-14 shadow-card grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl mb-3">🚚</span>
            <h4 className="font-heading text-lg font-bold text-navy">Free Express Delivery</h4>
            <p className="text-xs text-navy/70 mt-1">Complimentary shipping across India on all orders over ₹1,999.</p>
          </div>
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
            <p className="text-xs text-navy/70 mt-1">Every wetsuit and rash guard is tested by our divemasters in open sea.</p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-navy text-white p-10 sm:p-16 relative overflow-hidden shadow-lift">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-accent uppercase tracking-widest mb-4">
              Community Gear
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Wear the Ocean. Support Coral Conservation.
            </h2>
            <p className="text-sm sm:text-base text-white/80 mb-8 leading-relaxed">
              5% of all merchandise store profits are directly donated to coral reef restoration programs and marine clean-up dives in the Lakshadweep archipelago.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as={Link} to="/contact" variant="secondary" className="!border-white/30 !text-white hover:!bg-white/10">
                Bulk / Custom Merch Inquiries
              </Button>
              <Button as={Link} to="/cart" className="bg-accent text-navy hover:bg-white hover:text-navy border-none">
                View Shopping Cart →
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
