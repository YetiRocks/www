import { Link } from '@tanstack/react-router'

export default function AcceptableUse() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Acceptable Use Policy</h1>
        <p className="page-subtitle">Last Updated: March 2026</p>
      </div>
      <div className="legal-content">
        <p>
          This Acceptable Use Policy ("AUP") governs your use of the Yeti Cloud platform and
          related services provided by YetiRocks, LLC ("Yeti", "we", "us", or
          "our"). This AUP is incorporated
          into and forms part of our <Link to="/legal/terms-of-service">Terms of Service</Link>.
        </p>

        <h2>1. Purpose</h2>
        <p>
          This policy exists to protect the security, performance, and availability of the Yeti
          Cloud platform for all customers. We expect all users to use the platform responsibly
          and in compliance with applicable laws. Violations of this policy may result in suspension
          or termination of your account.
        </p>

        <h2>2. Prohibited Content</h2>
        <p>You may not use the Services to store, transmit, or distribute:</p>
        <ul>
          <li>
            <strong>Illegal content</strong> — Any material that violates applicable local, state,
            national, or international law, including content related to illegal gambling, controlled
            substances, or exploitation of minors.
          </li>
          <li>
            <strong>Malware</strong> — Viruses, trojans, ransomware, spyware, or any other malicious
            software or code designed to damage, disrupt, or gain unauthorized access to systems.
          </li>
          <li>
            <strong>Spam</strong> — Unsolicited bulk messages, whether commercial or otherwise,
            including phishing attempts and deceptive communications.
          </li>
          <li>
            <strong>Harassment</strong> — Content that threatens, stalks, intimidates, defames, or
            incites violence against any individual or group.
          </li>
          <li>
            <strong>Intellectual property violations</strong> — Content that infringes on copyrights,
            trademarks, trade secrets, patents, or other intellectual property rights of any third party.
          </li>
        </ul>

        <h2>3. Prohibited Actions</h2>
        <p>You may not use the Services to:</p>
        <ul>
          <li>
            <strong>Cryptocurrency mining</strong> — Run cryptocurrency miners or proof-of-work
            computations of any kind on platform infrastructure.
          </li>
          <li>
            <strong>Denial-of-service attacks</strong> — Launch, facilitate, or participate in
            distributed denial-of-service (DDoS) attacks or other network flooding activities,
            whether targeting Yeti infrastructure or third-party systems.
          </li>
          <li>
            <strong>Unauthorized access</strong> — Attempt to access accounts, systems, or data
            belonging to other customers or to Yeti without explicit authorization. This includes
            port scanning, vulnerability probing, and credential stuffing.
          </li>
          <li>
            <strong>Automated scraping</strong> — Systematically extract data from the platform or
            other customers' applications through automated means without written permission.
          </li>
          <li>
            <strong>Competitive benchmarking</strong> — Access or use the Services for the purpose
            of building a competing product, conducting competitive analysis, or publishing
            performance benchmarks without prior written consent from Yeti.
          </li>
        </ul>

        <h2>4. Resource Limits</h2>
        <p>
          Yeti Cloud operates on a fair-use model. All customers share underlying infrastructure,
          and we expect responsible resource consumption:
        </p>
        <ul>
          <li>
            <strong>Fair use</strong> — Resource usage should be consistent with normal application
            workloads. Sustained consumption that significantly exceeds your plan's intended capacity
            may be throttled or require a plan upgrade.
          </li>
          <li>
            <strong>No cryptocurrency mining</strong> — Compute resources may not be used for mining,
            hashing, or any blockchain proof-of-work operations.
          </li>
          <li>
            <strong>No excessive storage abuse</strong> — The platform is designed for application
            data. Using storage for bulk file hosting, media archives, backups of external systems,
            or other purposes unrelated to your Yeti applications is not permitted.
          </li>
        </ul>

        <h2>5. Enforcement</h2>
        <p>
          We enforce this policy progressively, taking into account the severity and intent of the
          violation:
        </p>
        <ol>
          <li>
            <strong>Warning</strong> — For first-time or minor violations, we will notify you and
            request that you correct the issue within a reasonable timeframe.
          </li>
          <li>
            <strong>Suspension</strong> — For repeated or serious violations, we may temporarily
            suspend your access to the platform while the issue is investigated and resolved.
          </li>
          <li>
            <strong>Termination</strong> — For severe violations, willful misconduct, or failure to
            remedy a violation after warning, we may permanently terminate your account.
          </li>
          <li>
            <strong>No refund for violations</strong> — If your account is terminated due to a
            violation of this policy, you are not entitled to a refund of any prepaid fees.
          </li>
        </ol>
        <p>
          We reserve the right to take immediate action without prior notice when a violation poses
          an imminent threat to the security, integrity, or availability of the platform.
        </p>

        <h2>6. Reporting Violations</h2>
        <p>
          If you become aware of any activity that violates this policy, please report it to us
          promptly:
        </p>
        <ul>
          <li>Email: <a href="mailto:abuse@yetirocks.com">abuse@yetirocks.com</a></li>
          <li>YetiRocks, LLC, 1712 Pioneer Ave, Suite 500, Cheyenne, WY 82001</li>
        </ul>
        <p>
          We take all reports seriously and will investigate promptly. Please include as much detail
          as possible, including URLs, timestamps, and descriptions of the activity in question.
        </p>
      </div>
    </div>
  )
}
