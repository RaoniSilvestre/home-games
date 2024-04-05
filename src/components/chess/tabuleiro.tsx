import { Posição } from "@/libs/chess/tipos";
import Tabuleiro from "@/libs/chess/tabuleiro";
import CasaDaPeça from "@/components/chess/casa"
import startGame from "@/libs/chess/utils";

export default function TabuleiroComponent() {
  const tamanho: Posição = { x: 8, y: 8 };
  const tabuleiro = new Tabuleiro(tamanho)
  const divs = [];

  startGame(tabuleiro)
  tabuleiro.moverPeça({ x: 6, y: 2 }, { x: 5, y: 2 })
  tabuleiro.moverPeça({ x: 1, y: 2 }, { x: 2, y: 2 })
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



