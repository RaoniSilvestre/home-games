import PeçaDeXadrez from "./peça"
import Tabuleiro from "../tabuleiro"
import { Posição } from "../tipos"

// Peão!!
export class Peão extends PeçaDeXadrez {
  private calculateWhitePawnMoves(peça: Peão, tabuleiro: Tabuleiro): Set<Posição> {
    const pos = peça.getPosição()

    let newPossibleMoves: Set<Posição> = new Set()
    let frontPosition = new Posição(pos.getX() - 1, pos.getY())
    const frontCell = tabuleiro.getCelula(frontPosition)
    if (frontCell === null) {
      newPossibleMoves.add(frontPosition)
    }

    const frontLeftPosition = new Posição(pos.getX() - 1, pos.getY() - 1);
    const frontRightPosition = new Posição(pos.getX() - 1, pos.getY() + 1);
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


    const frontPosition = new Posição(pos.getX() + 1, pos.getY())
    const frontCell = tabuleiro.getCelula(frontPosition)
    if (frontCell === null) {
      newPossibleMoves.add(frontPosition)
    }


    const frontLeftPosition = new Posição(pos.getX() + 1, pos.getY() - 1)
    const frontRightPosition = new Posição(pos.getX() + 1, pos.getY() + 1)


    const frontLeftCell = tabuleiro.getCelula(frontLeftPosition)
    const frontRightCell = tabuleiro.getCelula(frontRightPosition)

    if (frontLeftCell !== null && frontLeftCell.getCor() === "preto") {
      newPossibleMoves.add(frontLeftCell.getPosição())
    }
    console.log(frontRightCell)

    if (frontRightCell !== null && frontRightCell.getCor() === "preto") {
      newPossibleMoves.add(frontRightCell.getPosição())
    }

    return newPossibleMoves;
  }


  calculatePossibleMoves(tabuleiro: Tabuleiro): void {
    const cor = this.getCor();
    this.setPossibleMoves(new Set());
    this.setPossibleMoves(cor === "branco" ? this.calculateWhitePawnMoves(this, tabuleiro) :
      this.calculateBlackPawnMoves(this, tabuleiro))
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
