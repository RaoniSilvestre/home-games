import PeçaDeXadrez from "./peça"
import { Posição } from "../tipos"
import Tabuleiro from "../tabuleiro"

export default class Torre extends PeçaDeXadrez {

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


  calculatePossibleMoves(tabuleiro: Tabuleiro) {
    this.setPossibleMoves(new Set())
    let { x, y } = this.getPosição()

    // Um pra cima
    let novaPosiçãoUp = { x: x - 1, y: y }

    //Um pra esquerda
    let novaPosiçãoLeft = { x: x, y: y - 1 }

    // Um pra direita
    let novaPosiçãoRight = { x: x, y: y + 1 }

    // Um pra baixo
    let novaPosiçãoDown = { x: x + 1, y: y }

    this.calculateUp(tabuleiro, novaPosiçãoUp)
    this.calculateLeft(tabuleiro, novaPosiçãoLeft)
    this.calculateRight(tabuleiro, novaPosiçãoRight)
    this.calculateDown(tabuleiro, novaPosiçãoDown)


    let novoset = this.getPossibleMoves()
    novoset.delete(this.getPosição())
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
