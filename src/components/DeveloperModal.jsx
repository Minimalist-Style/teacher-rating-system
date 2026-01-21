import React from 'react';
import './DeveloperModal.css';

const DeveloperModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dev-modal-overlay" onClick={onClose}>
      <div className="dev-modal-content" onClick={e => e.stopPropagation()}>
        <div className="dev-header">
          <div className="dev-icon">👨‍💻</div>
          <h2>About Developer</h2>
        </div>
        
        <div className="dev-body">
          <p className="role">Senior IT Engineer</p>
          <div className="tech-stack">
            <span>React</span>
            <span>Vite</span>
            <span>Node.js</span>
            <span>Glassmorphism UI</span>
          </div>
          
          <p className="description">
            Designed and engineered specifically for the Teacher Rating System.
            Built with modern web technologies for maximum performance and user experience.
          </p>
          
          <div className="signature">
            Developed in 2026
          </div>
        </div>
        
        <button className="dev-close-btn" onClick={onClose}>Close System Info</button>
      </div>
    </div>
  );
};

export default DeveloperModal;
