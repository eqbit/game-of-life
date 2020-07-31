import './index.scss';
import React from 'react';
import { ViewModel } from './model';

const TextInput: React.FC<ViewModel> = (
  {
    value,
    label,
    onChange,
    id
  }
) => {
  return (
    <div className="input__container">
      {!!label && <label htmlFor={id}>{label}</label>}

      <input
        type="text"
        className="input"
        placeholder="Шанс"
        onChange={onChange}
        value={value}
        id={id}
      />
    </div>
  );
};

export default TextInput;
