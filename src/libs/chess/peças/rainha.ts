import Tabuleiro from "../tabuleiro";
import { Posição } from "../tipos";
import PeçaDeXadrez from "./peça";

export default class Rainha extends PeçaDeXadrez {

  private calculateUp(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição: Posição = { x: posição.x - 1, y: posição.y }
      this.setPossibleMoves(possibleMoves)
      this.calculateUp(tabuleiro, novaPosição)
    }

  }

  private calculateLeft(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição = { x: posição.x, y: posição.y - 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateLeft(tabuleiro, novaPosição)
    }
  }


  private calculateRight(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição = { x: posição.x, y: posição.y + 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateRight(tabuleiro, novaPosição)
    }
  }

  private calculateDown(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição = { x: posição.x + 1, y: posição.y }
      this.setPossibleMoves(possibleMoves)
      this.calculateDown(tabuleiro, novaPosição)
    }
  }

  private calculateUpLeft(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição = { x: posição.x - 1, y: posição.y - 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateUpLeft(tabuleiro, novaPosição)
    }
  }

  private calculateUpRight(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição = { x: posição.x - 1, y: posição.y + 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateUpRight(tabuleiro, novaPosição)
    }
  }

  private calculateDownLeft(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) return

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()
      possibleMoves.add(posição)
      let novaPosição = { x: posição.x + 1, y: posição.y - 1 }
      this.setPossibleMoves(possibleMoves)
      this.calculateDownLeft(tabuleiro, novaPosição)
    }
  }

  private calculateDownRight(tabuleiro: Tabuleiro, posição: Posição) {
    if (!tabuleiro.verifyPos(posição)) return

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
    this.calculateUp(tabuleiro, { x: x - 1, y: y })
    this.calculateDown(tabuleiro, { x: x + 1, y: y })
    this.calculateLeft(tabuleiro, { x: x, y: y - 1 })
    this.calculateDown(tabuleiro, { x: x + 1, y: y })
    this.calculateLeft(tabuleiro, { x: x, y: y - 1 })
    this.calculateRight(tabuleiro, { x: x, y: y + 1 })
    this.calculateUpLeft(tabuleiro, { x: x - 1, y: y - 1 })
    this.calculateUpRight(tabuleiro, { x: x - 1, y: y + 1 })
    this.calculateDownLeft(tabuleiro, { x: x + 1, y: y - 1 })
    this.calculateDownRight(tabuleiro, { x: x + 1, y: y + 1 })
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
