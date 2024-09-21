import React from 'react';
import './HeroSection.css';

function HeroSection ({ title, subtitle, backgroundImage, ctaText, onCtaClick, secondaryCtaText, onSecondaryCtaClick }) {
  return (
    <div 
      className="hero-section" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        
        <div className="hero-buttons">
          {ctaText && (
            <button className="hero-cta-button" onClick={onCtaClick}>
              {ctaText}
            </button>
          )}
          {secondaryCtaText && (
            <button className="hero-secondary-cta-button" onClick={onSecondaryCtaClick}>
              {secondaryCtaText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
