import React, { useState, useEffect } from 'react';
import '../styles/Testimonial.css';

function Testimonial() {
  const testimonials = [
    {
      id: 1,
      quote: "Jaison was great! He helped me navigate complex tax situations with ease and professionalism.",
      author: "Jane Doe",
      location: "New York"
    },
    {
      id: 2,
      quote: "Outstanding service! Jaison made my tax filing simple and stress-free. Highly recommended!",
      author: "John Smith",
      location: "Boston"
    },
    {
      id: 3,
      quote: "Professional, knowledgeable, and responsive. Jaison saved me money and gave me peace of mind.",
      author: "Sarah Johnson",
      location: "Chicago"
    },
    {
      id: 4,
      quote: "Best tax advisor I've ever worked with. Thorough, detail-oriented, and always available to answer questions.",
      author: "Michael Brown",
      location: "Los Angeles"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section id="testimonial">
      <div className="testimonial-container">
        <h2 className="testimonial-section-title">What Clients Say</h2>
        
        <div className="testimonial-carousel">
          <button 
            className="carousel-button prev" 
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="testimonial-content">
            <div className={`testimonial-quote ${isAnimating ? 'fade' : ''}`}>
              <svg className="quote-icon" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p className="quote-text">"{testimonials[currentIndex].quote}"</p>
              <div className="author-info">
                <p className="author-name">{testimonials[currentIndex].author}</p>
                <p className="author-location">{testimonials[currentIndex].location}</p>
              </div>
            </div>
          </div>

          <button 
            className="carousel-button next" 
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;