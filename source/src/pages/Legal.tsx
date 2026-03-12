import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const POLICIES = [
  {
    icon: 'file-text' as const,
    title: 'Terms of Service',
    desc: 'Governs use of the Yeti Cloud platform, outlining rights, responsibilities, fees, data policies, and legal obligations.',
    href: '/legal/terms-of-service',
  },
  {
    icon: 'shield' as const,
    title: 'Privacy Policy',
    desc: 'How we collect, use, and protect your data. Covers legal bases, third-party services, user rights, retention, and GDPR compliance.',
    href: '/legal/privacy-policy',
  },
  {
    icon: 'lock' as const,
    title: 'Software License',
    desc: 'License terms for locally installed Yeti software. Covers usage rights, restrictions, IP ownership, warranties, and termination.',
    href: '/legal/software-license',
  },
  {
    icon: 'browser' as const,
    title: 'Cookie Policy',
    desc: 'Details how yetirocks.com and Yeti Cloud use cookies, the types employed, your choices, and how cookie data is handled.',
    href: '/legal/cookie-policy',
  },
  {
    icon: 'clipboard' as const,
    title: 'Acceptable Use Policy',
    desc: 'Defines what you can and cannot run on Yeti Cloud. Covers prohibited content, resource limits, and enforcement actions.',
    href: '/legal/acceptable-use',
  },
  {
    icon: 'wrench' as const,
    title: 'Support Policy',
    desc: 'Service levels, response times, uptime guarantees, and remedies for Yeti Cloud and licensed software support.',
    href: '/legal/support-policy',
  },
]

export default function Legal() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Legal</h1>
        <p className="page-subtitle">
          Policies and legal documents for Yeti software and Yeti Cloud.
        </p>
      </div>

      <div className="legal-grid">
        {POLICIES.map((p) => (
          <Link key={p.href} to={p.href} className="legal-card">
            <Icon name={p.icon} />
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
