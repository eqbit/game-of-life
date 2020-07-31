import { Field, Life } from './';

describe('Basic Life implementation tests', () => {
  const life = new Life({
    percent: 50,
    size: 20
  });

  const initialField = life.getInitialField();

  const checks = (field: Field) => {
    const length = field.length;
    test('Check a fields length', () => {
      expect(length).toBe(400);
    });

    test('Check if a field contains booleans', () => {
      expect(typeof field[0]).toBe('boolean');
      expect(typeof field[Math.floor(length / 2)]).toBe('boolean');
      expect(typeof field[length - 1]).toBe('boolean');
    });
  };

  checks(initialField);
  checks(life.getNewRandomizedField());
  checks(life.getNewEmptyField());
  checks(life.getRecalculatedField());

  test('getPointState returns boolean', () => {
    expect(typeof life['getPointState'](0, initialField)).toBe('boolean');
  });

  test('getPointRow and getPointCol return correct data', () => {
    expect(life['getPointRow'](50)).toBe(2);
    expect(life['getPointCol'](50)).toBe(10);
  });

  test('isInBound should return false, if the point is out of the fields dimensions', () => {
    expect(life['isInBound'](3, 3)).toBe(true);
    expect(life['isInBound'](3, 200)).toBe(false);
    expect(life['isInBound'](-5, 15)).toBe(false);
    expect(life['isInBound'](0, 25)).toBe(false);
    expect(life['isInBound'](90, 1)).toBe(false);
  });

  test('getPointIndex should return correct index based on row and col parameters', () => {
    expect(life['getPointIndex'](1, 1)).toBe(21);
    expect(life['getPointIndex'](10, 15)).toBe(215);
  });

  test('getPointNeighborsNumber should return number between zero and eight', () => {
    expect(typeof life['getPointNeighborsNumber'](3, initialField)).toBe('number');
    expect(life['getPointNeighborsNumber'](3, initialField)).toBeLessThanOrEqual(8);
    expect(life['getPointNeighborsNumber'](3, initialField)).toBeGreaterThanOrEqual(0);
  });

  test('togglePoint should revert the given point', () => {
    const oldField = life.getInitialField();
    const pointState = oldField[15];
    const newField = life['togglePoint'](15);

    expect(newField[15]).toBe(!pointState);
  })
});
