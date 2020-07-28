import React, { useRef, useState } from 'react';
import { Field, Life } from '../../Life';
import View from './view';

const Layout = () => {
  const [ size ] = useState(50);
  const { current: life } = useRef(new Life({
    size
  }));
  const [ field, setField ] = useState<Field>(life.getInitialField());
  const [ step ] = useState(300);
  const [ generation, setGeneration ] = useState(0);

  const [ intervalId, setIntervalId ] = useState<NodeJS.Timeout>();

  const start = () => {
    const localInterval = setInterval(() => {
      setField((previousField) => life.getRecalculatedField(previousField));
      setGeneration((generation) => generation + 1);
    }, step);

    setIntervalId(localInterval);
  };

  const stop = () => {
    intervalId && clearInterval(intervalId);
    setIntervalId(undefined);
  };

  const reset = () => {
    setField(life.getNewRandomizedField());
    setGeneration(0);
  };

  const clear = () => {
    setField(life.getNewEmptyField());
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
    <View
      reset={reset}
      clear={clear}
      toggle={toggle}
      size={size}
      intervalId={intervalId}
      field={field}
      generation={generation}
    />
  );
};

export default Layout;
