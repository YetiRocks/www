import { Link } from '@tanstack/react-router'

export default function CookiePolicy() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Cookie Policy</h1>
        <p className="page-subtitle">Last Updated: March 2026</p>
      </div>
      <div className="legal-content">
        <p>
          YetiRocks, LLC ("Yeti", "we", "us", or "our")
          uses cookies and similar technologies on our website and
          platform. This Cookie Policy explains what cookies are, how we use them, and how you can
          manage your preferences.
        </p>

        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They help the
          site remember your preferences, keep you signed in, and understand how you interact with
          the content. Cookies may be "session" cookies (deleted when you close your browser) or
          "persistent" cookies (stored until they expire or you delete them).
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>We use the following categories of cookies:</p>
        <ul>
          <li>
            <strong>Essential cookies</strong> — Required for the platform to function. These handle
            authentication, session management, and security protections such as CSRF tokens. You
            cannot opt out of essential cookies without losing access to core functionality.
          </li>
          <li>
            <strong>Analytics cookies</strong> — Help us understand how visitors use our website, which
            pages are most popular, and where users encounter issues. Analytics data is aggregated and
            does not identify you personally.
          </li>
          <li>
            <strong>Preference cookies</strong> — Remember your settings and choices, such as language,
            region, theme, and display preferences, so you don't have to reconfigure them on each visit.
          </li>
        </ul>

        <h2>3. Third-Party Cookies</h2>
        <p>
          We use a limited number of third-party services that may set their own cookies on your device:
        </p>
        <ul>
          <li>
            <strong>Google Analytics 4</strong> — Collects anonymized usage data including pages visited,
            session duration, and approximate geographic location. Google's privacy policy is available
            at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>.
          </li>
          <li>
            <strong>Cloudflare</strong> — Provides content delivery, DDoS protection, and DNS services.
            Cloudflare may set cookies to distinguish between human visitors and automated traffic.
            Cloudflare's privacy policy is available at{' '}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
              cloudflare.com/privacypolicy
            </a>.
          </li>
        </ul>
        <p>
          We do not use any advertising cookies, remarketing pixels, or third-party tracking for
          ad targeting purposes.
        </p>

        <h2>4. Managing Cookies</h2>
        <p>
          You can control and manage cookies through your browser settings. Most browsers allow you
          to block or delete cookies, though doing so may affect the functionality of our Services.
        </p>
        <ul>
          <li>
            <strong>Browser settings</strong> — Consult your browser's help documentation to learn how
            to manage cookies. Common browsers include Chrome, Firefox, Safari, and Edge.
          </li>
          <li>
            <strong>Google Analytics opt-out</strong> — Install the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>{' '}
            to prevent Google Analytics from collecting your data.
          </li>
        </ul>
        <p>
          Please note that disabling essential cookies will prevent you from signing in and using
          authenticated features of the platform.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. When we make changes, we will update
          the "Last Updated" date at the top of this page. We encourage you to review this page
          periodically. Your continued use of the Services after any changes constitutes acceptance
          of the updated policy.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us:
        </p>
        <ul>
          <li>Email: <a href="mailto:privacy@yetirocks.com">privacy@yetirocks.com</a></li>
          <li>YetiRocks, LLC, 1712 Pioneer Ave, Suite 500, Cheyenne, WY 82001</li>
        </ul>
        <p>
          For more information about how we handle your data, see our{' '}
          <Link to="/legal/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
