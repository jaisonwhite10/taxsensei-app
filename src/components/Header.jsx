import React from 'react';
import '../styles/Header.css';



function Header() {
  return (
    <section id="title" className="gradient-background">
      <div className="container">
        <h1 style={{ textAlign: 'center'}}> Jaison White, Tax Professional </h1>
        <div className="header-content">
          <div className="header-image">
            <img 
              src={`${process.env.PUBLIC_URL}/images/headshot.jpg`}
              alt="Professional headshot" 
              className="headshot"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Your+Photo';
              }}
              style={{margin: 30}}
            />
          </div>  
          {/* <h1 className="profile-name">Jaison White</h1> */}
            <h3 className="profile-title">Enrolled Agent</h3>
            <div className="credentials" style={{ textAlign: 'center'}}>
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
               <div className="credential-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>200+ Satisfied Clients</span>
              </div>
            </div>
          <div className="header-text" style={{alignItems:'center', marginLeft: 50, marginTop: 30}}>
            {/* <p style={{alignItems:'center', fontStyle: 'italic'}}>Professional and Affordable Tax Help!</p>
            <p className="lead">Expert tax consultation services tailored to your needs</p> */}
          </div>
        </div>
         
      </div>
    </section>
  );
}

export default Header;