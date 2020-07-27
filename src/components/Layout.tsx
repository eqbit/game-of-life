import React, { useEffect, useState } from 'react';
import { Field, Life } from '../Life';

const SIZE = 100;

const life = new Life({
  size: SIZE
});

const Layout = () => {
  const [ field, setField ] = useState<Field>(life.getInitialField());
  const [ generation, setGeneration ] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setField(life.getRecalculatedField());
      setGeneration((generation) => generation + 1);
    }, 5000);
  }, []);

  return (
    <div className="wrapper">
      <div className="app">
        {field?.map((pointState, index) => {
          return (
            <div className={`square ${pointState ? 'square--alive' : 'square--dead'}`} key={`square-${index}`}/>
          )
        })}
      </div>

      <div className="generation">Поколение: {generation}</div>
    </div>
  );
};

export default Layout;
