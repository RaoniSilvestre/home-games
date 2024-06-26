import { error } from "console";
import { MPeça, Posição } from "./tipos";


export default class Tabuleiro {
  private celulas: (MPeça)[][];
  private maxPos: Posição;
  constructor(posição: Posição) {
    this.celulas = Array.from({ length: posição.x }, () => Array(posição.y).fill(null))
    this.maxPos = posição;
  }

  setCelula(peça: MPeça, posição: Posição): boolean {
    if (!this.verifyPos(posição)) {
      return false;
    };
    this.celulas[posição.x][posição.y] = peça;
    return true;
  }

  getCelula(posição: Posição): MPeça {
    return this.celulas[posição.x][posição.y];
  }

  getMaxPos(): Posição {
    return this.maxPos;
  }

  public verifyPos(pos: Posição): boolean {
    const maxPos = this.getMaxPos();
    if (pos.x >= maxPos.x || pos.y >= maxPos.y || pos.y < 0 || pos.x < 0) {
      return false;
    }
    return true;
  }

  moverPeça(posiçãoInicial: Posição, posiçãoFinal: Posição): boolean {
    let peça = this.getCelula(posiçãoInicial);
    if (peça === null) {
      console.error("Erro: Local inicial nulo")
      return false
    }
    peça.mover(this, posiçãoFinal)
    return true
  }
}



