import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import Badge from './Badge'
import Button from './Button'
import SafeImage from './SafeImage'
import { formatCurrency } from '../utils/formatCurrency'
import { useCart } from '../hooks/useCart'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const reduce = useReducedMotion()

  const onAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      inventoryId: product.inventoryId || product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image,
      },
    })
  }

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex flex-col overflow-hidden rounded-card bg-white/10 backdrop-blur-md border border-white/20 shadow-card hover:shadow-lift"
    >
      <Link to={`/shop/${product.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <SafeImage
          src={product.image}
          alt={product.name || product.title}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition duration-500 hover:scale-105"
        />
        {product.badge && (
          <div className="absolute left-3 top-3">
            <Badge tone={product.badgeTone || 'accent'}>{product.badge}</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link to={`/shop/${product.id}`} className="group">
          <h3 className="font-heading text-base font-bold text-white transition duration-hover group-hover:text-accent">
            {product.name || product.title}
          </h3>
          <p className="mt-1 text-sm text-white/70">{product.category}</p>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="font-heading text-lg font-extrabold text-white">
            {formatCurrency(product.price)}
          </p>
          <Button type="button" onClick={onAdd} className="!px-4 !py-2 text-xs">
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
