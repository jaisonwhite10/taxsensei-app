
import React from 'react';
import '../styles/PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <section id="privacy-policy">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p className="privacy-updated">
          Last updated: October 25, 2026
        </p>

        <div className="privacy-content">
          <p>
            Jaison White, an Enrolled Agent, respects your privacy
            and is committed to protecting the personal information
            you share with him. This Privacy Policy explains what
            information is collected, how it is used, and the choices
            you have when using this website and the services provided
            by Jaison White.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            Depending on how you interact with this website and
            Jaison White's services, the following types of information
            may be collected:
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
              representation services from Jaison White.
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
            appropriate secure method provided by Jaison White when
            exchanging sensitive tax information.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>Your information may be used to:</p>
          <ul>
            <li>Respond to questions and service inquiries.</li>
            <li>Schedule and manage appointments.</li>
            <li>Provide requested tax and related professional services.</li>
            <li>Send appointment or inquiry confirmations when applicable.</li>
            <li>Maintain business records and improve services.</li>
            <li>Protect the website and help prevent fraud or misuse.</li>
            <li>
              Comply with applicable legal, regulatory, and professional
              obligations.
            </li>
          </ul>

          <h2>3. Contact Forms and Email Communications</h2>
          <p>
            When you submit a contact form, the information you provide
            may be processed by the website's infrastructure and
            Supabase services and transmitted to Jaison White's email
            account so he can respond to your inquiry.
          </p>
          <p>
            If email confirmations are enabled, your email address
            may also be used to send a confirmation regarding your
            inquiry. Submitting a contact form does not automatically
            establish an ongoing professional relationship with
            Jaison White.
          </p>

          <h2>4. Google Services and Gmail API</h2>
          <p>
            Jaison White uses Google services, including the Gmail API,
            to support email communications associated with website
            inquiries.
          </p>
          <p>
            The application uses Google's authorization system to
            obtain permission to send emails from the connected Gmail
            account. The Gmail API is used to send inquiry notifications
            and, if enabled, customer confirmation messages.
          </p>
          <p>
            Gmail API data is not used to serve advertisements, sell
            personal information, or create advertising profiles.
            Google user data is not transferred to third parties except
            as necessary to provide the requested email functionality,
            comply with applicable law, or as otherwise permitted by
            applicable Google API policies and your authorization.
          </p>
          <p>
            Jaison White's use and transfer of information received
            from Google APIs will comply with the Google API Services
            User Data Policy, including the Limited Use requirements.
          </p>

          <h2>5. How We Share Information</h2>
          <p>
            Jaison White does not sell your personal information.
            Information may be disclosed only when reasonably necessary
            for purposes such as:
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
              Jaison White, his clients, or others.
            </li>
          </ul>
          <p>
            Service providers may process information on Jaison White's
            behalf under their applicable terms, policies, and security
            practices.
          </p>

          <h2>6. Data Retention and Security</h2>
          <p>
            Personal information is retained for as long as reasonably
            necessary to respond to inquiries, manage appointments,
            provide services, maintain appropriate business and tax
            records, and meet applicable legal obligations.
          </p>
          <p>
            Reasonable administrative and technical measures are used
            to help protect personal information. However, no website,
            email transmission, or electronic storage system can be
            guaranteed to be completely secure.
          </p>

          <h2>7. Your Choices and Rights</h2>
          <p>
            You may contact Jaison White to request access to,
            correction of, or deletion of personal information, subject
            to applicable law and any record-retention obligations.
          </p>
          <p>
            You can also choose not to submit information through this
            website. If you have authorized Google access for email
            functionality, you can manage or revoke that access through
            your Google Account security settings. Revoking access may
            prevent the associated email functionality from working.
          </p>

          <h2>8. Third-Party Services and Links</h2>
          <p>
            This website may rely on or link to third-party services.
            Those services have their own privacy policies and
            practices. Jaison White is not responsible for the privacy
            practices of independent third-party websites.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            This website is intended for individuals seeking
            professional tax-related services and is not directed
            toward children under 13. Personal information is not
            knowingly collected online from children under 13 without
            legally required consent.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            Jaison White may update this Privacy Policy from time to
            time to reflect changes in services, technology, or legal
            obligations. Updates will be posted on this page with a
            revised "Last updated" date.
          </p>

          <h2>11. Contact</h2>
          <p>
            If you have questions about this Privacy Policy or how
            your information is handled, please contact Jaison White
            through the contact form on this website.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
