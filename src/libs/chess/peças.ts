import { Posição, Cor } from "./tipos";
import { Tabuleiro } from "./tabuleiro";

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

  atualizarPosição(tabuleiro: Tabuleiro, posição: Posição): void {
    tabuleiro.removerPeça(this.posição)
    this.posição = posição;
    tabuleiro.atualizarPeça(this);
  }

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

