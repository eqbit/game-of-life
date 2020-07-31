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

  public getNewRandomizedField(percent?: number): Field {
    this.field = new Array(this.size * this.size).fill(null).map(() => getRandomChance(percent));
    return this.field;
  }

  public getNewEmptyField(): Field {
    this.field = new Array(this.size * this.size).fill(false);
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

    for (let row = -1; row < 2; row++) {
      for (let col = -1; col < 2; col++) {
        if (row === 0 && col === 0) {
          continue;
        }

        const neighborRow = pointRow + row;
        const neighborCol = pointCol + col;

        if (this.isInBound(neighborRow, neighborCol)) {
          const neighborPointIndex = this.getPointIndex(neighborRow, neighborCol);
          const isNeighborAlive = this.getPointState(neighborPointIndex, field);

          if (isNeighborAlive) {
            neighborsNumber++;
          }
        }
      }
    }

    return neighborsNumber;
  }

  public togglePoint(index: number): Field {
    this.field[index] = !this.field[index];
    return this.field;
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
