import { getRandomChance } from '../utils/random';

interface ConstructorOptions {
  size: number;
}

export type Field = boolean[];

export class Life {
  protected size: number;
  protected field: Field;

  constructor({ size }: ConstructorOptions) {
    this.size = size;
    this.field = new Array(size * size).fill(null).map(() => getRandomChance());
  }

  public getInitialField(): Field {
    return this.field;
  }

  protected getPointState(pointIndex: number, field: Field): boolean {
    return field[pointIndex];
  }

  protected getPointRow(pointIndex: number): number {
    return Math.floor(pointIndex / this.size);
  }

  protected getPointCol(pointIndex: number): number {
    const rows = this.getPointRow(pointIndex);
    return pointIndex - (this.size * rows);
  }

  protected isInBound(row: number, col: number): boolean {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  protected getPointIndex(row: number, col: number): number {
    return (row * this.size) + col;
  }

  protected getPointNeighborsNumber(pointIndex: number, field: Field): number {
    let neighborsNumber = 0;

    const pointRow = this.getPointRow(pointIndex);
    const pointCol = this.getPointCol(pointIndex);

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (row === 0 && col === 0) {
          continue;
        }

        const neighborRow = pointCol + row;
        const neighborCol = pointRow + col;

        if (this.isInBound(neighborRow, neighborCol)) {
          if (this.getPointState(this.getPointIndex(neighborRow, neighborCol), field)) {
            neighborsNumber++;
          }
        }
      }
    }

    return neighborsNumber;
  }

  public getRecalculatedField(previousField: Field): Field {
    const newField: Field = previousField.map((currentState, pointIndex) => {
      const neighborsNumber = this.getPointNeighborsNumber(pointIndex, previousField);

      if (neighborsNumber < 2 || neighborsNumber > 3) {
        return false;
      }

      if (neighborsNumber === 3) {
        return true;
      }

      return currentState;
    });

    this.field = newField;

    return newField;
  }
}
