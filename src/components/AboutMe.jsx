import React from 'react';
import '../styles/AboutMe.css';

function AboutMe() {
  return (
    <section id="about-me">
      <div className="about-container">
        <h1 style={{marginBottom: 30, textAlign: 'center', fontSize: '2.5rem'}}>About Me</h1>
        <div className="about-content">
          {/* <div className="about-left">
            {/* <div className="about-image">
              <img 
                src={`${process.env.PUBLIC_URL}/images/headshot.jpg`} 
                alt="Jaison - Enrolled Agent" 
                className="profile-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Jaison';
                }}
              />
            </div> */}
            {/* <h1 className="profile-name">Jaison White</h1>
            <h3 className="profile-title">Enrolled Agent</h3> */}
            {/* <div className="credentials">
               {/* <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Certified Public Accountant (CPA)</span>
              </div> */}
              {/* <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>7+ Years Experience</span>
              </div> */}
               {/* <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>200+ Satisfied Clients</span>
              </div> */}
            {/* </div> */}
          {/* </div> */}

          <div className="about-text">
            <div className="bio">
              <p>
                Hi, I’m Jaison — an Enrolled Agent (EA) and dedicated tax professional with a Bachelor of Science in Accounting from Ithaca College and nearly a decade of experience helping individuals and families confidently manage their taxes.              </p>
              <p>
                As an Enrolled Agent, I specialize in helping taxpayers navigate their tax needs, from preparing accurate tax returns and identifying opportunities for tax savings to providing tax planning guidance. I am also federally authorized to represent clients before the IRS.  My goal is to help you not only meet your tax obligations but also better understand your tax situation and make informed financial decisions throughout the year.              </p>
              <p>
                I began my career with the VITA program at Alternatives Federal Credit Union, where I prepared and reviewed tax returns for many low-income residents in the community. From there, I transitioned to H&R Block, assisting and managing clients through a wide range of tax situations. After my time at H&R Block, I joined TurboTax, where I have spent the past several years providing personalized guidance and preparing returns for clients across the country.              </p>
              <p>
                Tax season can often feel stressful and complicated. My goal is to make the process simple, transparent, and less daunting by offering trusted, accurate, and efficient service tailored to your needs. Whether you're filing an individual tax return, navigating self-employment income, looking for ways to plan ahead and minimize your tax liability, or need professional guidance with an IRS matter, I am here to help.              </p>
              <p>
                I believe professional tax assistance should be approachable, personalized, and focused on your individual needs. I take pride in helping clients understand their taxes, answering their questions, and providing guidance they can feel confident in — without making the process more complicated than it needs to be.
              </p>
              <p>
                If you're looking for knowledgeable, professional, and personalized tax support, please don't hesitate to contact me below. I would be happy to help you navigate your tax needs with confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;