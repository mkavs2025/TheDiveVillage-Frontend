import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatCurrency'

export default function Checkout() {
  const { items, subtotal } = useCart()
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-[#FAFAFA] flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="rounded-[40px] bg-white p-12 shadow-sm max-w-md w-full border border-navy/5">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 className="font-heading text-3xl font-bold text-navy">Order Confirmed!</h2>
          <p className="mt-4 text-navy/70 text-sm leading-relaxed">
            Your order #DV-8492 has been placed successfully. We've sent a confirmation email.
          </p>
          <Link
            to="/shop"
            className="mt-10 block rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/80 w-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-navy font-body pt-32 pb-24" style={{ textShadow: 'none' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-navy/10 pb-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-24 items-start">
          
          {/* Checkout Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              <section>
                <h3 className="font-heading text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-navy/70">Email Address</label>
                    <input type="email" required className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="news" className="w-4 h-4 rounded border-navy/20 text-navy focus:ring-navy" />
                    <label htmlFor="news" className="text-sm font-medium text-navy/70">Email me with news and offers</label>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-heading text-2xl font-bold mb-6">Shipping Address</h3>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70">First Name</label>
                      <input type="text" required className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70">Last Name</label>
                      <input type="text" required className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold text-navy/70">Address</label>
                    <input type="text" required className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs font-bold text-navy/70">City</label>
                      <input type="text" required className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70">Postal Code</label>
                      <input type="text" required className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-heading text-2xl font-bold mb-6">Payment</h3>
                <p className="text-sm text-navy/70 mb-6 font-medium">All transactions are secure and encrypted.</p>
                <div className="rounded-3xl border border-navy/10 overflow-hidden bg-white">
                  <div className="p-6 border-b border-navy/10 flex items-center justify-between bg-navy/5">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" id="card" defaultChecked className="w-4 h-4 text-navy focus:ring-navy" />
                      <label htmlFor="card" className="font-bold text-sm">Credit Card</label>
                    </div>
                    <div className="flex gap-2">
                       <span className="text-2xl">💳</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-navy/70">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-xs font-bold text-navy/70">Expiration Date (MM/YY)</label>
                        <input type="text" placeholder="MM / YY" className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-bold text-navy/70">Security Code</label>
                        <input type="text" placeholder="CVC" className="w-full rounded-2xl bg-[#F0F2F5] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full rounded-full bg-black px-8 py-5 text-sm font-bold text-white transition hover:bg-black/80">
                Pay Now
              </button>
            </form>
          </div>
          
          {/* Order Summary Sticky Panel */}
          <div className="sticky top-32 rounded-[32px] bg-[#F0F2F5] p-8 lg:p-10">
            <h2 className="font-heading text-xl font-bold text-navy mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 relative border border-navy/5">
                    <img src={item.product?.image} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-navy text-white text-[10px] font-bold flex items-center justify-center rounded-full z-10">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.product?.name}</h4>
                    <p className="text-xs text-navy/60 mt-1">Color: Ocean Blue</p>
                  </div>
                  <div className="text-sm font-bold">
                    {formatCurrency(item.product?.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 text-sm font-medium border-t border-navy/10 pt-6">
              <div className="flex justify-between text-navy/70">
                <span>Subtotal</span>
                <span className="text-navy">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-navy/70">
                <span>Shipping</span>
                <span className="text-navy">Free</span>
              </div>
              <div className="flex justify-between text-navy/70 pt-4 border-t border-navy/10">
                <span className="font-bold text-navy text-lg">Total</span>
                <span className="font-heading font-bold text-navy text-xl">{formatCurrency(subtotal)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
