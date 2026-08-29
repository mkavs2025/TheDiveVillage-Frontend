import SectionReveal from '../../components/SectionReveal'

export default function AdminOrders() {
  return (
    <SectionReveal>
      <h1 className="font-heading text-h2 font-bold text-white">Orders</h1>
      <p className="mt-2 text-white/70">Admin list from GET /api/orders/admin/list.</p>
    </SectionReveal>
  )
}
