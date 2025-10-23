import React from 'react';
import '../styles/Header.css';



function Header() {
  return (
    <section id="title" className="gradient-background">
      <div className="container">
        <h1 style={{marginBottom: 30, textAlign: 'center'}}> Jaison White, Tax Professional </h1>
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
          <div className="header-text" style={{alignItems:'center'}}>
            <h2 style={{alignItems:'center'}}>Professional and Affordable Tax Help!</h2>
            <p className="lead">Expert tax consultation services tailored to your needs</p>
          </div>
        </div>
         
      </div>
    </section>
  );
}

export default Header;