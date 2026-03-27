import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Terms of Service</h1>
        <p className="page-subtitle">Last Updated: March 2026</p>
      </div>
      <div className="legal-content">

        <h2>1. Introduction</h2>
        <p>
          These Terms of Service ("Agreement") are entered into by and between YetiRocks, LLC
          ("Yeti", "we", "us", or "our"), a Wyoming limited liability company
          offices in , and the entity or individual
          ("Customer", "you", or "your") who accesses or uses the Yeti platform or Yeti Cloud
          services. By accessing or using the Services, you agree to be bound by this Agreement. If
          you do not agree, do not use the Services.
        </p>
        <p>
          This Agreement applies to both the Yeti Cloud hosted platform and the locally installed
          Yeti software. Separate license terms may apply to the locally installed Software as
          specified in your Order.
        </p>
        <blockquote>
          <strong>What this means:</strong> By signing up or using Yeti, you are agreeing to these
          terms. If you are accepting on behalf of an organization, you confirm you have authority to
          do so.
        </blockquote>

        <h2>2. Definitions</h2>
        <ul>
          <li><strong>"Customer Data"</strong> means any data, information, or material submitted by Customer to the Platform in the course of using the Services.</li>
          <li><strong>"Documentation"</strong> means the user guides and online documentation made available at <a href="https://docs.yetirocks.com">docs.yetirocks.com</a>, as updated from time to time.</li>
          <li><strong>"Effective Date"</strong> means the date Customer first accesses the Services or the date an Order is executed, whichever is earlier.</li>
          <li><strong>"Order"</strong> means an ordering document or online subscription specifying the Services, fees, and term agreed upon by the parties.</li>
          <li><strong>"Platform"</strong> means the Yeti Cloud hosted application platform, including all associated infrastructure, APIs, and tools.</li>
          <li><strong>"Services"</strong> means the Platform, Support Services, Software, and any other services provided by Yeti under this Agreement.</li>
          <li><strong>"Software"</strong> means the proprietary Yeti application platform binary made available for local installation under a separate license.</li>
          <li><strong>"Usage Data"</strong> means data collected by Yeti relating to Customer's use of the Services, including performance metrics and aggregated usage statistics, but excluding Customer Data.</li>
          <li><strong>"Users"</strong> means individuals authorized by Customer to access and use the Services under Customer's account.</li>
        </ul>

        <h2>3. Services</h2>

        <h3>3.1 Provision of Services</h3>
        <p>
          Subject to the terms of this Agreement and any applicable Order, Yeti will make the
          Platform available to Customer during the term. Yeti will use commercially reasonable
          efforts to maintain availability 24 hours a day, 7 days a week, except for planned
          maintenance and circumstances beyond Yeti's reasonable control.
        </p>

        <h3>3.2 Support</h3>
        <p>
          Yeti will provide technical support in accordance with Customer's subscription tier.
          Support levels and response times are described in the applicable Order or support
          documentation.
        </p>

        <h3>3.3 Applications, Resources, and Extensions</h3>
        <p>
          Customer may develop, deploy, and operate applications, resources, and extensions on the
          Platform. Customer is solely responsible for the content, quality, legality, and
          compliance of all Customer-developed components.
        </p>

        <h3>3.4 Data Protection</h3>
        <p>
          Yeti will maintain reasonable administrative, physical, and technical safeguards to protect
          Customer Data. Yeti's data practices are described in our{' '}
          <Link to="/legal/privacy-policy">Privacy Policy</Link>. Yeti will not access Customer
          Data except as necessary to provide the Services, prevent or address technical problems, or
          as required by law.
        </p>
        <blockquote>
          <strong>What this means:</strong> Your data is yours. We only look at it when we need to
          keep things running or when the law requires it.
        </blockquote>

        <h2>4. Access Rights and Restrictions</h2>

        <h3>4.1 Grant of Rights</h3>
        <p>
          Yeti grants Customer a non-exclusive, non-transferable, non-sublicensable right to access
          and use the Services during the applicable term solely for Customer's internal business
          purposes. For locally installed Software, Customer receives a license to install and run
          the binary on Customer's own infrastructure, subject to the terms of this Agreement and the
          applicable Order.
        </p>

        <h3>4.2 Restrictions</h3>
        <p>Customer shall not:</p>
        <ol>
          <li>Sublicense, sell, lease, or otherwise transfer access to the Services to any third party;</li>
          <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Platform or Software;</li>
          <li>Create derivative works based on the Platform or Software;</li>
          <li>Copy, frame, or mirror any part of the Platform;</li>
          <li>Access or use the Services to build a competitive product or service;</li>
          <li>Use the Services in violation of applicable law;</li>
          <li>Interfere with or disrupt the integrity or performance of the Platform;</li>
          <li>Attempt to gain unauthorized access to the Platform or its related systems.</li>
        </ol>
        <blockquote>
          <strong>What this means:</strong> Use Yeti for your business. Do not copy it, reverse
          engineer it, or use it to build a competing product.
        </blockquote>

        <h3>4.3 Users</h3>
        <p>
          Customer is responsible for all activities conducted under its Users' accounts. Customer
          shall ensure that Users comply with this Agreement and shall be liable for any breach by
          a User.
        </p>

        <h2>5. Fees and Payment</h2>

        <h3>5.1 Fees</h3>
        <p>
          Customer shall pay all fees specified in the applicable Order. All fees are quoted and
          payable in U.S. dollars (USD) unless otherwise specified in writing.
        </p>

        <h3>5.2 Payment Terms</h3>
        <p>
          Unless otherwise specified in an Order, fees are due within thirty (30) days of the
          invoice date. Late payments accrue interest at the lesser of 1.5% per month or the maximum
          rate permitted by applicable law.
        </p>

        <h3>5.3 Taxes</h3>
        <p>
          All fees are exclusive of taxes. Customer is responsible for all applicable taxes, duties,
          and governmental assessments (including VAT and IVA), excluding taxes based on Yeti's net
          income.
        </p>
        <blockquote>
          <strong>What this means:</strong> Prices are in USD. You pay within 30 days of the
          invoice, plus any applicable taxes.
        </blockquote>

        <h2>6. Term and Termination</h2>

        <h3>6.1 Term</h3>
        <p>
          This Agreement commences on the Effective Date and continues until all Orders have expired
          or been terminated, or until the Agreement is terminated as provided herein.
        </p>

        <h3>6.2 Auto-Renewal</h3>
        <p>
          Unless otherwise stated, each Order automatically renews for successive periods equal to
          the initial term unless either party provides written notice of non-renewal at least thirty
          (30) days before the end of the then-current term.
        </p>

        <h3>6.3 Termination for Cause</h3>
        <p>
          Either party may terminate this Agreement or any Order upon thirty (30) days' written
          notice if the other party materially breaches and fails to cure within that thirty-day
          period. Either party may terminate immediately if the other party becomes insolvent, files
          for bankruptcy, or ceases operations.
        </p>

        <h3>6.4 Effects of Termination</h3>
        <p>
          Upon termination: (a) Customer's access to the Platform will cease; (b) Customer shall pay
          all outstanding fees; (c) each party shall return or destroy Confidential Information of
          the other party; (d) Yeti will make Customer Data available for export for thirty (30) days
          after termination, after which Yeti may delete it.
        </p>
        <blockquote>
          <strong>What this means:</strong> Subscriptions auto-renew. Either side can cancel with
          notice. After termination, you have 30 days to export your data.
        </blockquote>

        <h2>7. Intellectual Property</h2>

        <h3>7.1 Yeti Ownership</h3>
        <p>
          Yeti and its licensors retain all right, title, and interest in and to the Platform,
          Software, Services, Documentation, and all related intellectual property. The Platform and
          Software are proprietary and closed-source. No rights are granted to Customer except as
          expressly set forth in this Agreement.
        </p>

        <h3>7.2 Customer Data Ownership</h3>
        <p>
          Customer retains all right, title, and interest in and to Customer Data. Customer grants
          Yeti a limited, non-exclusive license to use Customer Data solely to provide the Services.
        </p>

        <h3>7.3 Usage Data</h3>
        <p>
          Yeti may collect and use Usage Data to operate, improve, and support the Services. Yeti may
          use aggregated and anonymized Usage Data for any lawful business purpose, provided such
          data cannot identify Customer or any individual.
        </p>

        <h3>7.4 Feedback</h3>
        <p>
          If Customer provides suggestions, enhancement requests, or other feedback regarding the
          Services, Yeti may freely use such feedback without obligation or compensation to Customer.
        </p>
        <blockquote>
          <strong>What this means:</strong> We own the platform. You own your data. If you suggest a
          feature, we may build it without owing you anything.
        </blockquote>

        <h2>8. Warranty and Disclaimers</h2>

        <h3>8.1 Limited Warranty</h3>
        <p>
          Yeti warrants that the Services will perform materially in accordance with the
          Documentation during the term. Customer's exclusive remedy for breach of this warranty is
          re-performance of the deficient Services or, if Yeti cannot remedy the deficiency within
          thirty (30) days, termination of the affected Order and a pro-rata refund of prepaid fees.
        </p>

        <h3>8.2 Disclaimer</h3>
        <p>
          EXCEPT AS EXPRESSLY PROVIDED IN SECTION 8.1, THE SERVICES ARE PROVIDED "AS IS" AND "AS
          AVAILABLE." YETI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. YETI DOES NOT
          WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
        </p>
        <blockquote>
          <strong>What this means:</strong> We stand behind the platform working as documented. Beyond
          that, we provide the service as-is without additional promises.
        </blockquote>

        <h2>9. Limitation of Liability</h2>

        <h3>9.1 Liability Cap</h3>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY'S AGGREGATE LIABILITY ARISING OUT OF
          OR RELATED TO THIS AGREEMENT SHALL EXCEED THE TOTAL FEES PAID OR PAYABLE BY CUSTOMER IN
          THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY.
        </p>

        <h3>9.2 No Consequential Damages</h3>
        <p>
          IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS
          OPPORTUNITY, HOWEVER CAUSED, WHETHER IN CONTRACT, TORT, OR UNDER ANY OTHER THEORY OF
          LIABILITY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>

        <h3>9.3 Exceptions</h3>
        <p>
          The limitations in this Section 9 shall not apply to: (a) breach of Section 10
          (Confidentiality); (b) Customer's payment obligations; or (c) either party's willful
          misconduct or gross negligence.
        </p>
        <blockquote>
          <strong>What this means:</strong> If something goes wrong, the most either side would owe
          is the fees paid over the prior 12 months. Neither side is liable for indirect losses.
        </blockquote>

        <h2>10. Confidentiality</h2>

        <h3>10.1 Definition</h3>
        <p>
          "Confidential Information" means all non-public information disclosed by one party to the
          other, whether orally or in writing, that is designated as confidential or that reasonably
          should be understood to be confidential given the nature of the information.
        </p>

        <h3>10.2 Obligations</h3>
        <p>
          Each party agrees to: (a) protect the other party's Confidential Information using at
          least the same degree of care it uses for its own confidential information, but no less
          than reasonable care; (b) not disclose Confidential Information except as necessary to
          perform under this Agreement; and (c) not use Confidential Information for any purpose
          other than fulfilling obligations under this Agreement.
        </p>

        <h3>10.3 Exclusions</h3>
        <p>
          Confidential Information does not include information that: (a) is or becomes publicly
          available through no fault of the receiving party; (b) was known to the receiving party
          prior to disclosure; (c) is received from a third party without restriction; or (d) is
          independently developed without use of the disclosing party's Confidential Information.
        </p>

        <h2>11. General Provisions</h2>

        <h3>11.1 Governing Law</h3>
        <p>
          This Agreement shall be governed by and construed in accordance with the federal laws of
          Wyoming. Any disputes arising under this Agreement shall be subject to the exclusive
          jurisdiction of the state and federal courts located in Wyoming.
        </p>
        <blockquote>
          <strong>What this means:</strong> Wyoming law applies. Disputes are resolved in
          Wyoming.
        </blockquote>

        <h3>11.2 Independent Contractor</h3>
        <p>
          The parties are independent contractors. Nothing in this Agreement creates a partnership,
          joint venture, agency, or employment relationship between the parties.
        </p>

        <h3>11.3 Force Majeure</h3>
        <p>
          Neither party shall be liable for any failure or delay in performance due to causes beyond
          its reasonable control, including natural disasters, acts of government, war, terrorism,
          pandemics, labor disputes, or internet or utility failures.
        </p>

        <h3>11.4 Assignment</h3>
        <p>
          Neither party may assign this Agreement without the other party's prior written consent,
          except in connection with a merger, acquisition, or sale of all or substantially all of its
          assets.
        </p>

        <h3>11.5 Modification</h3>
        <p>
          Yeti may update this Agreement from time to time. Material changes will be communicated
          with at least thirty (30) days' notice. Continued use of the Services after such changes
          constitutes acceptance of the updated terms.
        </p>

        <h3>11.6 Severability</h3>
        <p>
          If any provision of this Agreement is held to be invalid or unenforceable, the remaining
          provisions shall continue in full force and effect.
        </p>

        <h3>11.7 Entire Agreement</h3>
        <p>
          This Agreement, together with all Orders and referenced policies, constitutes the entire
          agreement between the parties and supersedes all prior agreements, representations, and
          understandings relating to its subject matter.
        </p>

        <h3>11.8 Contact</h3>
        <p>
          Questions about these terms should be directed to:{' '}
          <a href="mailto:legal@yetirocks.com">legal@yetirocks.com</a>
        </p>
        <p>YetiRocks, LLC<br />1712 Pioneer Ave, Suite 500<br />Cheyenne, WY 82001</p>

      </div>
    </div>
  )
}
