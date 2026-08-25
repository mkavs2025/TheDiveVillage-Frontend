import { useParams, Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SHOP_PRODUCTS } from '../utils/products'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'
import Button from '../components/Button'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = SHOP_PRODUCTS.find((p) => p.id === id) || SHOP_PRODUCTS[0]

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]

  const [activeImage, setActiveImage] = useState(productImages[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Ocean Navy', hex: '#003865' })
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [toastMessage, setToastMessage] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (product.images && product.images.length > 0) {
      setActiveImage(product.images[0])
    } else {
      setActiveImage(product.image)
    }
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
        image: activeImage || product.image,
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
        image: activeImage || product.image,
        selectedSize,
        selectedColor: selectedColor.name,
      },
    })
    navigate('/checkout')
  }

  const relatedProducts = SHOP_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-navy pt-24 sm:pt-32 pb-24 font-body" style={{ textShadow: 'none' }}>
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
          
          {/* Left Column: Multi-Image Showcase */}
          <div className="lg:col-span-7 flex gap-4 flex-col-reverse sm:flex-row">
            {/* Thumbnail Selectors */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-20 h-24 rounded-2xl overflow-hidden border-2 transition ${
                    activeImage === img ? 'border-navy shadow-md ring-2 ring-navy/20' : 'border-transparent hover:border-navy/30 bg-[#F0F2F5]'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover bg-white" />
                </button>
              ))}
            </div>

            {/* Large Active Image */}
            <div className="flex-1 rounded-[32px] overflow-hidden bg-white border border-navy/5 aspect-[4/5] relative shadow-card group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-contain p-6 transition duration-500 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-navy rounded-full shadow-sm">
                  {product.tag}
                </span>
              )}
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
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy leading-tight mb-3 text-balance">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5 text-sm">
              <div className="flex text-amber-500">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="font-bold text-navy">{product.rating || '4.9'}</span>
              <span className="text-navy/50">({product.reviewCount || 140} verified buyer reviews)</span>
            </div>

            {/* Product Description */}
            <p className="text-navy/80 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* 1. Color Variant Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6 pt-4 border-t border-navy/10">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy/70">
                    Available Colour: <span className="font-extrabold text-navy normal-case text-sm ml-1">{selectedColor.name}</span>
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
                    Select Size: <span className="font-extrabold text-navy normal-case text-sm ml-1">{selectedSize}</span>
                  </p>
                  <button onClick={() => setActiveTab('sizeGuide')} className="text-xs font-bold text-accent hover:underline">
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
                  ✓ {product.stockStatus || 'In Stock & Ready to Dispatch'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-navy hover:bg-accent text-white font-bold py-4 px-6 rounded-full transition shadow-md flex items-center justify-center gap-2 text-sm"
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
                className="flex-1 bg-accent hover:bg-white hover:text-navy text-navy font-bold py-4 px-6 rounded-full transition border border-accent shadow-md flex items-center justify-center gap-2 text-sm"
              >
                Buy Now ⚡
              </button>
            </div>

            {/* Shipping & Assurance Details Box */}
            <div className="rounded-2xl bg-[#F0F2F5] p-5 space-y-3 text-xs text-navy/80">
              <div className="flex items-start gap-3">
                <span className="text-base">🚚</span>
                <div>
                  <span className="font-bold text-navy block">Delivery Details</span>
                  <span>Delivery date and time will be confirmed through whatsapp.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-navy/10">
                <span className="text-base">🔄</span>
                <div>
                  <span className="font-bold text-navy block">Easy 15-Day Exchange</span>
                  <span>Need another size? Return or swap within 15 days of delivery.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-navy/10">
                <span className="text-base">🛡️</span>
                <div>
                  <span className="font-bold text-navy block">100% Genuine Branded Merchandise</span>
                  <span>Directly made and tested by The Dive Village team.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Specifications and Details */}
        <div className="rounded-[40px] bg-white border border-navy/5 p-8 sm:p-14 shadow-card mb-20">
          <div className="flex border-b border-navy/10 mb-8 overflow-x-auto scrollbar-none gap-2">
            {[
              { key: 'details', label: 'Product Features' },
              { key: 'materials', label: 'Materials & Care' },
              { key: 'sizeGuide', label: 'Size Guide & Fit' },
              { key: 'shipping', label: 'Shipping & Returns' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 px-6 font-heading font-bold text-sm whitespace-nowrap transition border-b-2 ${
                  activeTab === tab.key
                    ? 'border-navy text-navy font-extrabold'
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

          {activeTab === 'materials' && (
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-heading text-2xl font-bold text-navy">Sustainable Fabric & Construction</h3>
              <p className="text-navy/80 text-sm leading-relaxed">
                <strong>Material Composition:</strong> {product.materials || 'High-grade technical fabrics engineered for saltwater durability and ultraviolet protection.'}
              </p>
              <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-navy/5 space-y-2 text-xs text-navy/75 mt-4">
                <p><strong>Care Instructions:</strong></p>
                <p>• Rinse with fresh cold water after each dive or surf session.</p>
                <p>• Hang dry in shade. Avoid direct prolonged sunlight exposure when drying.</p>
                <p>• Do not machine wash with harsh detergents or bleach.</p>
                <p>• Store flat or on wide-shoulder wetsuit hangers.</p>
              </div>
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

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-2xl text-sm text-navy/80 leading-relaxed">
              <h3 className="font-heading text-2xl font-bold text-navy">Delivery & Return Guidelines</h3>
              <p>• <strong>Delivery:</strong> Delivery date and time will be confirmed through whatsapp.</p>
              <p>• <strong>Island Delivery:</strong> We ship directly to island hubs in Lakshadweep and Andaman & Nicobar.</p>
              <p>• <strong>15-Day Exchange:</strong> If sizing does not fit perfectly, initiate an exchange request with free reverse pickup.</p>
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
                  <span className="font-heading font-extrabold text-navy text-base">
                    
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
