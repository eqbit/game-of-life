import React, { useEffect, useRef, useState } from 'react';
import { Field, Life } from '../Life';

const Layout = () => {
  const [ generation, setGeneration ] = useState(0);
  const [ size ] = useState(100);
  const { current: life } = useRef(new Life({
    size
  }));
  const [ step ] = useState(200);
  const [ field, setField ] = useState<Field>(life.getInitialField());

  useEffect(() => {
    setInterval(() => {
      setField((previousField) => life.getRecalculatedField(previousField));
      setGeneration((generation) => generation + 1);
    }, step);
  }, []);

  return (
    <div className="wrapper">
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

      <div className="generation">Поколение: {generation}</div>
    </div>
  );
};

export default Layout;
