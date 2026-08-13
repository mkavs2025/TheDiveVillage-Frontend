import { BrowserRouter } from 'react-router'
import { AuthProvider } from './contexts/AuthProvider'
import { CartProvider } from './contexts/CartProvider'
import { WishlistProvider } from './contexts/WishlistProvider'
import AppRouter from './router/AppRouter'
import CustomCursor from './components/CustomCursor'
import AmbientAudio from './components/AmbientAudio'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CustomCursor />
            <AmbientAudio />
            <AppRouter />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
