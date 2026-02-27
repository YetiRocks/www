import { NavLink } from 'react-router-dom'
import { useState } from 'react'

interface NavProps {
  onGetStarted: () => void
}

export default function Nav({ onGetStarted }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          <NavLink to="/benchmarks" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Benchmarks
          </NavLink>
          <NavLink to="/demos" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Demos
          </NavLink>
          <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="nav-link">Documentation</a>
        </div>
        <div className="nav-right">
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
        <NavLink to="/benchmarks" className="nav-link" onClick={() => setMobileOpen(false)}>
          Benchmarks
        </NavLink>
        <NavLink to="/demos" className="nav-link" onClick={() => setMobileOpen(false)}>
          Demos
        </NavLink>
        <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={() => setMobileOpen(false)}>
          Documentation
        </a>
        <button className="btn btn-primary nav-mobile-cta" onClick={() => { setMobileOpen(false); onGetStarted(); }}>
          Get Started
        </button>
      </div>
    </>
  )
}
