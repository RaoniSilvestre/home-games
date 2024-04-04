import { Posição } from "@/libs/chess/tipos";
import Tabuleiro from "@/libs/chess/tabuleiro";
import CasaDaPeça from "@/components/chess/casa"

import Torre from "@/libs/chess/peças/torre";
import Peão from "@/libs/chess/peças/peão";
import Bispo from "@/libs/chess/peças/bispo";

export default function TabuleiroComponent() {
  const tamanho: Posição = { x: 8, y: 8 };
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = [];

  inserirPeões(tabuleiro)
  let torrezinha = new Torre("preto", { x: 2, y: 2 }, tabuleiro)

  let peaozin = new Peão("branco", { x: 3, y: 3 }, tabuleiro)

  torrezinha.mover(tabuleiro, { x: 2, y: 3 })

  let bispin = new Bispo("branco", { x: 0, y: 1 }, tabuleiro)

  bispin.mover(tabuleiro, torrezinha.getPosição())


  bispin.mover(tabuleiro, { x: 1, y: 2 })
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


