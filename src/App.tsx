import './styles/index.scss';
import React, { useState } from 'react';
import { Life } from './Life';

const SIZE = 20;
const life = new Life({
  size: SIZE
});

function App() {
  const [items, setItems] = useState<boolean[]>(life.getField());

  console.log(items);

  return (
    <div className="app">
      {items.map((square, index) => {
        return (
          <div className={`square ${square ? 'square--alive' : 'square--dead'}`} key={`square-${index}`}/>
        )
      })}
    </div>
  );
}

export default App;
