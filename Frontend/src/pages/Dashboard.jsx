import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy">
        Hello, {user?.displayName || 'Diver'}
      </h1>
      <p className="mt-2 text-navy/60 font-medium">Welcome to your dive dashboard overview.</p>
      
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {['Orders', 'Wishlist', 'Cert Progress'].map((label) => (
          <div key={label} className="rounded-2xl bg-[#F0F2F5] p-6 border border-navy/5 transition hover:shadow-sm">
            <p className="text-sm font-bold text-navy/60 uppercase tracking-wider">{label}</p>
            <p className="mt-2 font-heading text-3xl font-bold text-navy">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}
