import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BetaModal from '../components/BetaModal'

const subnavPrefixes = ['/solutions', '/developers']

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const [showModal, setShowModal] = useState(false)
  const pathname = useRouterState({ select: s => s.location.pathname })

  const hasSubnav = subnavPrefixes.some(p => pathname.startsWith(p))

  // Scroll to top on route change
  useEffect(() => {
    const page = document.querySelector('.page')
    if (page) page.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Listen for custom 'getstarted' event from child routes
  useEffect(() => {
    const handler = () => setShowModal(true)
    window.addEventListener('getstarted', handler)
    return () => window.removeEventListener('getstarted', handler)
  }, [])

  const onGetStarted = () => setShowModal(true)

  return (
    <div className="app">
      <Nav onGetStarted={onGetStarted} />
      <main className={`page${hasSubnav ? ' page-with-subnav' : ''}`}>
        <Outlet />
        <Footer />
      </main>
      {showModal && <BetaModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
