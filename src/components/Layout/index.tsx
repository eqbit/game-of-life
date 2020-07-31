import React, { useRef, useState } from 'react';
import { Field, Life } from '../../Life';
import View from './view';

const Layout = () => {
  const [ size ] = useState(50);
  const [ randomChancePercent, setRandomChancePercent ] = useState(10);
  const { current: life } = useRef(new Life({
    size,
    percent: randomChancePercent
  }));
  const [ field, setField ] = useState<Field>(life.getInitialField());
  const [ step ] = useState(300);
  const [ generation, setGeneration ] = useState(0);

  const [ intervalId, setIntervalId ] = useState<NodeJS.Timeout>();

  const start = () => {
    const localInterval = setInterval(() => {
      setField((previousField) => [...life.getRecalculatedField(previousField)]);
      setGeneration((generation) => generation + 1);
    }, step);

    setIntervalId(localInterval);
  };

  const stop = () => {
    intervalId && clearInterval(intervalId);
    setIntervalId(undefined);
  };

  const reset = () => {
    setField([...life.getNewRandomizedField(randomChancePercent)]);
    setGeneration(0);
  };

  const clear = () => {
    setField([ ...life.getNewEmptyField()]);
    setGeneration(0);
  };

  const toggle = () => {
    if (intervalId) {
      stop();
    } else {
      start();
    }
  };

  const togglePoint = (index: number) => {
    setField([...life.togglePoint(index)]);
  };

  const setChance = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let val = +e.currentTarget.value;

    if (isNaN(val)) {
      val = 0;
    }

    if (val < 0) {
      val = 0;
    }

    if (val > 100) {
      val = 100;
    }

    setRandomChancePercent(val);
  };

  return (
    <View
      reset={reset}
      clear={clear}
      toggle={toggle}
      size={size}
      intervalId={intervalId}
      field={field}
      generation={generation}
      togglePoint={togglePoint}
      chance={randomChancePercent}
      setChance={setChance}
    />
  );
};

export default Layout;
