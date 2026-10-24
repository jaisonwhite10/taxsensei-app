
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const isPrivacyPolicy =
    window.location.pathname.replace(/\/+$/, '') === '/privacy-policy';

  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} J.W. Tax Pro. All rights reserved.
      </p>

      <div className="footer-links">
        {isPrivacyPolicy ? (
          <a href="/">Back to Home</a>
        ) : (
          <a href="/privacy-policy">Privacy Policy</a>
        )}
      </div>
    </footer>
  );
}

export default Footer;
