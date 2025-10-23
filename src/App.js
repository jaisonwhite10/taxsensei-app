import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import Features from './components/Features';
import Calendar from './components/Calendar';
import Testimonial from './components/Testimonial';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';

function App() {
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
    </div>
  );
}

export default App;
