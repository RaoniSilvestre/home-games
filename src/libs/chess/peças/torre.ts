import PeçaDeXadrez from "./peça"
import { Posição } from "../tipos"
import Tabuleiro from "../tabuleiro"
export class Torre extends PeçaDeXadrez {
  private calculateUp(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = new Posição(posição.getX() - 1, posição.getY())

      this.setPossibleMoves(possibleMoves)
      this.calculateUp(tabuleiro, novaPosição)
    }

  }
  private calculateLeft(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = new Posição(posição.getX(), posição.getY() - 1)

      this.setPossibleMoves(possibleMoves)
      this.calculateUp(tabuleiro, novaPosição)
    }
  }
  private calculateRight(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = new Posição(posição.getX(), posição.getY() + 1)
      this.setPossibleMoves(possibleMoves)
      this.calculateUp(tabuleiro, novaPosição)
    }
  }
  private calculateDown(tabuleiro: Tabuleiro, posição: Posição): void {
    if (!tabuleiro.verifyPos(posição)) {
      return
    }

    if (tabuleiro.getCelula(posição) === null || tabuleiro.getCelula(posição)?.getCor() !== this.getCor()) {
      let possibleMoves = this.getPossibleMoves()

      possibleMoves.add(posição)

      let novaPosição = new Posição(posição.getX() + 1, posição.getY())
      this.setPossibleMoves(possibleMoves)
      this.calculateUp(tabuleiro, novaPosição)
    }

  }
  calculatePossibleMoves(tabuleiro: Tabuleiro) {
    this.setPossibleMoves(new Set())

    let novaPosiçãoUp = new Posição(this.getPosição().getX() - 1, this.getPosição().getY())
    let novaPosiçãoLeft = new Posição(this.getPosição().getX(), this.getPosição().getY() - 1)
    let novaPosiçãoRight = new Posição(this.getPosição().getX(), this.getPosição().getY() + 1)
    let novaPosiçãoDown = new Posição(this.getPosição().getX() + 1, this.getPosição().getY())

    this.calculateUp(tabuleiro, novaPosiçãoUp)
    this.calculateLeft(tabuleiro, novaPosiçãoLeft)
    this.calculateRight(tabuleiro, novaPosiçãoRight)
    this.calculateDown(tabuleiro, novaPosiçãoDown)
  }

  private verifyEquality(conjunto: Set<Posição>, posição: Posição): boolean {
    for (const elemento of conjunto) {
      if (posição.equals(elemento)) {
        return true;
      }
    }
    return false;
  }

  mover(tabuleiro: Tabuleiro, posiçãoNova: Posição): boolean {
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
