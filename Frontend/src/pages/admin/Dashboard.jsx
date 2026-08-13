import SectionReveal from '../../components/SectionReveal'

export default function AdminDashboard() {
  return (
    <SectionReveal>
      <h1 className="font-heading text-h2 font-extrabold text-white">
        Admin <em className="italic text-accent">Dashboard</em>
      </h1>
      <p className="mt-2 text-white/70">Catalog, orders, customers, and content management.</p>
    </SectionReveal>
  )
}
