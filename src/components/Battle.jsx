import React, { useState } from 'react';

const Battle = ({ hero, villain }) => {
  const [heroHp, setHeroHp] = useState(hero.hp);
  const [villainHp, setVillainHp] = useState(villain.hp);
  const [log, setLog] = useState([]);

  function getRandomDamage(baseAttack) {
    return (
      Math.floor(Math.random() * (baseAttack * 0.5)) +
      Math.floor(baseAttack * 0.75)
    );
  }

  function didDefend(defense) {
    return Math.random() < defense * 0.1;
  }

  function attack() {
    let heroDmg = getRandomDamage(hero.attack);
    let villainDmg = getRandomDamage(villain.attack);

    const heroDefended = didDefend(hero.defense);
    const villainDefended = didDefend(villain.defense);

    if (heroDefended) {
      heroDmg = 0;
      setLog((prev) => [
        ...prev,
        `${villain.name} tentou atacar, mas ${hero.name} defendeu! 🛡️`,
      ]);
    }

    if (villainDefended) {
      villainDmg = 0;
      setLog((prev) => [
        ...prev,
        `${hero.name} tentou atacar, mas ${villain.name} defendeu! 🛡️`,
      ]);
    }

    setHeroHp((hp) => Math.max(hp - villainDmg, 0));
    setVillainHp((hp) => Math.max(hp - heroDmg, 0));

    setLog((prev) =>
      [
        ...prev,
        heroDmg > 0 ? `${hero.name} causou ${heroDmg} de dano!` : null,
        villainDmg > 0 ? `${villain.name} causou ${villainDmg} de dano!` : null,
      ].filter(Boolean),
    );
  }

  function handleRestart() {
    window.location.href = '/';
  }

  return (
    <div className="battle-container">
      <div className="character-battle">
        <p>{hero.name}</p>
        <div className="hp-bar">
          <div
            className="hp-fill"
            style={{ width: `${(heroHp / hero.hp) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="actions-container">
        {heroHp > 0 && villainHp > 0 ? (
          <button className="action-button" onClick={attack}>
            Batalhar!
          </button>
        ) : (
          <div className="content-results">
            <h3>
              {heroHp > 0
                ? `${hero.name} venceu! 🎉`
                : `${villain.name} venceu! 😈`}
            </h3>
            <button className="restart-battle-button" onClick={handleRestart}>
              Reiniciar
            </button>
          </div>
        )}
      </div>

      <div className="character-battle">
        <p>{villain.name}</p>
        <div className="hp-bar">
          <div
            className="hp-fill"
            style={{ width: `${(villainHp / villain.hp) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="log-container">
        <h3>Registro de Combate</h3>
        {log.map((entry, index) => (
          <p
            key={index}
            className={
              entry.includes('causou')
                ? 'log-entry positive'
                : 'log-entry negative'
            }
          >
            {entry}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Battle;
