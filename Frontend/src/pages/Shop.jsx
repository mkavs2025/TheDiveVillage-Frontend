import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { SHOP_PRODUCTS } from '../utils/products'
import { IMAGES } from '../utils/images'
import InteractiveVideoSphere from '../components/InteractiveVideoSphere'
import Button from '../components/Button'

export default function Shop() {
  const featuredProducts = SHOP_PRODUCTS

  return (
    <div className="min-h-screen bg-white text-navy font-body pt-16 sm:pt-[72px]" style={{ textShadow: 'none' }}>
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#E5F1F6] px-4 py-20 sm:py-32 lg:px-8 text-center flex flex-col items-center overflow-hidden border-b border-navy/5">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy text-balance mb-4 leading-tight">
            Say hello to your new favorite diving buddy
          </h1>
          <p className="text-lg sm:text-xl text-navy/70 mb-8 italic font-heading">
            ...and goodbye to uncomfortable fits
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as={Link} to="#products" className="!bg-navy !text-white hover:!bg-navy/90 w-full sm:w-auto shadow-lift">
              Shop Gear →
            </Button>
            <Button as={Link} to="#collections" variant="ghost" className="!text-navy border-2 border-navy hover:!bg-navy/5 w-full sm:w-auto">
              View Collections →
            </Button>
          </div>
        </div>
        
        {/* Decorative floating images */}
        <img src={SHOP_PRODUCTS[0].image} alt="Gear" className="absolute top-10 left-[-10%] sm:left-[5%] w-48 lg:w-72 -rotate-12 mix-blend-multiply opacity-80" />
        <img src={SHOP_PRODUCTS[1].image} alt="Gear" className="absolute bottom-[-10%] right-[-5%] sm:right-[10%] w-56 lg:w-80 rotate-12 mix-blend-multiply opacity-80" />
      </section>

      {/* 2. FEATURES BAR MARQUEE */}
      <section className="bg-accent text-white py-5 w-full overflow-hidden flex">
        <div className="flex animate-marquee min-w-max">
          {/* Half 1 */}
          <div className="flex items-center gap-12 px-6 text-sm font-bold tracking-wide">
            <span className="flex items-center gap-2 whitespace-nowrap">🌊 Superior Materials</span>
            <span className="flex items-center gap-2 whitespace-nowrap">♻️ Eco-Friendly</span>
            <span className="flex items-center gap-2 whitespace-nowrap">☀️ UPF 50+</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🧵 4-Way Stretch</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🤿 Ocean Tested</span>
          </div>
          <div className="flex items-center gap-12 px-6 text-sm font-bold tracking-wide">
            <span className="flex items-center gap-2 whitespace-nowrap">🌊 Superior Materials</span>
            <span className="flex items-center gap-2 whitespace-nowrap">♻️ Eco-Friendly</span>
            <span className="flex items-center gap-2 whitespace-nowrap">☀️ UPF 50+</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🧵 4-Way Stretch</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🤿 Ocean Tested</span>
          </div>
          {/* Half 2 (for seamless loop) */}
          <div className="flex items-center gap-12 px-6 text-sm font-bold tracking-wide">
            <span className="flex items-center gap-2 whitespace-nowrap">🌊 Superior Materials</span>
            <span className="flex items-center gap-2 whitespace-nowrap">♻️ Eco-Friendly</span>
            <span className="flex items-center gap-2 whitespace-nowrap">☀️ UPF 50+</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🧵 4-Way Stretch</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🤿 Ocean Tested</span>
          </div>
          <div className="flex items-center gap-12 px-6 text-sm font-bold tracking-wide">
            <span className="flex items-center gap-2 whitespace-nowrap">🌊 Superior Materials</span>
            <span className="flex items-center gap-2 whitespace-nowrap">♻️ Eco-Friendly</span>
            <span className="flex items-center gap-2 whitespace-nowrap">☀️ UPF 50+</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🧵 4-Way Stretch</span>
            <span className="flex items-center gap-2 whitespace-nowrap">🤿 Ocean Tested</span>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">Our ocean-backed products</h2>
          <div className="mt-6 flex justify-center gap-8 text-sm font-bold text-navy/60 uppercase tracking-widest border-b border-navy/10 pb-4">
            <span className="text-navy border-b-2 border-navy pb-4 -mb-[17px] cursor-pointer">Wetsuits</span>
            <span className="hover:text-navy cursor-pointer transition">Rash Guards</span>
            <span className="hover:text-navy cursor-pointer transition">Accessories</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Promo Card */}
          <div className="bg-[#E5F1F6] rounded-[32px] p-8 sm:p-12 flex flex-col justify-between shadow-sm">
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy text-balance mb-8">
              Proprietary blend of materials to stretch and fit perfectly.
            </h3>
            <Button as={Link} to="#shop" variant="secondary" className="self-start !bg-white !border-0 !text-navy shadow-soft hover:!bg-navy hover:!text-white">
              Shop Wetsuits →
            </Button>
          </div>

          {/* Product Cards */}
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-[#F8F9FA] rounded-[32px] p-6 relative group flex flex-col shadow-sm transition hover:shadow-card">
              {product.tag && (
                <span className="absolute top-6 right-6 bg-white px-3 py-1 text-xs font-bold shadow-sm rounded-full text-navy z-10">
                  {product.tag}
                </span>
              )}
              <div className="aspect-[4/5] w-full mb-6 bg-white rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-lg text-navy leading-tight">{product.title}</h4>
                <div className="flex items-center gap-1 text-accent text-[10px] sm:text-xs mt-2">
                  ★★★★★ <span className="text-navy/50 font-sans ml-1">150 reviews</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center border-t border-navy/10 pt-4">
                <button className="text-xs font-bold uppercase tracking-wider text-accent hover:text-navy transition w-full text-center py-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* 6. HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 max-w-lg">
            <h3 className="font-bold uppercase tracking-widest text-accent text-sm mb-3">How our gear works</h3>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-navy mb-12 leading-tight">
              premium fit<br/>
              <span className="text-navy/40">unmatched mobility</span><br/>
              <span className="text-navy/20">dive deeper</span>
            </h2>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <span className="w-14 h-14 rounded-full border-2 border-navy/10 flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">1</span>
                <p className="text-xs font-bold text-navy/80">Find your fit using our guide.</p>
              </div>
              <div>
                <span className="w-14 h-14 rounded-full border-2 border-navy/10 flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">2</span>
                <p className="text-xs font-bold text-navy/80">Suit up with 4-way stretch.</p>
              </div>
              <div>
                <span className="w-14 h-14 rounded-full border-2 border-navy/10 flex items-center justify-center text-navy font-bold text-xl mx-auto mb-4">3</span>
                <p className="text-xs font-bold text-navy/80">Dive with confidence.</p>
              </div>
            </div>
            
            <div className="mt-12">
               <Button variant="ghost" className="border-2 border-navy/20 !text-navy hover:!border-navy">
                 Learn more →
               </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 aspect-[4/5] bg-[#E5F1F6] rounded-[40px] overflow-hidden relative group shadow-float">
             <InteractiveVideoSphere autoRotate={false} />
          </div>
        </div>
      </section>

    </div>
  )
}
