import { Peão, Torre } from "@/libs/chess/peças";
import { Posição } from "@/libs/chess/tipos";
import Tabuleiro from "@/libs/chess/tabuleiro";
import CasaDaPeça from "@/components/chess/casa"

export default function TabuleiroComponent() {
  const tamanho: Posição = [5, 5];
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = [];

  let torrezinha = new Torre("branco", [2, 2])
  tabuleiro.atualizarPeça(torrezinha);
  torrezinha.atualizarPosição(tabuleiro, [1, 2])

  console.log(tabuleiro)

  let peaozinho = new Peão("branco", [2, 2]);
  tabuleiro.atualizarPeça(peaozinho);
  torrezinha.atualizarPosição(tabuleiro, [3, 2])

  for (let i = 0; i < tamanho[0]; i++) {
    for (let j = 0; j < tamanho[1]; j++) {
      divs.push(<CasaDaPeça key={`${i}-${j}`} peça={tabuleiro.obterPeça([i, j])} cor={i + j} />);
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

  for (let i = 0; i < tamanho[0]; i++) {
    const peao = new Peão("preto", [1, i])
    tabuleiro.atualizarPeça(peao)
  }
  for (let i = 0; i < tamanho[0]; i++) {
    const peao = new Peão("branco", [tamanho[0] - 2, i])
    tabuleiro.atualizarPeça(peao)

  }
}
