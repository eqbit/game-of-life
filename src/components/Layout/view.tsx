import React from 'react';
import { ViewModel } from './model';
import TextInput from '../ui/inputs/TextInput';
import { FieldExtended, FieldExtendedUnion } from '../../services/LifeExtended';

const View: React.FC<ViewModel> = (
  {
    reset,
    clear,
    toggle,
    size,
    intervalId,
    field,
    generation,
    togglePoint,
    chance,
    setChance
  }
) => {
  const getPointClass = (lives: FieldExtendedUnion) => {
    if (!lives) {
      return 'dead';
    }

    if (lives === 1) {
      return 'weak';
    }

    if (lives === 2) {
      return 'normal';
    }

    return 'aggressive';
  };

  return (
    <div className="wrapper">
      <div className="buttons">
        <button
          className="btn"
          onClick={() => toggle()}
        >
          {intervalId ? 'Стоп' : 'Старт'}
        </button>

        <button
          className="btn"
          onClick={() => reset()}
        >
          Рандомно
        </button>

        <button
          className="btn"
          onClick={() => clear()}
        >
          Очистить
        </button>
      </div>

      <div className="inputs">
        <TextInput value={`${chance}`} onChange={setChance} id="chance-input" label="Шанс"/>
      </div>

      <div className="app"
           style={{
             gridTemplateColumns: `repeat(${size}, 1fr)`,
             gridTemplateRows: `repeat(${size}, 1fr)`,
           }}
      >
        {field?.map((pointState, index) => {
          return (
            <button
              className={`square square--${getPointClass(pointState)}`}
              key={`square-${index}`}
              onClick={() => togglePoint(index)}
            />
          )
        })}
      </div>

      <div className="generation">
        {`Поколение: ${generation}`}
      </div>
    </div>
  );
};

export default View;
