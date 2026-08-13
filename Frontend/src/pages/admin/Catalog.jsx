import SectionReveal from '../../components/SectionReveal'

export default function AdminCatalog() {
  return (
    <SectionReveal>
      <h1 className="font-heading text-h2 font-extrabold text-white">Catalog CRUD</h1>
      <p className="mt-2 text-white/70">Product create / update / delete via /api/products.</p>
    </SectionReveal>
  )
}
