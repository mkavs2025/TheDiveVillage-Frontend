import { BrowserRouter } from 'react-router'
import { AuthProvider } from './contexts/AuthProvider'
import { CartProvider } from './contexts/CartProvider'
import { WishlistProvider } from './contexts/WishlistProvider'
import AppRouter from './router/AppRouter'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CustomCursor />
            <AppRouter />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
