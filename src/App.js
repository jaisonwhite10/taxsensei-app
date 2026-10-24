
import React from 'react';
import './styles/App.css';

import Header from './components/Header';
import Features from './components/Features';
import Calendar from './components/Calendar';
import Testimonial from './components/Testimonial';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const isPrivacyPolicy =
    window.location.pathname.replace(/\/+$/, '') === '/privacy-policy';

  if (isPrivacyPolicy) {
    return (
      <div className="App">
        <Header />
        <PrivacyPolicy />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <AboutMe />
      <Testimonial />
      <Pricing />

      <section id="calendar-section">
        <Calendar />
      </section>

      <Contact />
      <Footer />
    </div>
  );
}

export default App;
