import { Posição, Cor } from "./tipos";
import Tabuleiro from "./tabuleiro";
import { error } from "console";


export abstract class PeçaDeXadrez {

  private posição: Posição;
  private cor: Cor;
  private possibleMoves: (Posição)[]

  constructor(cor: Cor, posição: Posição) {
    this.cor = cor;
    this.posição = posição;
    this.possibleMoves = []
    this.calculatePossibleMoves();
  }

  protected abstract calculatePossibleMoves(): void

  public getPosição(): Posição {
    return this.posição;
  }

  public setPosição(pos: Posição): void {
    this.posição = pos;
  }

  public getCor(): Cor {
    return this.cor;
  }

  public setCor(corzinha: Cor): void {
    this.cor = corzinha;
  }

  public setPossibleMoves(possibleMoves: (Posição)[]): void {
    this.possibleMoves = possibleMoves;
  }

  public getPossibleMoves(): (Posição)[] {
    return this.possibleMoves;
  }

  protected atualizarPosição(tabuleiro: Tabuleiro, posição: Posição): void {
    tabuleiro.setCelula(null, this.getPosição());
    this.setPosição(posição);
    tabuleiro.setCelula(this, posição);
  }

  public abstract mover(tabuleiro: Tabuleiro, posição: Posição): void;
}


// Peão!!
export class Peão extends PeçaDeXadrez {
  private calculateWhitePawnMoves(peça: Peão, tabuleiro: Tabuleiro): Posição[] {
    const [x, y] = peça.getPosição()

    let newPossibleMoves: Posição[] = []

    const frontCell = tabuleiro.getCelula([x - 1, y])
    if (frontCell === null) {
      newPossibleMoves.push([x - 1, y])
    }

    const frontLeftCell = tabuleiro.getCelula([x - 1, y - 1])
    const frontRightCell = tabuleiro.getCelula([x - 1, y + 1])

    if (frontLeftCell !== null && frontLeftCell.getCor() === "preto") {
      newPossibleMoves.push(frontLeftCell.getPosição())
    }

    if (frontRightCell !== null && frontRightCell.getCor() === "preto") {
      newPossibleMoves.push(frontRightCell.getPosição())
    }

    return newPossibleMoves;
  }

  private calculateBlackPawnMoves(peça: PeçaDeXadrez, tabuleiro: Tabuleiro) {
    const [x, y] = peça.getPosição()

    let newPossibleMoves: Posição[] = []

    const frontCell = tabuleiro.getCelula([x + 1, y])
    if (frontCell === null) {
      newPossibleMoves.push([x + 1, y])
    }

    const frontLeftCell = tabuleiro.getCelula([x + 1, y - 1])
    const frontRightCell = tabuleiro.getCelula([x + 1, y + 1])

    if (frontLeftCell !== null && frontLeftCell.getCor() === "preto") {
      newPossibleMoves.push(frontLeftCell.getPosição())
    }

    if (frontRightCell !== null && frontRightCell.getCor() === "preto") {
      newPossibleMoves.push(frontRightCell.getPosição())
    }

    return newPossibleMoves;
  }
  private calculatePossibleMoves(tabuleiro: Tabuleiro): void {
    const cor = this.getCor();
    this.setPossibleMoves([]);
    this.setPossibleMoves(cor === "branco" ? this.calculateWhitePawnMoves(tabuleiro) : this.calculateBlackPawnMoves(tabuleiro))
  }

  mover(tabuleiro: Tabuleiro, posiçãoNova: Posição): boolean {

    if (!tabuleiro.verifyPos(posiçãoNova)) {
      error("Fora do tabuleiro")
      return false;
    }


    this.calculatePossibleMoves(tabuleiro);

    if (this.getPossibleMoves().includes(posiçãoNova)) {
      tabuleiro.setCelula(this, tabuleiro);
      return true;
    }
    return false;
  }


}








export class Torre extends PeçaDeXadrez {



  mover(tabuleiro: Tabuleiro, posição: Posição): boolean {
    let thisX = this.posição[0];
    let thisY = this.posição[1];

    let novaPosiçãoX = posição[0];
    let novaPosiçãoY = posição[1];

    let absolutX = Math.abs(thisX - novaPosiçãoX);
    let absolutY = Math.abs(thisY - novaPosiçãoY);

    // Se estão na mesma linha
    if (thisX === novaPosiçãoX) {
      //Verifique se tem alguem na mesma coluna :: Precisa-se fazer direito!!!
      while (absolutY !== 0) {
        if (tabuleiro.obterPeça([thisX, thisY]) !== null) {
          console.log("movimento inválido")
          return false;
        }
        thisY--;
        absolutY = Math.abs(thisY - novaPosiçãoY)
      }
      this.atualizarPosição(tabuleiro, posição);
      return true;
    } else if (thisY === novaPosiçãoY) {
      while (absolutX !== 0) {
        if (tabuleiro.obterPeça([thisX, thisY]) !== null) {

          console.log("movimento inválido")
          return false;
        }
        thisX--;
        absolutY = Math.abs(thisX - novaPosiçãoX);
      }
      this.atualizarPosição(tabuleiro, posição);
      return true;
    } else {
      console.log("movimento inválido")
      return false
    }
  }
}

