import { Link, useNavigate } from 'react-router'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'

export default function Wishlist() {
  const { items, count, remove } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-navy font-body pt-24 sm:pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-6 border-b border-navy/10">
          <div>
            <span className="inline-block bg-navy/10 text-navy border border-navy/20 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest mb-3">
              Saved Items
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-navy leading-tight">
              My Wishlist
            </h1>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
          >
            ← Back to Store
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 sm:p-16 border border-navy/5 text-center shadow-card flex flex-col items-center justify-center max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mb-4 shadow-md border border-white/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFCD00" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-bold text-navy mb-2">Your wishlist is empty</h3>
            <p className="text-navy/60 text-sm max-w-md mb-8 leading-relaxed">
              Explore our gear, apparel, and accessories, and tap the heart icon on any product to save it here.
            </p>
            <Link
              to="/shop"
              className="rounded-full bg-navy hover:bg-accent text-white hover:text-navy font-bold px-8 py-3.5 text-sm transition-all duration-300 shadow-md"
            >
              Explore Shop Merchandise
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-navy/60 mb-6">
              {count} saved product{count !== 1 && 's'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[32px] bg-white border border-navy/5 p-6 shadow-card hover:shadow-float transition duration-300 flex flex-col justify-between group relative"
                >
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-navy/60 hover:text-rose-600 hover:bg-rose-50 border border-navy/10 flex items-center justify-center text-sm shadow-sm transition"
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>

                  <div onClick={() => navigate(`/shop/${item.id}`)} className="cursor-pointer">
                    <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F0F2F5] flex items-center justify-center p-4 relative mb-4">
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-1">
                      {item.category || 'Gear'}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-navy leading-snug group-hover:text-accent transition mb-2">
                      {item.title || item.name}
                    </h3>
                    <p className="font-heading text-lg font-bold text-navy mb-4">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-navy/5">
                    <button
                      type="button"
                      onClick={() => {
                        addItem({
                          inventoryId: item.inventoryId || item.id,
                          quantity: 1,
                          product: {
                            id: item.id,
                            name: item.title || item.name,
                            price: item.price,
                            image: item.image,
                          },
                        })
                      }}
                      className="flex-1 rounded-full bg-navy hover:bg-accent text-white font-bold py-3 px-4 text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/shop/${item.id}`}
                      className="rounded-full bg-[#F0F2F5] hover:bg-navy hover:text-white text-navy font-bold py-3 px-4 text-xs transition flex items-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
