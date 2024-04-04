import { MPeça, Posição } from "./tipos";


export default class Tabuleiro {
  private celulas: (MPeça)[][];
  private maxPos: Posição;
  constructor(posição: Posição) {
    this.celulas = Array.from({ length: posição.getX() }, () => Array(posição.getY()).fill(null))
    this.maxPos = posição;
  }

  setCelula(peça: MPeça, posição: Posição): boolean {
    if (!this.verifyPos(posição)) {
      return false;
    };
    this.celulas[posição.getX()][posição.getY()] = peça;
    return true;
  }

  getCelula(posição: Posição): MPeça {
    return this.celulas[posição.getX()][posição.getY()];
  }

  getMaxPos(): Posição {
    return this.maxPos;
  }

  verifyPos(pos: Posição): boolean {
    const maxPos = this.getMaxPos();

    if (pos.getX() >= maxPos.getX() || pos.getY() >= maxPos.getY() || pos.getY() < 0 || pos.getX() < 0) {
      return false;
    }
    return true;
  }
}



