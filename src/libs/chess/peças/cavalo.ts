import Tabuleiro from "../tabuleiro";
import { Posição } from "../tipos";
import PeçaDeXadrez from "./peça";

export default class Cavalo extends PeçaDeXadrez {

  protected calculatePossibleMoves(tabuleiro: Tabuleiro): void {
    this.setPossibleMoves(new Set());
    let newPossibleMoves: Set<Posição> = new Set();
    let { x, y } = this.getPosição();

    const addMoveIfValid = (x: number, y: number) => {
      if (!tabuleiro.verifyPos({ x: x, y: y })) return
      const conteudo = tabuleiro.getCelula({ x, y })
      if (conteudo === null || conteudo.getCor() !== this.getCor()) {
        newPossibleMoves.add({ x, y })
      }
    }

    addMoveIfValid(x - 2, y - 1);
    addMoveIfValid(x - 2, y + 1);
    addMoveIfValid(x - 1, y - 2);
    addMoveIfValid(x - 1, y + 2);
    addMoveIfValid(x + 1, y - 2);
    addMoveIfValid(x + 1, y + 2);
    addMoveIfValid(x + 2, y - 1);
    addMoveIfValid(x + 2, y + 1);



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
