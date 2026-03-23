import { NavLink } from 'react-router-dom'
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

interface NavProps {
  onGetStarted: () => void
}

export default function Nav({ onGetStarted }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeIndex, setThemeIndex] = useState(getSavedTheme)

  const cycleTheme = useCallback(() => {
    const next = (themeIndex + 1) % themes.length
    setThemeIndex(next)
    applyTheme(next)
    try { localStorage.setItem(THEME_KEY, String(next)) } catch {}
  }, [themeIndex])

  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <NavLink to="/">
            <img src={`${import.meta.env.BASE_URL}logo_white.svg`} alt="Yeti" className="nav-logo" />
          </NavLink>
        </div>
        <div className="nav-center">
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/platform" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Platform
          </NavLink>
          <NavLink to="/cloud" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Cloud
          </NavLink>
          <NavLink to="/demos" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Demos
          </NavLink>
          {/*<NavLink to="/benchmarks" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Benchmarks
          </NavLink>*/}
          <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="nav-link">Docs</a>
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
      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={() => setMobileOpen(false)} end>
          Home
        </NavLink>
        <NavLink to="/platform" className="nav-link" onClick={() => setMobileOpen(false)}>
          Platform
        </NavLink>
        <NavLink to="/cloud" className="nav-link" onClick={() => setMobileOpen(false)}>
          Cloud
        </NavLink>
        <NavLink to="/demos" className="nav-link" onClick={() => setMobileOpen(false)}>
          Demos
        </NavLink>
        {/*<NavLink to="/benchmarks" className="nav-link" onClick={() => setMobileOpen(false)}>
          Benchmarks
        </NavLink>*/}
        <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={() => setMobileOpen(false)}>
          Docs
        </a>
        <button className="btn btn-primary nav-mobile-cta" onClick={() => { setMobileOpen(false); onGetStarted(); }}>
          Get Started
        </button>
      </div>
    </>
  )
}
