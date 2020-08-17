import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Layout from '.';

test('renders a field of a given size', () => {
  const { getByText } = render(<Layout/>);

  expect(getByText('Старт')).toBeInTheDocument();
});
