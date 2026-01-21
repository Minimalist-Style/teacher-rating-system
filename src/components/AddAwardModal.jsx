import React, { useState } from 'react';
import './AddAwardModal.css';

const AddAwardModal = ({ isOpen, onClose, teachers, onAddAward }) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [awardType, setAwardType] = useState('regional');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacherId && awardType) {
      onAddAward(parseInt(selectedTeacherId), awardType);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🏅 Добавить награду</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Учитель:</label>
            <select 
              value={selectedTeacherId} 
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              required
            >
              <option value="">Выберите учителя</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Уровень награды:</label>
            <select 
              value={awardType} 
              onChange={(e) => setAwardType(e.target.value)}
            >
              <option value="regional">🥉 Региональный (10)</option>
              <option value="oblast">🥈 Областной (30)</option>
              <option value="republican">🥇 Республиканский (50)</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Отмена</button>
            <button type="submit" className="submit-btn">Добавить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAwardModal;
