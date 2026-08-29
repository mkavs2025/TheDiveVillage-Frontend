import { Outlet } from 'react-router'
import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VideoSphereBackground = lazy(() => import('../components/VideoSphereBackground'))

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent relative isolate">
      {/* Global Interactive 360 Video Background */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-navy" />}>
        <VideoSphereBackground />
      </Suspense>

      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
