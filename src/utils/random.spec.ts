import { getRandomChance } from './random';

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
});
