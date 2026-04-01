import { Link } from '@tanstack/react-router'

export default function SoftwareLicense() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Software License Agreement</h1>
        <p className="page-subtitle">Last Updated: March 2026</p>
      </div>
      <div className="legal-content">
        <p>
          This Software License Agreement ("Agreement") is a legal agreement between YetiRocks, LLC,
          a Wyoming limited liability company
          ("Yeti", "we", "us", or "our"), and the entity or individual ("Customer", "you", or "your") who
          downloads, installs, or uses the Yeti software platform. By installing or using the Software, you agree
          to be bound by this Agreement. If you do not agree, do not install or use the Software.
        </p>

        <p>
          This Agreement governs locally installed copies of the Yeti platform binary. For the hosted cloud
          service, please refer to our <Link to="/legal/terms-of-service">Terms of Service</Link>.
        </p>

        <h2>1. Grant of License</h2>

        <p>
          Subject to the terms of this Agreement and payment of applicable fees, Yeti grants you a limited,
          non-exclusive, non-transferable, non-sublicensable license to install and use the Yeti software
          binary ("Software") solely for your internal business purposes. The license is granted on a
          per-device or per-organization basis as specified in your Order or subscription tier.
        </p>

        <p>
          <strong>What this means:</strong> You can install and run Yeti on the devices or within the
          organization covered by your license. You cannot share your license with other companies or
          transfer it to someone else.
        </p>

        <h2>2. Ownership</h2>

        <p>
          The Software, including all copies, modifications, enhancements, and derivative works, is and
          remains the exclusive property of Yeti and its licensors. The Software is protected by copyright,
          trade secret, and other intellectual property laws. The source code of the Software constitutes a
          trade secret of Yeti and is not provided, distributed, or made available to Customer under any
          circumstances.
        </p>

        <p>
          No title to or ownership of the Software or any intellectual property rights therein is transferred
          to Customer. All rights not expressly granted in this Agreement are reserved by Yeti.
        </p>

        <p>
          <strong>What this means:</strong> You are licensing the right to use the software, not buying it.
          The code behind Yeti is proprietary and confidential. You receive a compiled binary, not source code.
        </p>

        <h2>3. Restrictions</h2>

        <p>Customer shall not, and shall not permit any third party to:</p>
        <ol>
          <li>
            Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code,
            algorithms, or data structures of the Software;
          </li>
          <li>
            Copy, redistribute, sublicense, rent, lease, sell, or otherwise transfer the Software or any
            rights therein to any third party;
          </li>
          <li>
            Use the Software to build or contribute to a product or service that competes with Yeti;
          </li>
          <li>
            Publish benchmarks or performance comparisons of the Software without Yeti's prior written
            consent;
          </li>
          <li>
            Remove, alter, or obscure any proprietary notices, labels, or marks on or in the Software;
          </li>
          <li>
            Use the Software in excess of the license quantities or scope specified in your Order;
          </li>
          <li>
            Circumvent or disable any license enforcement, authentication, or security mechanisms in
            the Software.
          </li>
        </ol>

        <p>
          <strong>What this means:</strong> Do not try to extract our source code, share the software with
          others outside your license, or use it to build a competing product. If you want to publish
          benchmarks, ask us first.
        </p>

        <h2>4. Customer Applications</h2>

        <p>
          Yeti provides a Software Development Kit ("SDK") and plugin API that enable you to build
          applications, resources, and extensions ("Customer Applications") that run on the Yeti platform.
          Customer retains all right, title, and interest in and to Customer Applications developed by or
          on behalf of Customer, including all intellectual property rights therein.
        </p>

        <p>
          The SDK and plugin API are licensed to Customer solely for the purpose of developing Customer
          Applications for use with the Software. The SDK and plugin API remain the intellectual property
          of Yeti and are subject to the restrictions in Section 3.
        </p>

        <p>
          <strong>What this means:</strong> The apps, plugins, and extensions you build using our SDK
          belong to you. We provide the tools to build on our platform, but we do not claim ownership over
          what you create. However, the SDK and API themselves are still our property.
        </p>

        <h2>5. Updates and Support</h2>

        <p>
          Yeti may, at its sole discretion, provide updates, patches, or new versions of the Software.
          Updates may be required to continue using certain features or to maintain compatibility.
          Yeti is under no obligation to provide any updates, maintenance, or support unless specified
          in a separate support agreement or Order.
        </p>

        <p>
          Support services, when available, may require that Customer is running a current or supported
          version of the Software. Yeti reserves the right to discontinue support for older versions
          with reasonable notice.
        </p>

        <p>
          <strong>What this means:</strong> We regularly release updates, but we are not obligated to
          do so. If you need guaranteed support, make sure you have a support agreement and keep your
          installation up to date.
        </p>

        <h2>6. Term and Termination</h2>

        <h3>6.1 Paid Licenses</h3>
        <p>
          For paid license tiers, this Agreement is effective from the date you first install or use the
          Software and continues in perpetuity, subject to compliance with this Agreement and payment of
          applicable fees. Yeti may terminate this Agreement upon thirty (30) days' written notice if
          Customer materially breaches any term and fails to cure the breach within that period.
        </p>

        <h3>6.2 Free Tier</h3>
        <p>
          For free or evaluation licenses, the license is revocable at any time at Yeti's sole discretion,
          with or without cause, upon notice to Customer.
        </p>

        <h3>6.3 Effect of Termination</h3>
        <p>
          Upon termination, Customer shall immediately cease all use of the Software and destroy all copies
          in Customer's possession or control. Sections 2, 3, 7, 8, 9, and 10 shall survive termination.
          Termination does not affect Customer's ownership of Customer Applications under Section 4, though
          Customer Applications may not function without a valid Yeti license.
        </p>

        <p>
          <strong>What this means:</strong> Paid licenses last as long as you follow the rules and pay your
          fees. Free licenses can be revoked at any time. If the license ends, you must stop using the
          software, but you still own the applications you built.
        </p>

        <h2>7. Warranty Disclaimer</h2>

        <p>
          THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED. YETI DISCLAIMS ALL WARRANTIES, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. YETI DOES NOT
          WARRANT THAT THE SOFTWARE WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE OF HARMFUL COMPONENTS.
        </p>

        <p>
          <strong>What this means:</strong> We work hard to deliver reliable software, but we cannot
          guarantee it will be perfect or never have issues. You accept the software in its current state.
        </p>

        <h2>8. Limitation of Liability</h2>

        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL YETI OR ITS OFFICERS,
          DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR
          BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE USE OF OR INABILITY
          TO USE THE SOFTWARE, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY.
        </p>

        <p>
          YETI'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED
          THE TOTAL FEES PAID BY CUSTOMER TO YETI FOR THE SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING
          THE EVENT GIVING RISE TO THE CLAIM. FOR FREE-TIER LICENSES, YETI'S TOTAL LIABILITY SHALL NOT
          EXCEED FIFTY U.S. DOLLARS (USD $50.00).
        </p>

        <p>
          <strong>What this means:</strong> If something goes wrong, our financial responsibility is
          limited to what you have paid us in the last year. We are not liable for indirect damages
          like lost profits.
        </p>

        <h2>9. Export Controls</h2>

        <p>
          The Software may be subject to export control laws and regulations, including those of the
          United States and other applicable jurisdictions. Customer shall not export, re-export, or
          transfer the Software in violation of any applicable export control laws or regulations.
          Customer represents that it is not located in, under the control of, or a national or
          resident of any country or territory subject to comprehensive trade sanctions.
        </p>

        <p>
          <strong>What this means:</strong> You are responsible for making sure your use of the
          software complies with trade and export laws in your country.
        </p>

        <h2>10. General</h2>

        <h3>10.1 Governing Law</h3>
        <p>
          This Agreement shall be governed by and construed in accordance with the laws of the State of Wyoming,
          without regard to its conflict of laws provisions. Any disputes arising under this Agreement
          shall be subject to the exclusive jurisdiction of the state and federal courts located in
          Laramie County, Wyoming.
        </p>

        <h3>10.2 Entire Agreement</h3>
        <p>
          This Agreement, together with any applicable Order, constitutes the entire agreement between
          the parties with respect to the subject matter hereof and supersedes all prior or
          contemporaneous agreements, understandings, and communications, whether written or oral.
        </p>

        <h3>10.3 Severability</h3>
        <p>
          If any provision of this Agreement is held to be invalid or unenforceable, the remaining
          provisions shall continue in full force and effect.
        </p>

        <h3>10.4 Waiver</h3>
        <p>
          No failure or delay by Yeti in exercising any right under this Agreement shall constitute
          a waiver of that right. A waiver of any breach shall not constitute a waiver of any
          subsequent breach.
        </p>

        <h3>10.5 Assignment</h3>
        <p>
          Customer may not assign or transfer this Agreement without Yeti's prior written consent.
          Yeti may assign this Agreement in connection with a merger, acquisition, or sale of all or
          substantially all of its assets.
        </p>

        <h3>10.6 Notices</h3>
        <p>
          All notices under this Agreement shall be in writing and sent to the addresses specified in
          the applicable Order. Notices to Yeti shall be sent to: YetiRocks, LLC,
          1712 Pioneer Ave, Suite 500, Cheyenne, WY 82001;
          email: <a href="mailto:legal@yetirocks.com">legal@yetirocks.com</a>.
        </p>

        <h3>10.7 Modification</h3>
        <p>
          Yeti may update this Agreement from time to time. Material changes will be communicated
          with at least thirty (30) days' notice. Continued use of the Software after such changes
          constitutes acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
}
