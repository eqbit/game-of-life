import { getRandomChance } from '../utils/random';

interface ConstructorOptions {
  size: number;
}

export class Life {
  protected size: number;
  protected field: boolean[];

  constructor({ size }: ConstructorOptions) {
    this.size = size;
    this.field = new Array(size * size).fill(null).map(() => getRandomChance());
  }

  public getField() {
    return this.field;
  }
}
