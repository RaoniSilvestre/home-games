import Tabuleiro from "./tabuleiro";
import Torre from "@/libs/chess/peças/torre";
import Peão from "@/libs/chess/peças/peão";
import Bispo from "@/libs/chess/peças/bispo";
import Rei from "@/libs/chess/peças/rei";
import Rainha from "@/libs/chess/peças/rainha";
import Cavalo from "@/libs/chess/peças/cavalo";

function inserirPeões(tabuleiro: Tabuleiro) {
  let { x, y } = tabuleiro.getMaxPos()

  for (let i = 0; i < x; i++) {
    new Peão("preto", { x: 1, y: i }, tabuleiro)
  }
  for (let i = 0; i < y; i++) {
    new Peão("branco", { x: x - 2, y: i }, tabuleiro)

  }
}

function inserirTorres(tabuleiro: Tabuleiro) {
  new Torre("preto", { x: 0, y: 0 }, tabuleiro)
  new Torre("preto", { x: 0, y: tabuleiro.getMaxPos().y - 1 }, tabuleiro)

  new Torre("branco", { x: tabuleiro.getMaxPos().x - 1, y: 0 }, tabuleiro)
  new Torre("branco", { x: tabuleiro.getMaxPos().x - 1, y: tabuleiro.getMaxPos().y - 1 }, tabuleiro)
}

function inserirBispos(tabuleiro: Tabuleiro) {
  new Bispo("preto", { x: 0, y: 2 }, tabuleiro)
  new Bispo("preto", { x: 0, y: tabuleiro.getMaxPos().y - 3 }, tabuleiro)

  new Bispo("branco", { x: tabuleiro.getMaxPos().x - 1, y: 2 }, tabuleiro)
  new Bispo("branco", { x: tabuleiro.getMaxPos().x - 1, y: tabuleiro.getMaxPos().y - 3 }, tabuleiro)
}

function inserirCavalos(tabuleiro: Tabuleiro) {
  new Cavalo("preto", { x: 0, y: 1 }, tabuleiro)
  new Cavalo("preto", { x: 0, y: 6 }, tabuleiro)

  new Cavalo("branco", { x: tabuleiro.getMaxPos().x - 1, y: 1 }, tabuleiro)
  new Cavalo("branco", { x: tabuleiro.getMaxPos().x - 1, y: 6 }, tabuleiro)
}

function inserirRealeza(tabuleiro: Tabuleiro) {
  new Rainha("preto", { x: 0, y: 3 }, tabuleiro)
  new Rei("preto", { x: 0, y: 4 }, tabuleiro)

  new Rainha("branco", { x: 7, y: 3 }, tabuleiro)
  new Rei("branco", { x: 7, y: 4 }, tabuleiro)
}

export default function startGame(tabuleiro: Tabuleiro) {
  inserirPeões(tabuleiro)
  inserirTorres(tabuleiro)
  inserirBispos(tabuleiro)
  inserirCavalos(tabuleiro)
  inserirRealeza(tabuleiro)
}
