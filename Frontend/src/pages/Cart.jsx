import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'

export default function Cart() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, addItem } = useCart()

  const demoAdd = () => {
    addItem({
      inventoryId: 'demo-mask',
      quantity: 1,
      product: {
        id: 'demo-mask',
        name: 'Pro Dive Mask',
        price: 4499,
        image:
          'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=400&q=80',
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-navy font-body pt-32 pb-24" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-navy/10 pb-8 flex items-end justify-between">
          <div>
            <h1 className="font-heading text-5xl font-extrabold text-navy tracking-tight">Your Cart</h1>
            <p className="mt-2 text-navy/60 font-medium">{itemCount} item{itemCount !== 1 && 's'}</p>
          </div>
          <Link to="/shop" className="text-sm font-bold text-navy hover:text-accent transition underline decoration-2 underline-offset-4">Continue Shopping</Link>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
            <p className="text-navy/60 mb-8 leading-relaxed">It looks like you haven't added any gear to your cart yet. Discover our premium diving collection.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/shop" className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/80">
                Browse Shop
              </Link>
              <button onClick={demoAdd} className="rounded-full bg-white border border-navy/20 px-8 py-4 text-sm font-bold text-navy transition hover:bg-slate-50">
                Add Demo Item
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-24 items-start">
            
            {/* Cart Items List */}
            <div className="space-y-10">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 items-start pb-10 border-b border-navy/5 last:border-0 last:pb-0">
                  <div className="w-32 h-40 shrink-0 rounded-2xl overflow-hidden bg-[#F0F2F5]">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-2">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-heading text-xl font-bold text-navy">{item.product?.name}</h3>
                      <p className="font-heading text-xl font-bold text-navy">
                        {formatCurrency(item.product?.price)}
                      </p>
                    </div>
                    
                    <p className="text-sm text-navy/50 mb-6">Color: Ocean Blue | Size: M</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-navy/20 p-1 bg-white">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full text-navy transition hover:bg-[#F0F2F5]"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-navy">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-full text-navy transition hover:bg-[#F0F2F5]"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-bold text-navy/50 hover:text-red-500 transition underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary Sticky Panel */}
            <div className="sticky top-32 rounded-[32px] bg-[#F0F2F5] p-8 lg:p-10">
              <h2 className="font-heading text-2xl font-bold text-navy mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8 text-sm font-medium">
                <div className="flex justify-between text-navy/70">
                  <span>Subtotal</span>
                  <span className="text-navy">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>Shipping</span>
                  <span className="text-navy">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-navy/70 pt-4 border-t border-navy/10">
                  <span className="font-bold text-navy text-lg">Total</span>
                  <span className="font-heading font-bold text-navy text-xl">{formatCurrency(subtotal)}</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full flex items-center justify-center rounded-full bg-black px-8 py-5 text-sm font-bold text-white transition hover:bg-black/80"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-6 text-center text-xs text-navy/50">
                Secure checkout powered by Stripe.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
