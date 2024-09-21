// InfoSection.jsx
import React from 'react';
import './InfoSection.css';

function InfoSection({ title, content }) {
  return (
    <div className="info-section">
      <div className="info-content">
        <h2 className="info-title">{title}</h2>
        <p className="info-text">{content}</p>
      </div>
    </div>
  );
}

export default InfoSection;