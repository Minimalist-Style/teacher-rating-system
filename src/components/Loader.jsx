import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  
  const textLines = [
    "> Initializing System...",
    "> Loading Teacher Database...",
    "> Verifying Security Protocols...",
    "> Establishing Connection...",
    "> Engineered by: IT Department",
    "> Starting Application...",
    "> ACCESS GRANTED"
  ];

  useEffect(() => {
    let delay = 0;
    textLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === textLines.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
      delay += Math.random() * 300 + 300; // Random delay between 300-600ms
    });
  }, []);

  return (
    <div className="loader-container">
      <div className="terminal-window">
        {lines.map((line, index) => (
          <div key={index} className="terminal-line">
            <span className="prompt">$</span> {line}
          </div>
        ))}
        <div className="cursor">_</div>
      </div>
    </div>
  );
};

export default Loader;
