import React, { useState, useRef } from 'react';
import T1 from "../assets/photos/T1.jpg";
import T2 from "../assets/photos/T2.png";
import T3 from "../assets/photos/T3.png";
import T4 from "../assets/photos/T4.png";
import "./testimonials.css";

const RatingStar = ({ filled }) => (
  <span className={`rating-star ${filled ? 'filled' : ''}`}>★</span>
);

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      name: 'John Doe',
      quote: 'This product is amazing! It helped me achieve...',
      image: T1, // Replace with your image URL
      rating: 5,
    },
    {
      name: 'Jane Smith',
      quote: 'I highly recommend this service. The team is...',
      image: T2, // Replace with your image URL
      rating: 4,
    },
    {
      name: 'Ally Brown',
      quote: 'This product is a game changer! It...',
      image: T3, // Replace with your image URL
      rating: 4.5,
    },
    {
        name: 'Michael Smith',
        quote: 'The product was like a new era for communication...',
        image: T4, // Replace with your image URL
        rating: 3,
      },
  ];

  const handleNext = () => {
    setCurrentSlide(currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1);
  };

  return (
    
    <div className="testimonials">
      
      
      <div className="carousel-slides" ref={carouselRef}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`testimonial ${index === currentSlide ? 'active' : ''}`}>
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <div className="testimonial-content">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, innerIndex) => (
                  <RatingStar key={innerIndex} filled={innerIndex < testimonial.rating} />
                ))}
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <p className="testimonial-name">{testimonial.name}</p>
            </div>
          </div>
       
        ))}
      </div>
      <button className="carousel-control carousel-control-next" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Testimonials;