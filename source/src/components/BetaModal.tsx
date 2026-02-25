import { useState } from 'react'

interface BetaModalProps {
  onClose: () => void
}

export default function BetaModal({ onClose }: BetaModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [idea, setIdea] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    setSubmitting(true)
    setError('')

    try {
      const resp = await fetch('/BetaSignup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          title: title.trim() || undefined,
          idea: idea.trim() || undefined,
        }),
      })

      if (resp.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Could not connect. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="modal-success">
            You're on the list. We'll be in touch.
          </div>
        ) : (
          <>
            <div className="modal-title">Request Early Access</div>
            <div className="modal-desc">
              Full platform access and dedicated support during the beta. No credit card required. We'll reach out within 48 hours.
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="beta-name">Name</label>
                <input
                  id="beta-name"
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="beta-email">Email</label>
                <input
                  id="beta-email"
                  className="form-input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="beta-company">Company</label>
                <input
                  id="beta-company"
                  className="form-input"
                  type="text"
                  placeholder="Your company"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="beta-title">Title</label>
                <input
                  id="beta-title"
                  className="form-input"
                  type="text"
                  placeholder="Your role"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="beta-idea">What's your primary use case?</label>
                <textarea
                  id="beta-idea"
                  className="form-input form-textarea"
                  placeholder="Tell us about your project..."
                  value={idea}
                  onChange={e => setIdea(e.target.value)}
                  rows={3}
                />
              </div>
              {error && <div className="form-error">{error}</div>}
              <div className="modal-actions">
                <button type="button" className="btn" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Join the Beta'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
