
import React from 'react';
import '../styles/PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <section id="privacy-policy">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p className="privacy-updated">
          Last updated: October 23, 2026
        </p>

        <div className="privacy-content">
          <p>
            TaxSensei, operated by Jaison White, an Enrolled Agent,
            respects your privacy and is committed to protecting the
            personal information you share with us. This Privacy Policy
            explains what information we collect, how we use it, and
            the choices you have when using our website and services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            Depending on how you interact with TaxSensei, we may collect
            the following types of information:
          </p>
          <ul>
            <li>
              <strong>Contact information:</strong> Your name, email
              address, and any information you provide when submitting
              a contact form.
            </li>
            <li>
              <strong>Appointment information:</strong> Your name,
              email address, selected appointment date and time, and
              any notes you voluntarily provide when booking an
              appointment.
            </li>
            <li>
              <strong>Tax and service information:</strong> Information
              you voluntarily provide when requesting or receiving tax
              preparation, tax planning, bookkeeping, or IRS
              representation services.
            </li>
            <li>
              <strong>Technical information:</strong> Limited
              information that may be collected by hosting providers
              or other website services, such as browser information,
              IP address, and diagnostic logs.
            </li>
          </ul>

          <p>
            Please do not submit Social Security numbers, tax returns,
            financial account numbers, passwords, or other sensitive
            tax documents through the public contact form. Use an
            appropriate secure method provided by TaxSensei when
            exchanging sensitive tax information.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We may use your information to:</p>
          <ul>
            <li>Respond to questions and service inquiries.</li>
            <li>Schedule and manage appointments.</li>
            <li>Provide requested tax and related professional services.</li>
            <li>Send appointment or inquiry confirmations when applicable.</li>
            <li>Maintain business records and improve our services.</li>
            <li>Protect the website and help prevent fraud or misuse.</li>
            <li>
              Comply with applicable legal, regulatory, and professional
              obligations.
            </li>
          </ul>

          <h2>3. Contact Forms and Email Communications</h2>
          <p>
            When you submit a contact form, the information you provide
            may be processed by our website infrastructure and
            Supabase services and transmitted to our business email
            account so we can respond to your inquiry.
          </p>
          <p>
            If email confirmations are enabled, we may also use your
            email address to send a confirmation regarding your
            inquiry. Submitting a contact form does not automatically
            establish an ongoing professional relationship.
          </p>

          <h2>4. Google Services and Gmail API</h2>
          <p>
            TaxSensei uses Google services, including the Gmail API,
            to support email communications associated with website
            inquiries.
          </p>
          <p>
            When authorized, the application uses Google's
            authorization system to obtain permission to send emails
            from the connected Gmail account. The application uses
            the Gmail API for the purpose of sending inquiry
            notifications and, if enabled, customer confirmation
            messages.
          </p>
          <p>
            TaxSensei does not use Gmail API data to serve
            advertisements, sell personal information, or create
            advertising profiles. Google user data is not transferred
            to third parties except as necessary to provide the
            requested email functionality, comply with applicable
            law, or as otherwise permitted by the applicable Google
            API policies and your authorization.
          </p>
          <p>
            TaxSensei's use and transfer of information received
            from Google APIs will comply with the Google API Services
            User Data Policy, including the Limited Use requirements.
          </p>

          <h2>5. How We Share Information</h2>
          <p>
            We do not sell your personal information. We may disclose
            information only when reasonably necessary for purposes
            such as:
          </p>
          <ul>
            <li>
              Operating the website and delivering requested services
              through service providers, such as Supabase, website
              hosting providers, and Google.
            </li>
            <li>
              Responding to lawful requests or meeting legal and
              professional obligations.
            </li>
            <li>
              Protecting the rights, security, and integrity of
              TaxSensei, its clients, or others.
            </li>
          </ul>
          <p>
            Service providers may process information on our behalf
            under their applicable terms, policies, and security
            practices.
          </p>

          <h2>6. Data Retention and Security</h2>
          <p>
            We retain personal information for as long as reasonably
            necessary to respond to inquiries, manage appointments,
            provide services, maintain appropriate business and tax
            records, and meet applicable legal obligations.
          </p>
          <p>
            We use reasonable administrative and technical measures
            intended to protect personal information. However, no
            website, email transmission, or electronic storage system
            can be guaranteed to be completely secure.
          </p>

          <h2>7. Your Choices and Rights</h2>
          <p>
            You may contact us to request access to, correction of,
            or deletion of personal information, subject to applicable
            law and any record-retention obligations.
          </p>
          <p>
            You can also choose not to submit information through
            our website. If you have authorized Google access for
            email functionality, you can manage or revoke that access
            through your Google Account security settings. Revoking
            access may prevent the associated email functionality
            from working.
          </p>

          <h2>8. Third-Party Services and Links</h2>
          <p>
            Our website may rely on or link to third-party services.
            Those services have their own privacy policies and
            practices. TaxSensei is not responsible for the privacy
            practices of independent third-party websites.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our website is intended for individuals seeking
            professional tax-related services and is not directed
            toward children under 13. We do not knowingly collect
            personal information online from children under 13
            without legally required consent.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to
            reflect changes in our services, technology, or legal
            obligations. Any updates will be posted on this page
            with a revised "Last updated" date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how
            your information is handled, please contact TaxSensei
            through the contact form on our website.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
