import React from 'react';
import { Field } from '../../services/Life';

export interface ViewModel {
  reset: () => void;
  clear: () => void;
  toggle: () => void;
  size: number;
  intervalId?: NodeJS.Timeout;
  field: Field;
  generation: number;
  togglePoint: (index: number) => void;
  chance: number;
  setChance: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
