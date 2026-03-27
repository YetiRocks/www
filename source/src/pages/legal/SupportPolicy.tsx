import { Link } from 'react-router-dom'

export default function SupportPolicy() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Support Policy</h1>
        <p className="page-subtitle">Last Updated: March 2026</p>
      </div>
      <div className="legal-content">
        <p>
          This Support Policy describes the support services provided by YetiRocks, LLC, a Wyoming limited liability company,
          C.V. ("Yeti", "we", "us", or "our"), located ,
          to customers of the Yeti Cloud platform. This policy is incorporated into and
          forms part of our <Link to="/legal/terms-of-service">Terms of Service</Link>.
        </p>

        <h2>1. Overview</h2>
        <p>
          We are committed to helping you succeed with the Yeti platform. Support availability,
          response times, and channels depend on your subscription tier. All paid plans include
          access to our support team via email, with higher tiers receiving faster response times
          and dedicated support resources.
        </p>

        <h2>2. Support Tiers</h2>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Channels</th>
              <th>Response Time</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Free</strong></td>
              <td>Community forums, documentation</td>
              <td>Best effort</td>
              <td>Self-service only</td>
            </tr>
            <tr>
              <td><strong>Pro</strong></td>
              <td>Email support</td>
              <td>24 hours (business days)</td>
              <td>Monday - Friday, 9am - 6pm CT</td>
            </tr>
            <tr>
              <td><strong>Enterprise</strong></td>
              <td>Priority email, dedicated support engineer</td>
              <td>4 hours</td>
              <td>24/7 for Critical severity</td>
            </tr>
          </tbody>
        </table>
        <p>
          Response times are measured from the time we receive your support request during the
          applicable availability window. Response times represent initial acknowledgment, not
          resolution time.
        </p>

        <h2>3. Severity Levels</h2>
        <p>
          When submitting a support request, please indicate the severity level. We may reclassify
          severity based on our assessment of the issue's impact:
        </p>
        <table>
          <thead>
            <tr>
              <th>Severity</th>
              <th>Definition</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Critical</strong></td>
              <td>Service is completely down or unusable for all users</td>
              <td>Platform outage, data loss, complete authentication failure</td>
            </tr>
            <tr>
              <td><strong>High</strong></td>
              <td>A major feature is broken with no workaround available</td>
              <td>API returning errors, deployment failures, data sync broken</td>
            </tr>
            <tr>
              <td><strong>Medium</strong></td>
              <td>A feature is impaired but a workaround exists</td>
              <td>Slow performance, intermittent errors, UI rendering issues</td>
            </tr>
            <tr>
              <td><strong>Low</strong></td>
              <td>General question or minor cosmetic issue</td>
              <td>How-to questions, documentation clarifications, feature requests</td>
            </tr>
          </tbody>
        </table>

        <h2>4. Scope of Support</h2>

        <h3>4.1 What's Covered</h3>
        <ul>
          <li>Yeti Cloud platform issues, outages, and errors</li>
          <li>Configuration and deployment assistance</li>
          <li>Yeti SDK and API questions</li>
          <li>Account and billing inquiries</li>
          <li>Guidance on platform best practices</li>
        </ul>

        <h3>4.2 What's Not Covered</h3>
        <ul>
          <li>Debugging custom application code built on the platform</li>
          <li>Third-party integrations, libraries, or services not provided by Yeti</li>
          <li>Performance tuning of customer-authored queries or application logic</li>
          <li>Training or consulting beyond standard support interactions</li>
          <li>Issues caused by using the platform in violation of
            the <Link to="/legal/acceptable-use">Acceptable Use Policy</Link></li>
        </ul>

        <h2>5. Uptime SLA</h2>
        <p>
          For customers on paid plans (Pro and Enterprise), Yeti commits to a monthly uptime target
          of <strong>99.9%</strong> for the Yeti Cloud platform, measured as the percentage of total
          minutes in a calendar month during which the platform is available.
        </p>
        <ul>
          <li>
            <strong>Measurement</strong> — Uptime is calculated monthly based on server-side
            availability monitoring. Scheduled maintenance windows, announced at least 48 hours in
            advance, are excluded from uptime calculations.
          </li>
          <li>
            <strong>Service credits</strong> — If we fail to meet the 99.9% uptime target in a given
            month, affected customers may request a service credit equal to 10% of that month's fees
            for each full 0.1% below the target, up to a maximum of 30% of that month's fees.
          </li>
          <li>
            <strong>Requesting credits</strong> — To receive a service credit, you must submit a
            request to <a href="mailto:support@yetirocks.com">support@yetirocks.com</a> within 30
            days of the end of the affected month, including the dates and times of the downtime
            experienced.
          </li>
        </ul>
        <p>
          The uptime SLA does not apply to Free tier accounts, beta features, or issues caused by
          factors outside of Yeti's reasonable control (including force majeure events, customer
          network issues, or third-party service failures).
        </p>

        <h2>6. Contact Us</h2>
        <p>
          For support requests, please contact us:
        </p>
        <ul>
          <li>Email: <a href="mailto:support@yetirocks.com">support@yetirocks.com</a></li>
          <li>Documentation: <a href="https://docs.yetirocks.com" target="_blank" rel="noopener noreferrer">docs.yetirocks.com</a></li>
          <li>YetiRocks, LLC, 1712 Pioneer Ave, Suite 500, Cheyenne, WY 82001</li>
        </ul>
      </div>
    </div>
  )
}
