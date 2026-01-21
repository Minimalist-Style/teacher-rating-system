import React from 'react';
import './TeacherDetailModal.css';
import { calculateScore, awardWeights } from '../data';

const TeacherDetailModal = ({ teacher, isOpen, onClose, onUpdateAward }) => {
  if (!isOpen || !teacher) return null;

  const score = calculateScore(teacher);
  const maxScore = 150; // Approximated max for bar graph scaling

  const awardTypes = [
    { key: 'school', label: 'Мектепішілік (1)', emoji: '🏫', weight: awardWeights.school },
    { key: 'district', label: 'Аудандық (2)', emoji: '🥉', weight: awardWeights.district },
    { key: 'regional', label: 'Облыстық (3)', emoji: '🥈', weight: awardWeights.regional },
    { key: 'republican', label: 'Республикалық (4)', emoji: '🥇', weight: awardWeights.republican },
    { key: 'international', label: 'Халықаралық (5)', emoji: '🌍', weight: awardWeights.international },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <header className="modal-header">
          <img src={teacher.avatar} alt={teacher.name} className="modal-avatar" />
          <div>
            <h2>{teacher.name}</h2>
            <p>{teacher.subject}</p>
          </div>
          <div className="modal-score">
            <span>{score}</span>
            <small>Points</small>
          </div>
        </header>

        <div className="stats-container">
          <h3>📊 Статистика наград</h3>
          
          <div className="awards-list">
            {awardTypes.map(type => (
              <div key={type.key} className="award-row">
                <div className="award-label">
                  <span className="award-emoji">{type.emoji}</span>
                  <span>{type.label}</span>
                </div>
                
                <div className="award-controls">
                  <button 
                    className="control-btn minus" 
                    onClick={() => onUpdateAward(teacher.id, type.key, -1)}
                    disabled={teacher.awards[type.key] <= 0}
                  >
                    -
                  </button>
                  <span className="award-count">{teacher.awards[type.key]}</span>
                  <button 
                    className="control-btn plus" 
                    onClick={() => onUpdateAward(teacher.id, type.key, 1)}
                  >
                    +
                  </button>
                </div>
                
                {/* Visual Bar showing contribution to total score */}
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${Math.min((teacher.awards[type.key] * type.weight / maxScore) * 100 * 5, 100)}%`, // Amplified for visibility
                      backgroundColor: type.key === 'international' ? '#8b5cf6' : 
                                       type.key === 'republican' ? '#f59e0b' : 
                                       type.key === 'regional' ? '#94a3b8' : 
                                       type.key === 'school' ? '#22c55e' : '#3b82f6'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailModal;
