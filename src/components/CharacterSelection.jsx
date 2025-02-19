import React, { useState } from 'react';
import { heroes, villains } from '../data/characters';

const CharacterSelection = ({ onSelect }) => {
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedVillain, setSelectedVillain] = useState(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  return (
    <div className="selection-container">
      <h2>Escolha Seu Herói</h2>
      <div className="character-buttons">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className="character-button-wrapper"
            onMouseEnter={() => setHoveredCharacter(hero)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            <button
              className={`character-button ${
                selectedHero?.id === hero.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedHero(hero)}
            >
              {hero.name}
            </button>
            {hoveredCharacter?.id === hero.id && (
              <div className="tooltip">
                <p>Descrição:</p>
                <span>{hero.description}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2>Escolha Seu Vilão</h2>
      <div className="character-buttons">
        {villains.map((villain) => (
          <div
            key={villain.id}
            className="character-button-wrapper"
            onMouseEnter={() => setHoveredCharacter(villain)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            <button
              className={`character-button ${
                selectedVillain?.id === villain.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedVillain(villain)}
            >
              {villain.name}
            </button>
            {hoveredCharacter?.id === villain.id && (
              <div className="tooltip">
                <p>Descrição:</p>
                <span>{villain.description}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(selectedHero, selectedVillain)}
        disabled={!selectedHero || !selectedVillain}
        className="start-battle-button"
      >
        Começar Batalha
      </button>
    </div>
  );
};

export default CharacterSelection;
