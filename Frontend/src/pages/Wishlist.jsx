import { useWishlist } from '../hooks/useWishlist'

export default function Wishlist() {
  const { items, count } = useWishlist()
  
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy">
        Wishlist
      </h1>
      <p className="mt-2 text-navy/60 font-medium">Keep track of the gear you're eyeing.</p>
      
      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-[#F0F2F5] p-12 border border-navy/5 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl mb-4 shadow-sm border border-navy/5">🖤</div>
          <h3 className="font-heading text-lg font-bold text-navy mb-2">Your wishlist is empty</h3>
          <p className="text-navy/60 text-sm max-w-md">Heart products from the shop to save them here for later.</p>
        </div>
      ) : (
        <div className="mt-10">
           <p className="text-sm font-bold text-navy/60 mb-6">{count} item{count !== 1 && 's'} saved</p>
           {/* Wishlist items grid would go here */}
        </div>
      )}
    </div>
  )
}
