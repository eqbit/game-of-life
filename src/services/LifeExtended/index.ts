import { getRandomLives } from '../../utils/random';

interface ConstructorOptions {
  size: number;
}

export type FieldExtendedUnion = 0 | 1 | 2 | 3;
export type FieldExtended = FieldExtendedUnion[];

export class LifeExtended {
  protected size: number;
  protected Field: FieldExtended;

  constructor({ size }: ConstructorOptions) {
    this.size = size;
    this.Field = new Array(size * size).fill(null).map(() => getRandomLives());
  }

  public getInitialField(): FieldExtended {
    return this.Field;
  }

  public getNewRandomizedField(): FieldExtended {
    this.Field = new Array(this.size * this.size).fill(null).map(() => getRandomLives());
    return this.Field;
  }

  public getNewEmptyField(): FieldExtended {
    this.Field = new Array(this.size * this.size).fill(false);
    return this.Field;
  }

  protected getPointState(pointIndex: number, FieldExtended: FieldExtended): number {
    return FieldExtended[pointIndex];
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

  protected getPointNeighborsNumber(pointIndex: number, FieldExtended: FieldExtended): number {
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
          const isNeighborAlive = this.getPointState(neighborPointIndex, FieldExtended);

          if (isNeighborAlive) {
            neighborsNumber++;
          }
        }
      }
    }

    return neighborsNumber;
  }

  public togglePoint(index: number): FieldExtended {
    let pointState: FieldExtendedUnion = this.Field[index] + 1 as FieldExtendedUnion;

    if (pointState > 3) {
      pointState = 0;
    }

    this.Field[index] = pointState as FieldExtendedUnion;

    return this.Field;
  }

  public getRecalculatedField(previousFieldExtended: FieldExtended = this.Field): FieldExtended {
    const newFieldExtended = previousFieldExtended.map((currentState, pointIndex) => {
      const neighborsNumber = this.getPointNeighborsNumber(pointIndex, previousFieldExtended);

      if (neighborsNumber < 2 || neighborsNumber > 3) {
        return currentState - 1 < 0 ? 0 : currentState - 1;
      }

      if (neighborsNumber === 3) {
        return currentState + 1;
      }

      return currentState;
    }) as FieldExtended;

    this.Field = newFieldExtended;

    return newFieldExtended;
  }
}
