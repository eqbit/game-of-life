import { Life } from './';

describe('Basic Life implementation tests', () => {
  const life = new Life({
    percent: 50,
    size: 20
  });

  test('Check field length', () => {
    expect(life.getInitialField().length).toBe(400);
  });
});
