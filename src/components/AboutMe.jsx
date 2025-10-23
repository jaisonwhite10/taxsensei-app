import React from 'react';
import '../styles/AboutMe.css';

function AboutMe() {
  return (
    <section id="about-me">
      <div className="about-container">
        <div className="about-content">
          {/* <div className="about-image">
            <img 
              src="/images/headshot.jpg" 
              alt="Jaison - Tax Professional" 
              className="profile-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Jaison';
              }}
            />
          </div> */}
          <div className="about-text">
            <h1>About Me</h1>
            <div className="bio">
              <p>
               Hi, I am Jaison — a dedicated tax professional with a Bachelor of Science in Accounting from Ithaca College and nearly a decade of experience helping individuals and families confidently manage their taxes.
              </p>
              <p>
                I began my career with the VITA program at Alternatives Federal Credit Union, where I prepared and reviewed tax returns for many low-income residents in the community. From there, I transitioned to H&R Block, assisting and managing clients through a wide range of tax situations. After my time at H&R Block, I joined TurboTax, where I have spent the past several years providing personalized guidance and preparing returns for clients across the country.
              </p>
              <p>
                Tax season can often feel stressful and complicated. My goal is to make the process simple, transparent, and less daunting — offering trusted, accurate, and efficient service tailored to your needs. Whether you’re filing a straightforward return, navigating a more complex tax situation, or simply looking for a professional to review your return or provide advice, I am here to help
              </p>
              <p>
                If you are looking for support to make tax season easier and more manageable, please do not hesitate to contact me below — I would be happy to help you every step of the way.
              </p>
            </div>
            <div className="credentials">
              {/* <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Certified Public Accountant (CPA)</span>
              </div> */}
              <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>7+ Years Experience</span>
              </div>
              {/* <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>200+ Satisfied Clients</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;