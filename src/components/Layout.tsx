import React, { useRef, useState } from 'react';
import { Field, Life } from '../Life';

const Layout = () => {
  const [ generation, setGeneration ] = useState(0);
  const [ size ] = useState(50);
  const { current: life } = useRef(new Life({
    size
  }));
  const [ step ] = useState(300);
  const [ field, setField ] = useState<Field>(life.getInitialField());

  const [ intervalId, setIntervalId ] = useState<NodeJS.Timeout | null>(null);

  const start = () => {
    const localInterval = setInterval(() => {
      setField((previousField) => life.getRecalculatedField(previousField));
      setGeneration((generation) => generation + 1);
    }, step);

    setIntervalId(localInterval);
  };

  const stop = () => {
    intervalId && clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    setField(life.getNewRandomizedField());
    setGeneration(0);
  };

  const toggle = () => {
    if (intervalId) {
      stop();
    } else {
      start();
    }
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
          Сбросить
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
            <div
              className={`square ${pointState ? 'square--alive' : 'square--dead'}`}
              key={`square-${index}`}
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

export default Layout;
