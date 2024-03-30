
export type Cor = "branco" | "preto";
export type MPeça = PeçaDeXadrez | null;
export type Posição = [number, number];


export class Tabuleiro {
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



export abstract class PeçaDeXadrez {

  posição: Posição;
  cor: Cor;

  constructor(
    cor: Cor,
    posição: Posição
  ) {
    this.cor = cor;
    this.posição = posição;
  }

  abstract mover(tabuleiro: Tabuleiro, posição: Posição): void;
}

export class Peão extends PeçaDeXadrez {

  atualizarPosição(tabuleiro: Tabuleiro, posição: Posição): void {
    tabuleiro.removerPeça(this.posição)
    this.posição = posição;

    tabuleiro.atualizarPeça(this);
  }

  mover(tabuleiro: Tabuleiro, posição: Posição): boolean {
    if (this.cor === "branco") {
      const posDesejada = tabuleiro.obterPeça(posição)
      if (posDesejada === null && posição[0] === this.posição[0] - 1 && posição[1] === this.posição[1]) {
        this.atualizarPosição(tabuleiro, posição);
        return true;
      } else if (posDesejada !== null && posDesejada.posição[0] === this.posição[0] - 1 &&
        (posDesejada.posição[1] === this.posição[1] + 1 || posDesejada.posição[1] === this.posição[1] - 1)
      ) {
        this.atualizarPosição(tabuleiro, posição);
        return true;
      } else {
        console.log("Movimento inválido para a peça branca.")
        return false;
      }

    } else if (this.cor === "preto") {
      const posDesejada = tabuleiro.obterPeça(posição);
      if (posDesejada === null && posição[0] === this.posição[0] + 1 && posição[1] === this.posição[1]) {
        this.atualizarPosição(tabuleiro, posição);
        return true;
      } else if (posDesejada !== null && posDesejada.cor === "branco" &&
        (posDesejada.posição[0] === this.posição[0] + 1) &&
        (posDesejada.posição[1] === this.posição[1] + 1 || posDesejada.posição[1] === this.posição[1] - 1)
      ) {
        this.atualizarPosição(tabuleiro, posição);
        return true;
      } else {
        console.log("Movimento inválido para a peça preta.");
        return false;
      }
    } else {
      return false;
    }
  }

}

export class Torre extends PeçaDeXadrez {

  mover(): void {

  }
}

