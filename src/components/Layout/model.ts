import React from 'react';
import { Field } from '../../services/Life';
import { FieldExtended } from '../../services/LifeExtended';

export interface ViewModel {
  reset: () => void;
  clear: () => void;
  toggle: () => void;
  size: number;
  intervalId?: NodeJS.Timeout;
  field: FieldExtended;
  generation: number;
  togglePoint: (index: number) => void;
  chance: number;
  setChance: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}
