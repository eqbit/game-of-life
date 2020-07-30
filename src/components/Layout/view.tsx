import React from 'react';
import { ViewModel } from './model';

const View: React.FC<ViewModel> = (
  {
    reset,
    clear,
    toggle,
    size,
    intervalId,
    field,
    generation,
    togglePoint
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
          Сбросить
        </button>

        <button
          className="btn"
          onClick={() => clear()}
        >
          Очистить
        </button>
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
