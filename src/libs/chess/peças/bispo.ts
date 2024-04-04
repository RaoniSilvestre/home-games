import Tabuleiro from "../tabuleiro";
import { Posição } from "../tipos";
import PeçaDeXadrez from "./peça";

export default class Bispo extends PeçaDeXadrez {

  private calculateUpLeft(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = { x: posição.x - 1, y: posição.y - 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateUpLeft(tabuleiro, novaPosição)

    }
  }

  private calculateUpRight(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = { x: posição.x - 1, y: posição.y + 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateUpRight(tabuleiro, novaPosição)

    }
  }

  private calculateDownLeft(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = { x: posição.x + 1, y: posição.y - 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateDownLeft(tabuleiro, novaPosição)

    }
  }

  private calculateDownRight(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = { x: posição.x + 1, y: posição.y + 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateDownRight(tabuleiro, novaPosição)

    }
  }

  protected calculatePossibleMoves(tabuleiro: Tabuleiro): void {
    this.setPossibleMoves(new Set());
    let { x, y } = this.getPosição();

    let upLeft = { x: x - 1, y: y - 1 }
    let upRight = { x: x - 1, y: y + 1 }
    let downLeft = { x: x + 1, y: y - 1 }
    let downRight = { x: x + 1, y: y + 1 }

    this.calculateUpLeft(tabuleiro, upLeft)
    this.calculateUpRight(tabuleiro, upRight)
    this.calculateDownLeft(tabuleiro, downLeft)
    this.calculateDownRight(tabuleiro, downRight)
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
    console.error("Erro: Posição inválida!");

    return false;


  }
}
