export default function Orders() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy">
        Order History
      </h1>
      <p className="mt-2 text-navy/60 font-medium">Review your past purchases and diving bookings.</p>
      
      <div className="mt-10 rounded-2xl bg-[#F0F2F5] p-12 border border-navy/5 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl mb-4 shadow-sm border border-navy/5">📦</div>
        <h3 className="font-heading text-lg font-bold text-navy mb-2">No orders yet</h3>
        <p className="text-navy/60 text-sm max-w-md">When you purchase gear or book a dive, your order history and receipts will appear here.</p>
      </div>
    </div>
  )
}
