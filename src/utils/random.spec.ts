import { getRandomChance, getRandomLives } from './random';

describe('random.ts', () => {
  test('Is getRandomChance returns a boolean', () => {
    expect(typeof getRandomChance(50)).toBe('boolean');
  });

  test('Doesn\'t crashes when parameter is less than zero', () => {
    expect(typeof getRandomChance(-100)).toBe('boolean');
  });

  test('Doesn\'t crashes when parameter is more than one hundred', () => {
    expect(typeof getRandomChance(500)).toBe('boolean');
  });

  test('getRandomLives returns a number between 0 and 3', () => {
    expect(getRandomLives()).toBeLessThanOrEqual(3);
    expect(getRandomLives()).toBeGreaterThanOrEqual(0);
  })
});
