import PeçaDeXadrez from "./peça"
import Tabuleiro from "../tabuleiro"
import { Posição } from "../tipos"
import { warn } from "console"

// Peão!!
export default class Peão extends PeçaDeXadrez {
  private calculateWhitePawnMoves(peça: Peão, tabuleiro: Tabuleiro): Set<Posição> {
    const pos = peça.getPosição()

    let newPossibleMoves: Set<Posição> = new Set()

    let frontPosition = { x: pos.x - 1, y: pos.y }

    const frontCell = tabuleiro.getCelula(frontPosition)
    if (frontCell === null) {
      newPossibleMoves.add(frontPosition)
    }

    const frontLeftPosition = { x: pos.x - 1, y: pos.y - 1 };
    const frontRightPosition = { x: pos.x - 1, y: pos.y + 1 };
    const frontLeftCell = tabuleiro.getCelula(frontLeftPosition)
    const frontRightCell = tabuleiro.getCelula(frontRightPosition)

    if (frontLeftCell !== null && frontLeftCell.getCor() === "preto") {
      newPossibleMoves.add(frontLeftCell.getPosição())


    }

    if (frontRightCell !== null && frontRightCell.getCor() === "preto") {
      newPossibleMoves.add(frontRightCell.getPosição())
    }

    return newPossibleMoves;
  }

  private calculateBlackPawnMoves(peça: Peão, tabuleiro: Tabuleiro): Set<Posição> {
    const pos = peça.getPosição()

    let newPossibleMoves: Set<Posição> = new Set()


    const frontPosition = { x: pos.x + 1, y: pos.y }

    const frontCell = tabuleiro.getCelula(frontPosition)
    if (frontCell === null) {
      newPossibleMoves.add(frontPosition)
    }


    const frontLeftPosition = { x: pos.x + 1, y: pos.y - 1 }
    const frontRightPosition = { x: pos.x + 1, y: pos.y + 1 }

    const frontLeftCell = tabuleiro.getCelula(frontLeftPosition)
    const frontRightCell = tabuleiro.getCelula(frontRightPosition)

    if (frontLeftCell !== null && frontLeftCell.getCor() === "branco") {
      newPossibleMoves.add(frontLeftCell.getPosição())
    }
    console.log(frontRightCell)

    if (frontRightCell !== null && frontRightCell.getCor() === "branco") {
      newPossibleMoves.add(frontRightCell.getPosição())
    }

    return newPossibleMoves;
  }


  calculatePossibleMoves(tabuleiro: Tabuleiro): void {
    const cor = this.getCor();
    this.setPossibleMoves(new Set());
    this.setPossibleMoves(cor === "branco" ? this.calculateWhitePawnMoves(this, tabuleiro) : this.calculateBlackPawnMoves(this, tabuleiro))
  }


  // Função importante
  mover(tabuleiro: Tabuleiro, posiçãoNova: Posição): boolean {

    if (!tabuleiro.verifyPos(posiçãoNova)) {
      console.error("Fora do tabuleiro")
      return false;
    }

    this.calculatePossibleMoves(tabuleiro);

    if (this.getPossibleMoves().has(posiçãoNova)) {
      tabuleiro.setCelula(null, this.getPosição());

      this.setPosição(posiçãoNova);

      tabuleiro.setCelula(this, posiçãoNova);
      return true;
    }
    console.error("Erro: Posição inválida!");

    return false;
  }


}
