import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import BookUs from '../pages/BookUs'
import Shop from '../pages/Shop'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import Wishlist from '../pages/Wishlist'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminCatalog from '../pages/admin/Catalog'
import AdminOrders from '../pages/admin/Orders'
import AdminCustomers from '../pages/admin/Customers'
import AdminContent from '../pages/admin/Content'

function PageFade({ children }) {
  const reduce = useReducedMotion()

  if (reduce) return children

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route
            index
            element={
              <PageFade>
                <Home />
              </PageFade>
            }
          />
          <Route path="book-us" element={<PageFade><BookUs /></PageFade>} />
          <Route path="shop" element={<PageFade><Shop /></PageFade>} />
          <Route path="shop/:id" element={<PageFade><ProductDetail /></PageFade>} />
          <Route path="cart" element={<PageFade><Cart /></PageFade>} />
          <Route path="checkout" element={<PageFade><Checkout /></PageFade>} />
          <Route path="contact" element={<PageFade><Contact /></PageFade>} />
          <Route path="login" element={<PageFade><Login /></PageFade>} />
          <Route path="signup" element={<PageFade><Signup /></PageFade>} />
          <Route path="profile" element={<Navigate to="/dashboard/profile" replace />} />
        </Route>

        <Route
          path="dashboard"
          element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route
          path="admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="catalog" element={<AdminCatalog />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="content" element={<AdminContent />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
