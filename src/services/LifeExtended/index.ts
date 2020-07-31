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
    this.Field = new Array(this.size * this.size).fill(0);
    return this.Field;
  }

  protected getPointState(pointIndex: number): number {
    return this.Field[pointIndex];
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

  protected getPointNeighborsValue(pointIndex: number): number {
    let neighborsValue = 0;

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
          const neighborUnitValue = this.getPointState(neighborPointIndex);

          if (neighborUnitValue === 1) {
            neighborsValue += 10;
          }

          if (neighborUnitValue === 2) {
            neighborsValue += 50;
          }

          if (neighborUnitValue === 3) {
            neighborsValue += 100;
          }
        }
      }
    }

    return neighborsValue;
  }

  public togglePoint(index: number): FieldExtended {
    let pointState = this.Field[index] + 1;

    if (pointState > 3) {
      pointState = 0;
    }

    this.Field[index] = pointState as FieldExtendedUnion;

    return this.Field;
  }

  protected handleDeadUnit(neighborsValue: number): FieldExtendedUnion {
    if (!neighborsValue) {
      return 0;
    }

    if (neighborsValue >= 100) {
      return 0;
    }

    if (neighborsValue >= 20) {
      return 0;
    }

    return 0;
  }

  protected handleWeakUnit(neighborsValue: number): FieldExtendedUnion {
    if (!neighborsValue) {
      return 1;
    }

    if (neighborsValue >= 100) {
      return 0;
    }

    return 2;
  }

  protected handleNormalUnit(neighborsValue: number): FieldExtendedUnion {
    if (!neighborsValue) {
      return 1;
    }

    if (neighborsValue >= 100) {
      return 1;
    }

    return 1;
  }

  protected handleAggressiveUnit(neighborsValue: number): FieldExtendedUnion {
    if (!neighborsValue) {
      return 2;
    }

    if (neighborsValue >= 300) {
      return 2;
    }

    if (neighborsValue > 20) {
      return 3;
    }

    return 2;
  }

  public getRecalculatedField(): FieldExtended {
    const newFieldExtended = this.Field.map((currentState, pointIndex) => {
      const neighborsValue = this.getPointNeighborsValue(pointIndex);

      if (currentState === 0) {
        return this.handleDeadUnit(neighborsValue);
      }

      if (currentState === 1) {
        return this.handleWeakUnit(neighborsValue);
      }

      if (currentState === 2) {
        return this.handleNormalUnit(neighborsValue);
      }

      return this.handleAggressiveUnit(neighborsValue);
    }) as FieldExtended;

    this.Field = newFieldExtended;

    return newFieldExtended;
  }
}
