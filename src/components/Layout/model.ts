import { Field } from '../../Life';

export interface ViewModel {
  reset: () => void;
  clear: () => void;
  toggle: () => void;
  size: number;
  intervalId?: NodeJS.Timeout;
  field: Field;
  generation: number;
  togglePoint: (index: number) => void;
}
