import Tabuleiro from "../tabuleiro";
import { Posição } from "../tipos";
import PeçaDeXadrez from "./peça";

export default class Cavalo extends PeçaDeXadrez {



  protected calculatePossibleMoves(tabuleiro: Tabuleiro): void {
    this.setPossibleMoves(new Set());
    let { x, y } = this.getPosição();

    let upLeft1 = { x: x - 2, y: y - 1 }
    let upLeft2 = { x: x - 1, y: y - 2 }

    let upRight1 = { x: x - 1, y: y + 1 }
    let upRight2 = { x: x - 1, y: y + 1 }

    let downLeft1 = { x: x + 1, y: y - 1 }
    let downLeft2 = { x: x + 1, y: y - 1 }

    let downRight1 = { x: x + 1, y: y + 1 }
    let downRight2 = { x: x + 1, y: y + 1 }

  }

  public mover(tabuleiro: Tabuleiro, posiçãoNova: Posição): boolean {
    if (!tabuleiro.verifyPos(posiçãoNova)) {
      console.error("Fora do tabuleiro")
      return false;
    }
    this.calculatePossibleMoves(tabuleiro)
    if (this.verifyEquality(this.getPossibleMoves(), posiçãoNova)) {
      tabuleiro.setCelula(null, this.getPosição());

      this.setPosição(posiçãoNova);
      tabuleiro.setCelula(this, posiçãoNova);
      return true;

    }

    return false;
  }
}
