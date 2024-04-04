import { PeçaDeXadrez } from "./peças";

export type Cor = "branco" | "preto";
export type MPeça = PeçaDeXadrez | null;

export class Posição {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(outro: Posição): boolean {
    return this.x === outro.x && this.y === outro.y;
  }

  hashCode(): String {
    return `${this.x},${this.y}`
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }

  setX(number: number) {
    this.x = number;
  }

  setY(number: number) {
    this.y = number;
  }


}
