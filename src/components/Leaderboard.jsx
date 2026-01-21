import React, { useState, useEffect } from 'react';
import { teachers as initialTeachers, calculateScore } from '../data';
import TeacherCard from './TeacherCard';
import TeacherDetailModal from './TeacherDetailModal';
import Footer from './Footer';
import DeveloperModal from './DeveloperModal';
import './Leaderboard.css';

const Leaderboard = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  // Sort on render to ensure it's always up to date without useEffect loops
  const sortedTeachers = [...teachers].sort((a, b) => calculateScore(b) - calculateScore(a));

  const handleUpdateAward = (teacherId, awardType, increment) => {
    setTeachers(prevTeachers => {
      const updated = prevTeachers.map(teacher => {
        if (teacher.id === teacherId) {
          const newValue = Math.max(0, teacher.awards[awardType] + increment);
          return {
            ...teacher,
            awards: {
              ...teacher.awards,
              [awardType]: newValue
            }
          };
        }
        return teacher;
      });
      
      // Also update the selected teacher object so the modal re-renders with new data
      const updatedTeacher = updated.find(t => t.id === teacherId);
      if (selectedTeacher && selectedTeacher.id === teacherId) {
        setSelectedTeacher(updatedTeacher);
      }
      
      return updated;
    });
  };

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>🏆 Топ Учителей</h1>
        <p>Рейтинг педагогического мастерства</p>
      </header>
      
      <div className="podium">
        {sortedTeachers.slice(0, 3).map((teacher, index) => (
           <div key={teacher.id} className={`podium-spot spot-${index + 1}`}>
             <TeacherCard 
               teacher={teacher} 
               rank={index + 1} 
               onClick={() => setSelectedTeacher(teacher)}
             />
           </div>
        ))}
      </div>

      <div className="list-view">
        {sortedTeachers.slice(3).map((teacher, index) => (
          <TeacherCard 
            key={teacher.id} 
            teacher={teacher} 
            rank={index + 4} 
            onClick={() => setSelectedTeacher(teacher)}
          />
        ))}
      </div>

      <TeacherDetailModal 
        isOpen={!!selectedTeacher} 
        onClose={() => setSelectedTeacher(null)} 
        teacher={selectedTeacher} 
        onUpdateAward={handleUpdateAward}
      />
      
      <Footer />
      
      {/* Hidden Dev Trigger */}
      <div className="dev-trigger" onClick={() => setIsDevModalOpen(true)} title="Developer Info">
        &lt;/&gt;
      </div>
      
      <DeveloperModal 
        isOpen={isDevModalOpen} 
        onClose={() => setIsDevModalOpen(false)} 
      />
    </div>
  );
};

export default Leaderboard;
