import { Posição } from "@/libs/chess/tipos";
import Tabuleiro from "@/libs/chess/tabuleiro";
import CasaDaPeça from "@/components/chess/casa"

import Torre from "@/libs/chess/peças/torre";
import Peão from "@/libs/chess/peças/peão";
import Bispo from "@/libs/chess/peças/bispo";
import Rei from "@/libs/chess/peças/rei";
import Rainha from "@/libs/chess/peças/rainha";
import Cavalo from "@/libs/chess/peças/cavalo";

export default function TabuleiroComponent() {
  const tamanho: Posição = { x: 8, y: 8 };
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = [];

  inserirPeões(tabuleiro)
  let cavalin = new Cavalo("preto", { x: 0, y: 2 }, tabuleiro)

  let torrezinha = new Torre("branco", { x: 4, y: 3 }, tabuleiro)




  for (let i = 0; i < tamanho.x; i++) {
    for (let j = 0; j < tamanho.y; j++) {
      divs.push(<CasaDaPeça key={`${i}-${j}`} peça={tabuleiro.getCelula({ x: i, y: j })} cor={i + j} />);
    }
  }

  return (
    <div className={`flex justify-center items-center h-screen`}>
      <div className={`bg-gray-100 grid grid-rows-${tamanho.x} grid-cols-${tamanho.y} box-border m-0 p-0 gap-0 w-max`} >
        {divs}
      </div >
    </div>
  )
}

function inserirPeões(tabuleiro: Tabuleiro) {
  let { x, y } = tabuleiro.getMaxPos()

  for (let i = 0; i < x; i++) {
    const peao = new Peão("preto", { x: 1, y: i }, tabuleiro)
    tabuleiro.setCelula(peao, peao.getPosição())
  }
  for (let i = 0; i < y; i++) {
    const peao = new Peão("branco", { x: x - 2, y: i }, tabuleiro)
    tabuleiro.setCelula(peao, peao.getPosição())

  }
}

function startGame(tabuleiro: Tabuleiro) { }
