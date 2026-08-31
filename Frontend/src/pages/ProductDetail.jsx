import { useParams, Link, useNavigate } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SHOP_PRODUCTS } from '../utils/products'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { formatCurrency } from '../utils/formatCurrency'
import Button from '../components/Button'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { toggle: toggleWishlist, isWishlisted } = useWishlist()
  const sizeChartRef = useRef(null)

  const product = SHOP_PRODUCTS.find((p) => p.id === id) || SHOP_PRODUCTS[0]
  const relatedProducts = SHOP_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  const mediaItems = []
  if (product.images && product.images.length > 0) {
    product.images.forEach((img, idx) => {
      mediaItems.push({ type: 'image', src: img, id: `img-${idx}` })
    })
  } else if (product.image) {
    mediaItems.push({ type: 'image', src: product.image, id: 'img-0' })
  }
  if (product.video) {
    mediaItems.push({ type: 'video', src: product.video, id: 'video-0' })
  }

  const [activeMedia, setActiveMedia] = useState(mediaItems[0] || null)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Black', hex: '#000000' })
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [toastMessage, setToastMessage] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const initialItems = []
    if (product.images && product.images.length > 0) {
      product.images.forEach((img, idx) => initialItems.push({ type: 'image', src: img, id: `img-${idx}` }))
    } else if (product.image) {
      initialItems.push({ type: 'image', src: product.image, id: 'img-0' })
    }
    if (product.video) {
      initialItems.push({ type: 'video', src: product.video, id: 'video-0' })
    }
    setActiveMedia(initialItems[0] || null)
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0])
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0])
    }
    setQuantity(1)
  }, [id, product])

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      inventoryId: `${product.id}-${selectedSize}-${selectedColor.name}`,
      quantity,
      product: {
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: activeMedia?.type === 'image' ? activeMedia.src : product.image,
        selectedSize,
        selectedColor: selectedColor.name,
      },
    })

    setToastMessage(`Added ${quantity}x ${product.title} (${selectedSize} / ${selectedColor.name}) to cart`)
    setTimeout(() => {
      setIsAdding(false)
      setToastMessage(null)
    }, 3500)
  }

  const handleBuyNow = () => {
    addItem({
      inventoryId: `${product.id}-${selectedSize}-${selectedColor.name}`,
      quantity,
      product: {
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: activeMedia?.type === 'image' ? activeMedia.src : product.image,
        selectedSize,
        selectedColor: selectedColor.name,
      },
    })
    navigate('/checkout')
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-navy mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-accent hover:underline font-bold">
          ← Back to Merchandise Store
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-navy font-body pt-24 sm:pt-32 pb-24 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
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
                <p className="text-xs text-white/70">Cart Updated</p>
                <p className="text-sm font-bold">{toastMessage}</p>
              </div>
              <Link to="/cart" className="ml-3 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-navy hover:bg-white transition">
                View Cart
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold text-navy/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-navy transition">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-navy transition">Merchandise Store</Link>
          <span>/</span>
          <span className="text-accent">{product.category}</span>
          <span>/</span>
          <span className="text-navy truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Product Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Integrated Multi-Media Showcase (Photos + Video) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex gap-4 flex-col-reverse sm:flex-row">
              {/* Thumbnail Selectors */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
                {mediaItems.map((item, i) => (
                  <button
                    key={item.id || i}
                    onClick={() => setActiveMedia(item)}
                    className={`flex-shrink-0 w-20 h-24 rounded-2xl overflow-hidden border-2 transition relative ${
                      activeMedia?.src === item.src
                        ? 'border-navy shadow-md ring-2 ring-navy/20'
                        : 'border-transparent hover:border-navy/30 bg-[#F0F2F5]'
                    }`}
                  >
                    {item.type === 'image' ? (
                      <img src={item.src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover bg-white" />
                    ) : (
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video src={item.src} className="w-full h-full object-cover opacity-70 pointer-events-none" muted />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="w-7 h-7 rounded-full bg-accent text-navy flex items-center justify-center text-xs font-bold shadow-sm">
                            ▶
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Main Product Card Media Display (Fits Box Size) */}
              <div className="flex-1 rounded-[32px] overflow-hidden bg-white border border-navy/5 aspect-[4/5] relative shadow-card group">
                {activeMedia?.type === 'video' ? (
                  <video
                    src={activeMedia.src}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-[32px]"
                  />
                ) : (
                  <img
                    src={activeMedia?.src || product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-6 transition duration-500 group-hover:scale-105"
                  />
                )}
                {product.tag && (
                  <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-navy rounded-full shadow-sm z-10 pointer-events-none">
                    {product.tag}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Specifications & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category & Badge */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                {product.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-navy/30" />
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                ● {product.stockStatus || 'In Stock'}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy leading-tight mb-3 text-balance">
              {product.title}
            </h1>



            {/* Product Description */}
            <p className="text-navy/80 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* 1. Color Variant Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6 pt-4 border-t border-navy/10">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy/70">
                    Available Colour: <span className="font-bold text-navy normal-case text-sm ml-1">{selectedColor.name}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-9 h-9 rounded-full transition relative flex items-center justify-center ${
                        selectedColor.name === color.name
                          ? 'ring-2 ring-offset-2 ring-navy scale-110'
                          : 'opacity-85 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.name === color.name && (
                        <span className={`text-[10px] font-bold ${['#F9FAFB', '#F3F4F6', '#FFFFFF'].includes(color.hex) ? 'text-black' : 'text-white'}`}>
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Size Variant Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy/70">
                    Select Size: <span className="font-bold text-navy normal-case text-sm ml-1">{selectedSize}</span>
                  </p>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab('sizeGuide')
                      setTimeout(() => {
                        sizeChartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }, 50)
                    }} 
                    className="text-xs font-bold text-accent hover:underline cursor-pointer"
                  >
                    Size Guide & Chart 📐
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs sm:text-sm font-bold rounded-2xl transition border ${
                        selectedSize === size
                          ? 'border-navy bg-navy text-white shadow-sm'
                          : 'border-navy/15 hover:border-navy bg-white text-navy'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Quantity & Stock Availability */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center rounded-2xl border border-navy/20 bg-white p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-navy hover:bg-[#F0F2F5] transition text-base font-bold"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-navy">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-navy hover:bg-[#F0F2F5] transition text-base font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                  ✓ {product.stockStatus || 'In Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 w-full bg-navy hover:bg-accent text-white font-bold py-4 px-6 rounded-full transition shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 w-full bg-accent hover:bg-white hover:text-navy text-navy font-bold py-4 px-6 rounded-full transition border border-accent shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                Buy Now ⚡
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 shrink-0 rounded-full border transition flex items-center justify-center text-lg shadow-md cursor-pointer ${
                  isWishlisted(product.id)
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-navy/70 border-navy/20 hover:border-navy hover:text-navy'
                }`}
                title={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Wishlist"
              >
                {isWishlisted(product.id) ? '❤️' : '🤍'}
              </button>
            </div>

          </div>
        </div>

        {/* Tabbed Specifications and Details */}
        <div ref={sizeChartRef} className="rounded-[40px] bg-white border border-navy/5 p-8 sm:p-14 shadow-card mb-20">
          <div className="flex border-b border-navy/10 mb-8 overflow-x-auto scrollbar-none gap-2">
            {[
              { key: 'details', label: 'Product Features' },
              { key: 'sizeGuide', label: 'Size Guide & Fit' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 px-6 font-heading font-bold text-sm whitespace-nowrap transition border-b-2 ${
                  activeTab === tab.key
                    ? 'border-navy text-navy font-bold'
                    : 'border-transparent text-navy/50 hover:text-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold text-navy">Engineering & Design Highlights</h3>
              <p className="text-navy/80 text-sm leading-relaxed max-w-3xl">
                {product.description}
              </p>
              {product.features && (
                <ul className="grid sm:grid-cols-2 gap-4 mt-6">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-navy/85 bg-[#FAFAFA] p-4 rounded-2xl border border-navy/5">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'sizeGuide' && (
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold text-navy">Universal Sizing Chart (in inches)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#F0F2F5] text-navy font-bold">
                      <th className="p-3.5 rounded-l-xl">Size</th>
                      <th className="p-3.5">Chest / Bust (in)</th>
                      <th className="p-3.5">Waist (in)</th>
                      <th className="p-3.5">Height (cm)</th>
                      <th className="p-3.5 rounded-r-xl">Weight (kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/10 text-navy/80">
                    <tr><td className="p-3.5 font-bold">XS</td><td className="p-3.5">32 - 34</td><td className="p-3.5">26 - 28</td><td className="p-3.5">155 - 165</td><td className="p-3.5">48 - 58</td></tr>
                    <tr><td className="p-3.5 font-bold">S</td><td className="p-3.5">35 - 37</td><td className="p-3.5">28 - 30</td><td className="p-3.5">162 - 172</td><td className="p-3.5">55 - 68</td></tr>
                    <tr><td className="p-3.5 font-bold">M</td><td className="p-3.5">38 - 40</td><td className="p-3.5">31 - 33</td><td className="p-3.5">170 - 180</td><td className="p-3.5">65 - 78</td></tr>
                    <tr><td className="p-3.5 font-bold">L</td><td className="p-3.5">41 - 43</td><td className="p-3.5">34 - 36</td><td className="p-3.5">175 - 185</td><td className="p-3.5">75 - 88</td></tr>
                    <tr><td className="p-3.5 font-bold">XL</td><td className="p-3.5">44 - 46</td><td className="p-3.5">37 - 39</td><td className="p-3.5">180 - 192</td><td className="p-3.5">85 - 98</td></tr>
                    <tr><td className="p-3.5 font-bold">XXL</td><td className="p-3.5">47 - 50</td><td className="p-3.5">40 - 43</td><td className="p-3.5">185 - 198</td><td className="p-3.5">95 - 115</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* You May Also Like / Recommendations */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent block">Explore More</span>
              <h2 className="font-heading text-3xl font-bold text-navy">You May Also Like</h2>
            </div>
            <Link to="/shop" className="text-sm font-bold text-navy hover:text-accent transition flex items-center gap-1">
              View Entire Store →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/shop/${p.id}`}
                className="group rounded-3xl bg-white border border-navy/5 p-5 shadow-card hover:shadow-float transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F0F2F5] mb-4 flex items-center justify-center p-3 relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                    {p.tag && (
                      <span className="absolute top-3 left-3 bg-white/90 px-2.5 py-0.5 text-[10px] font-bold rounded-full text-navy shadow-sm">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent block mb-1">
                    {p.category}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-navy group-hover:text-accent transition line-clamp-2">
                    {p.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-navy/5 flex justify-between items-baseline">
                  <span className="font-heading font-bold text-navy text-base">
                    
                  </span>
                  <span className="text-xs font-bold text-accent group-hover:underline">
                    View Gear →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
