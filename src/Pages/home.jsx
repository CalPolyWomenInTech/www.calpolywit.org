import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../Styles/home.css';
import logo2 from '../assets/Logo/Women_In_Tech_Logo.png';
import instagramLogo from '../assets/Logo/instaPurple.png';
import discordLogo from '../assets/Logo/discordPurple.png';
import MembershipLogo from '../assets/Logo/MembershipLogo.png';

import image1 from '../assets/WebsitePictures/CSAF.png';
import image2 from '../assets/WebsitePictures/extra.jpg';
import image3 from '../assets/WebsitePictures/award.jpg';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image1, image2, image3];

  // Auto-rotate images every 5 seconds. We store the interval id in a ref
  // and restart the timer whenever the user manually changes slides so
  // it doesn't immediately jump right after a manual navigation.
  const intervalRef = useRef(null);

  const startAutoRotate = useCallback(() => {
    // clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoRotate]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startAutoRotate();
  }, [images.length, startAutoRotate]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startAutoRotate();
  }, [images.length, startAutoRotate]);

  return (
    <div className="home">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo2} alt="Women in Tech Logo" className="wit-logo2" />
      </div>

      {/* Social Media Links */}
      <div className="image-links">
        <a href="https://www.instagram.com/calpolywit/" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src={instagramLogo} alt="Instagram" className="social-logo" />
        </a>
        <a href="https://discord.com/invite/R5nrdnDFTq" target="_blank" rel="noopener noreferrer" className="social-link">
          <img src={discordLogo} alt="Discord" className="social-logo" />
        </a>
      </div>

      {/* Image Carousel */}
      <div className="carousel-container">
        <button className="prev-btn" onClick={prevImage}>❮</button>
        <div className="carousel">
          <img
            src={images[currentIndex]}
            alt="Carousel"
            className="carousel-image"
          />
        </div>
        <button className="next-btn" onClick={nextImage}>❯</button>
      </div>

      {/* Carousel Dots */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Home;
