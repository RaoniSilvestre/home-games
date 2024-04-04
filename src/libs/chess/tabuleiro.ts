import { MPeça, Posição } from "./tipos";


export default class Tabuleiro {
  private celulas: (MPeça)[][];
  private maxPos: Posição;
  constructor(posição: Posição) {
    this.celulas = Array.from({ length: posição[0] }, () => Array(posição[1]).fill(null))
    this.maxPos = posição;
  }

  setCelula(peça: MPeça, posição: Posição): boolean {
    if (!this.verifyPos(posição)) {
      return false;
    };
    const [x, y] = posição;
    this.celulas[x][y] = peça;
    return true;
  }

  getCelula(posição: Posição): MPeça {
    const [x, y] = posição;
    return this.celulas[x][y];
  }

  getMaxPos(): Posição {
    return this.maxPos;
  }

  verifyPos(pos: Posição): boolean {
    const [maxX, maxY] = this.getMaxPos();
    const [x, y] = pos;
    if (x >= maxX || y >= maxY || y < 0 || x < 0) {
      return false;
    }
    return true;
  }
}



