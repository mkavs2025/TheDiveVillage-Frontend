import { useParams, Link } from 'react-router'
import { useState } from 'react'
import { SHOP_PRODUCTS } from '../utils/products'

export default function ProductDetail() {
  const { id } = useParams()
  const product = SHOP_PRODUCTS.find(p => p.id === id) || SHOP_PRODUCTS[0]
  
  const [activeImage, setActiveImage] = useState(product.image)
  const [activeTab, setActiveTab] = useState('Details')
  const [selectedSize, setSelectedSize] = useState('M')

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-navy pt-24 pb-20 font-body" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left: Images */}
          <div className="flex gap-4 flex-col-reverse sm:flex-row">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-visible">
              {[product.image, product.image, product.image].map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 ${activeImage === img && i === 0 ? 'border-navy' : 'border-transparent hover:border-navy/30'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover bg-[#F0F2F5]" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 rounded-2xl overflow-hidden bg-[#F0F2F5] aspect-[3/4]">
              <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            {product.tag && (
              <span className="inline-block bg-[#F0F2F5] text-navy px-3 py-1 text-xs font-bold rounded-full w-max mb-4">
                {product.tag}
              </span>
            )}
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4 text-balance">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-navy">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <span className="text-sm text-navy/60">4.8 (128 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold">{product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-navy/50 line-through mb-1">{product.oldPrice}</span>
                  <span className="bg-navy text-white text-xs font-bold px-2 py-1 rounded mb-1">SALE</span>
                </>
              )}
            </div>

            <p className="text-navy/80 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="text-sm font-bold mb-3">Color: <span className="font-normal text-navy/70">Ocean Blue</span></p>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-navy ring-2 ring-offset-2 ring-navy"></button>
                <button className="w-8 h-8 rounded-full bg-gray-300 hover:ring-2 ring-offset-2 ring-gray-300 transition"></button>
                <button className="w-8 h-8 rounded-full bg-[#f4a261] hover:ring-2 ring-offset-2 ring-[#f4a261] transition"></button>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold">Size: <span className="font-normal text-navy/70">{selectedSize}</span></p>
                <button className="text-xs text-navy/60 underline hover:text-navy">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-bold border rounded-xl transition ${selectedSize === size ? 'border-black bg-black text-white' : 'border-navy/20 hover:border-navy bg-white'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button className="flex-1 bg-black hover:bg-black/80 text-white font-bold py-4 rounded-full transition flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
                Add to Cart
              </button>
              <button className="w-14 h-14 flex items-center justify-center bg-white border border-navy/20 rounded-full hover:bg-slate-50 transition text-navy shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path></svg>
              </button>
            </div>

            <div className="flex justify-between items-center text-xs text-navy/70 border-t border-navy/10 pt-6">
              <div className="flex items-center gap-2">
                <span className="font-bold">🚚 Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">🔄 Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">🔒 Secure</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs and Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-start">
          <div>
            <div className="flex border-b border-navy/10 mb-8 overflow-x-auto">
              {['Details', 'Materials', 'Size & Fit', 'Shipping & Returns'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition border-b-2 ${activeTab === tab ? 'border-navy text-navy' : 'border-transparent text-navy/50 hover:text-navy'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-navy/80 text-sm leading-relaxed space-y-4">
              <p>
                Crafted from high-quality heavyweight materials, this item delivers unmatched comfort and durability. The optimized fit and minimal design make it a versatile staple for any wardrobe.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3"><span className="text-cta">✔</span> Technical fit</li>
                <li className="flex items-center gap-3"><span className="text-cta">✔</span> Soft & heavyweight fabric</li>
                <li className="flex items-center gap-3"><span className="text-cta">✔</span> Reinforced stitching</li>
                <li className="flex items-center gap-3"><span className="text-cta">✔</span> Quick-drying</li>
                <li className="flex items-center gap-3"><span className="text-cta">✔</span> Unisex style</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-[#F0F2F5]">
            <img src={product.image} alt="Detail" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* You May Also Like */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl font-bold">You May Also Like</h2>
            <Link to="/shop" className="text-sm font-bold hover:text-cta transition flex items-center gap-1">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {SHOP_PRODUCTS.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="group relative">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F0F2F5] transition duration-300 group-hover:shadow-soft">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                  {p.tag && (
                    <span className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-bold shadow-sm rounded-sm">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm">{p.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
