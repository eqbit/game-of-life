import React from 'react';
import { ViewModel } from './model';
import TextInput from '../ui/inputs/TextInput';

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
              className={`square ${pointState ? 'square--alive' : 'square--dead'}`}
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
