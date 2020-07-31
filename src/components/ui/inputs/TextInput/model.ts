import React from 'react';

export interface ViewModel {
  value: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
}
