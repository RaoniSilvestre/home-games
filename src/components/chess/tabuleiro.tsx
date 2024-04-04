import { Peão, Torre } from "@/libs/chess/peças";
import { Posição } from "@/libs/chess/tipos";
import Tabuleiro from "@/libs/chess/tabuleiro";
import CasaDaPeça from "@/components/chess/casa"

export default function TabuleiroComponent() {
  const tamanho: Posição = new Posição(5, 5);
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = [];

  let torrezinha = new Torre("preto", new Posição(2, 1), tabuleiro)
  tabuleiro.setCelula(torrezinha, torrezinha.getPosição())

  torrezinha.mover(tabuleiro, new Posição(4, 2))

  for (let i = 0; i < tamanho.getX(); i++) {
    for (let j = 0; j < tamanho.getY(); j++) {
      divs.push(<CasaDaPeça key={`${i}-${j}`} peça={tabuleiro.getCelula(new Posição(i, j))} cor={i + j} />);
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

  for (let i = 0; i < tamanho.getX(); i++) {
    const peao = new Peão("preto", new Posição(1, i), tabuleiro)
    tabuleiro.setCelula(peao, peao.getPosição())
  }
  for (let i = 0; i < tamanho.getX(); i++) {
    const peao = new Peão("branco", new Posição(tamanho.getX() - 2, i), tabuleiro)
    tabuleiro.setCelula(peao, peao.getPosição())

  }
}


