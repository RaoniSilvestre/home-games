import { Posição } from "@/libs/chess/tipos";
import Tabuleiro from "@/libs/chess/tabuleiro";
import CasaDaPeça from "@/components/chess/casa"

import Torre from "@/libs/chess/peças/torre";
import Peão from "@/libs/chess/peças/peão";
import Bispo from "@/libs/chess/peças/bispo";

export default function TabuleiroComponent() {
  const tamanho: Posição = { x: 5, y: 5 };
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = [];

  let torrezinha = new Torre("preto", { x: 2, y: 2 }, tabuleiro)

  let peaozin = new Peão("branco", { x: 3, y: 3 }, tabuleiro)

  torrezinha.mover(tabuleiro, { x: 2, y: 3 })

  let bispin = new Bispo("branco", { x: 0, y: 1 }, tabuleiro)

  bispin.mover(tabuleiro, torrezinha.getPosição())

  console.log(tabuleiro)

  for (let i = 0; i < tamanho.x; i++) {
    for (let j = 0; j < tamanho.y; j++) {
      divs.push(<CasaDaPeça key={`${i}-${j}`} peça={tabuleiro.getCelula({ x: i, y: j })} cor={i + j} />);
    }
  }

  return (
    <>
      <div className="bg-gray-200 grid grid-cols-5 grid-rows-5 w-[500px] h-[500px] ">
        {divs}
      </div>
    </>
  )
}

function inserirPeões(tabuleiro: Tabuleiro, tamanho: Posição) {

  for (let i = 0; i < tamanho.x; i++) {
    const peao = new Peão("preto", { x: 1, y: i }, tabuleiro)
    tabuleiro.setCelula(peao, peao.getPosição())
  }
  for (let i = 0; i < tamanho.y; i++) {
    const peao = new Peão("branco", { x: tamanho.x - 2, y: i }, tabuleiro)
    tabuleiro.setCelula(peao, peao.getPosição())

  }
}


