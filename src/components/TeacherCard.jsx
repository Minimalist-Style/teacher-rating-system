import React from 'react';
import './TeacherCard.css';
import { calculateScore, getStatusColor } from '../data';

const TeacherCard = ({ teacher, rank, onClick }) => {
  const score = calculateScore(teacher);
  const status = getStatusColor(score);
  
  return (
    <div className={`teacher-card rank-${rank} status-${status}`} onClick={onClick}>
      <div className="rank-badge">{rank}</div>
      <div className="teacher-info">
        <img src={teacher.avatar} alt={teacher.name} className="avatar" />
        <div className="details">
          <h3>{teacher.name}</h3>
          <p>{teacher.subject}</p>
        </div>
      </div>
      <div className="score-container">
        <div className="score">{score}</div>
        <div className="score-label">Points</div>
      </div>
      <div className="awards-preview">
        {teacher.awards.international > 0 && <span title="International">🌍 {teacher.awards.international}</span>}
        {teacher.awards.republican > 0 && <span title="Republican">🥇 {teacher.awards.republican}</span>}
        {teacher.awards.regional > 0 && <span title="Regional">🥈 {teacher.awards.regional}</span>}
        {teacher.awards.district > 0 && <span title="District">🥉 {teacher.awards.district}</span>}
        {teacher.awards.school > 0 && <span title="School">🏫 {teacher.awards.school}</span>}
      </div>
    </div>
  );
};

export default TeacherCard;
