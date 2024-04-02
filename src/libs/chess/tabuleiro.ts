import { MPeça, Posição } from "./tipos";


export default class Tabuleiro {
  celulas: (MPeça)[][];

  constructor(posição: Posição) {
    this.celulas = Array.from({ length: posição[0] }, () => Array(posição[1]).fill(null))
  }

  atualizarPeça(peça: MPeça): void {
    if (peça === null)
      console.log("Não tem peça pra mover nessa casa")
    else {
      const [x, y] = peça.posição;
      this.celulas[x][y] = peça;

    }

  }

  removerPeça(posição: Posição): void {
    const [x, y] = posição;
    this.celulas[x][y] = null;
  }

  obterPeça(posição: Posição): MPeça {
    const [x, y] = posição;
    return this.celulas[x][y];
  }
}




