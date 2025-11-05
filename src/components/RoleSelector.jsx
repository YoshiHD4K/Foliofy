import React, { useState, useEffect } from 'react';
import '../assets/css/RoleSelector.css';

const ROLES = [
  { key: 'artist', label: 'Artista', emoji: '🎨' },
  { key: 'writer', label: 'Escritor', emoji: '✍️' },
  { key: 'photographer', label: 'Fotógrafo', emoji: '📷' },
  { key: 'designer', label: 'Diseñador', emoji: '✏️' },
];

export default function RoleSelector({ onNext, onSelect, showNext = true, defaultValue = null }) {
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => { 
    setSelected(defaultValue);
  }, [defaultValue]);

  const handleCardClick = (key) => {
    setSelected(key);
    if (onSelect) onSelect(key);
  };
  const handleNext = () => {
    if (onNext) onNext(selected);
  };

  return (
    <div className="role-selector">
      <h2 className="role-title">¿Cuál es tu rol?</h2>
      <div className="role-grid">
        {ROLES.map((r) => (
          <button
            key={r.key}
            type="button"
            className={`role-card ${selected === r.key ? 'selected' : ''}`}
            onClick={() => handleCardClick(r.key)}
            aria-pressed={selected === r.key}
          >
            <span className="role-emoji" aria-hidden>
              {r.emoji}
            </span>
            <span className="role-label" style={{ color: '#000' }}>{r.label}</span>
          </button>
        ))}
      </div>

      {showNext && (
        <div className="role-actions">
          <button
            className="btn-next"
            type="button"
            onClick={handleNext}
            disabled={!selected}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
