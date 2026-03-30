import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BetaModal from './components/BetaModal'
import Home from './pages/Home'
import Platform from './pages/Platform'
import Applications from './pages/Applications'
import Demos from './pages/Demos'
import Hosting from './pages/Hosting'
import AI from './pages/AI'
import UseCases from './pages/UseCases'
// import Pricing from './pages/Pricing'
import Benchmarks from './pages/Benchmarks'
import Company from './pages/Company'
import NotFound from './pages/NotFound'
import Legal from './pages/Legal'
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import SoftwareLicense from './pages/legal/SoftwareLicense'
import CookiePolicy from './pages/legal/CookiePolicy'
import AcceptableUse from './pages/legal/AcceptableUse'
import SupportPolicy from './pages/legal/SupportPolicy'

const subnavPrefixes = ['/solutions', '/developers']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = document.querySelector('.page')
    if (page) page.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppContent({ onGetStarted }: { onGetStarted: () => void }) {
  const location = useLocation()
  const hasSubnav = subnavPrefixes.some(p => location.pathname.startsWith(p))

  return (
    <div className="app">
      <Nav onGetStarted={onGetStarted} />
      <main className={`page${hasSubnav ? ' page-with-subnav' : ''}`}>
        <Routes>
          <Route path="/" element={<Home onGetStarted={onGetStarted} />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/solutions/ai" element={<AI />} />
          <Route path="/solutions/use-cases" element={<UseCases />} />
          <Route path="/solutions/cloud" element={<Hosting />} />
          {/*<Route path="/pricing" element={<Pricing onGetStarted={onGetStarted} />} />*/}
          <Route path="/developers/getting-started" element={<Applications />} />
          <Route path="/developers/demos" element={<Demos />} />
          <Route path="/developers/benchmarks" element={<Benchmarks />} />
          <Route path="/company" element={<Company />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/software-license" element={<SoftwareLicense />} />
          <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
          <Route path="/legal/acceptable-use" element={<AcceptableUse />} />
          <Route path="/legal/support-policy" element={<SupportPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <BrowserRouter basename={__BASENAME__}>
      <ScrollToTop />
      <AppContent onGetStarted={() => setShowModal(true)} />
      {showModal && <BetaModal onClose={() => setShowModal(false)} />}
    </BrowserRouter>
  )
}
