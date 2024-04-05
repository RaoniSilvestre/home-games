import { Posição, Cor } from "../tipos";
import Tabuleiro from "../tabuleiro";

export default abstract class PeçaDeXadrez {

  private posição: Posição;
  private cor: Cor;
  private possibleMoves: Set<Posição>;

  constructor(cor: Cor, posição: Posição, tabuleiro: Tabuleiro) {
    this.cor = cor;
    this.posição = posição;
    this.possibleMoves = new Set();
    tabuleiro.setCelula(this, posição)
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

  public abstract mover(tabuleiro: Tabuleiro, posição: Posição): void;



  protected verifyEquality(conjunto: Set<Posição>, posição: Posição): boolean {
    for (const element of conjunto) {
      if (element.x === posição.x && element.y === posição.y) {
        return true
      }
    }
    return false;
  }
}
