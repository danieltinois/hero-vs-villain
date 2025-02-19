import React, { useState } from 'react';
import CharacterSelection from './components/CharacterSelection';
import Battle from './components/Battle';

const App = () => {
  const [hero, setHero] = useState(null);
  const [villain, setVillain] = useState(null);

  return (
    <div className="app-container">
      <h1 className="title">Arena Dos Destinos ⚔️🔥</h1>
      {!hero || !villain ? (
        <CharacterSelection
          onSelect={(h, v) => {
            setHero(h);
            setVillain(v);
          }}
        />
      ) : (
        <Battle hero={hero} villain={villain} />
      )}
    </div>
  );
};

export default App;
