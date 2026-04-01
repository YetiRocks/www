import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-brand">Built with Yeti</span>
      {' | '}
      <Link to="/legal/privacy-policy">Privacy Policy</Link>
      {' | '}
      <Link to="/legal">Legal</Link>
      {' | '}
      <a href="https://github.com/yetirocks" target="_blank" rel="noopener noreferrer">GitHub</a>
      {' | '}
      <a href="https://www.linkedin.com/company/yetirocks" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </footer>
  )
}
