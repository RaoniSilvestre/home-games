import { Posição, Cor } from "./tipos";
import Tabuleiro from "./tabuleiro";
import { error } from "console";


export abstract class PeçaDeXadrez {

  private posição: Posição;
  private cor: Cor;
  private possibleMoves: Set<Posição>;

  constructor(cor: Cor, posição: Posição, tabuleiro: Tabuleiro) {
    this.cor = cor;
    this.posição = posição;
    this.possibleMoves = new Set();
    this.calculatePossibleMoves(tabuleiro)
  }

  protected abstract calculatePossibleMoves(tabuleiro: Tabuleiro): void

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

  public setPossibleMoves(possibleMoves: Set<Posição>): void {
    this.possibleMoves = possibleMoves;
  }

  public getPossibleMoves(): Set<Posição> {
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
      error("Fora do tabuleiro")
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
      error("Fora do tabuleiro")
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

