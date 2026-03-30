import { NavLink, useLocation } from 'react-router-dom'
import { useState, useCallback } from 'react'

const THEME_KEY = 'yeti-theme'

const themes = [
  { name: 'black', value: '#0e0e0e' },
  { name: 'blue', value: '#0a0e14' },
  { name: 'green', value: '#0a120a' },
  { name: 'brown', value: '#120e0a' },
] as const

function getSavedTheme(): number {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved !== null) {
      const idx = parseInt(saved, 10)
      if (idx >= 0 && idx < themes.length) return idx
    }
  } catch {}
  return 0
}

function applyTheme(index: number) {
  document.documentElement.style.setProperty('--color-black', themes[index].value)
}

// Apply saved theme immediately to avoid flash
applyTheme(getSavedTheme())

const solutionsPrefix = '/solutions'
const developersPrefix = '/developers'

interface NavProps {
  onGetStarted: () => void
}

export default function Nav({ onGetStarted }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeIndex, setThemeIndex] = useState(getSavedTheme)
  const location = useLocation()

  const isSolutionsActive = location.pathname.startsWith(solutionsPrefix)
  const isDevelopersActive = location.pathname.startsWith(developersPrefix)
  const hasSubnav = isSolutionsActive || isDevelopersActive

  const cycleTheme = useCallback(() => {
    const next = (themeIndex + 1) % themes.length
    setThemeIndex(next)
    applyTheme(next)
    try { localStorage.setItem(THEME_KEY, String(next)) } catch {}
  }, [themeIndex])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <NavLink to="/">
            <img src={`${import.meta.env.BASE_URL}logo_white.svg`} alt="Yeti" className="nav-logo" />
          </NavLink>
        </div>
        <div className="nav-center">
          <NavLink to="/platform" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Product
          </NavLink>
          <NavLink to="/solutions/ai" className={() => `nav-link${isSolutionsActive ? ' active' : ''}`}>
            Solutions
          </NavLink>
          {/*<NavLink to="/pricing" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Pricing
          </NavLink>*/}
          <NavLink to="/developers/getting-started" className={() => `nav-link${isDevelopersActive ? ' active' : ''}`}>
            Developers
          </NavLink>
          <NavLink to="/company" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Company
          </NavLink>
        </div>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={cycleTheme}
            aria-label={`Theme: ${themes[themeIndex].name}`}
            title={`Theme: ${themes[themeIndex].name}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <rect x="7" y="7" width="4" height="4" />
              <rect x="13" y="7" width="4" height="4" />
              <rect x="7" y="13" width="4" height="4" />
              <rect x="13" y="13" width="4" height="4" />
            </svg>
          </button>
          <button className="btn btn-primary" onClick={onGetStarted}>
            Get Started
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </nav>

      {hasSubnav && (
        <div className="www-subnav">
          {isSolutionsActive && <>
            <NavLink to="/solutions/ai" className={({ isActive }) => `subnav-link${isActive ? ' active' : ''}`}>
              AI
            </NavLink>
            <NavLink to="/solutions/use-cases" className={({ isActive }) => `subnav-link${isActive ? ' active' : ''}`}>
              Use Cases
            </NavLink>
            <NavLink to="/solutions/cloud" className={({ isActive }) => `subnav-link${isActive ? ' active' : ''}`}>
              Cloud
            </NavLink>
          </>}
          {isDevelopersActive && <>
            <NavLink to="/developers/getting-started" className={({ isActive }) => `subnav-link${isActive ? ' active' : ''}`}>
              Getting Started
            </NavLink>
            <NavLink to="/developers/demos" className={({ isActive }) => `subnav-link${isActive ? ' active' : ''}`}>
              Demos
            </NavLink>
            <NavLink to="/developers/benchmarks" className={({ isActive }) => `subnav-link${isActive ? ' active' : ''}`}>
              Benchmarks
            </NavLink>
            <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="subnav-link">
              Docs
            </a>
          </>}
        </div>
      )}

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/platform" className="nav-link" onClick={closeMobile}>
          Product
        </NavLink>
        <span className="nav-mobile-header">Solutions</span>
        <NavLink to="/solutions/ai" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          AI
        </NavLink>
        <NavLink to="/solutions/use-cases" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Use Cases
        </NavLink>
        <NavLink to="/solutions/cloud" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Cloud
        </NavLink>
        {/*<NavLink to="/pricing" className="nav-link" onClick={closeMobile}>
          Pricing
        </NavLink>*/}
        <span className="nav-mobile-header">Developers</span>
        <NavLink to="/developers/getting-started" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Getting Started
        </NavLink>
        <NavLink to="/developers/demos" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Demos
        </NavLink>
        <NavLink to="/developers/benchmarks" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Benchmarks
        </NavLink>
        <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Docs
        </a>
        <NavLink to="/company" className="nav-link" onClick={closeMobile}>
          Company
        </NavLink>
        <button className="btn btn-primary nav-mobile-cta" onClick={() => { closeMobile(); onGetStarted(); }}>
          Get Started
        </button>
      </div>
    </>
  )
}
