import { Peão, Posição, Tabuleiro } from "@/libs/chess/peças";
import CasaDaPeça from "@/components/chess/casa"
export default function TabuleiroComponent() {
  const tamanho: Posição = [5, 5];
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = []
  for (let i = 0; i < tamanho[0]; i++) {
    const peao = new Peão("preto", [1, i])
    tabuleiro.atualizarPeça(peao)
  }
  for (let i = 0; i < tamanho[0]; i++) {
    const peao = new Peão("branco", [3, i])
    tabuleiro.atualizarPeça(peao)

  }
  console.log(tabuleiro)
  const pecinha = tabuleiro.obterPeça([3, 2])
  pecinha?.mover(tabuleiro, [2, 2])
  console.log(tabuleiro)
  console.log(tabuleiro.obterPeça([2, 2]))
  const peaopreto = tabuleiro.obterPeça([1, 1])
  peaopreto?.mover(tabuleiro, [2, 2])
  tabuleiro.obterPeça([3, 3])?.mover(tabuleiro, [2, 2])
  tabuleiro.atualizarPeça(tabuleiro.obterPeça([2, 2]))
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
