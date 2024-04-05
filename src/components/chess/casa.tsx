import Peão from "@/libs/chess/peças/peão"
import Torre from "@/libs/chess/peças/torre"
import Bispo from "@/libs/chess/peças/bispo"
import Cavalo from "@/libs/chess/peças/cavalo"
import Rainha from "@/libs/chess/peças/rainha"
import Rei from "@/libs/chess/peças/rei"
import Image from "next/image"
import { MPeça } from "@/libs/chess/tipos"

import peao_preto from "@/assets/chess/peao_preto.png"
import peao_branco from "@/assets/chess/peão_branco.png"
import torre_preta from "@/assets/chess/torre_preta.png"
import torre_branca from "@/assets/chess/torre_branca.png"
import bispo_branco from "@/assets/chess/bispo_branco.png"
import bispo_preto from "@/assets/chess/bispo_preto.png"
import cavalo_preto from "@/assets/chess/cavalo_preto.png"
import cavalo_branco from "@/assets/chess/cavalo_branco.png"
import rainha_branca from "@/assets/chess/rainha_branca.png"
import rainha_preta from "@/assets/chess/rainha_preta.png"
import rei_branco from "@/assets/chess/rei_branco.png"
import rei_preto from "@/assets/chess/rei_preto.png"


interface PropsCasa {
  peça: MPeça;
  cor: number;
}

export default function CasaDaPeça({ peça, cor }: PropsCasa) {
  const tamanhoDasCoisa = 100
  let myclassnamis = ``
  myclassnamis = myclassnamis + (cor % 2 === 0 ? ' bg-gray-200' : ' bg-gray-300')

  if (peça instanceof Peão) {
    return <div className={myclassnamis}>
      <Image
        src={peça.getCor() === "preto" ? peao_preto : peao_branco}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }

  if (peça instanceof Torre) {
    return <div className={myclassnamis}>
      <Image
        src={peça.getCor() === "preto" ? torre_preta : torre_branca}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }

  if (peça instanceof Bispo) {
    return <div className={myclassnamis}>
      <Image
        src={peça.getCor() === "preto" ? bispo_preto : bispo_branco}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }

  if (peça instanceof Cavalo) {
    return <div className={myclassnamis}>
      <Image
        src={peça.getCor() === "preto" ? cavalo_preto : cavalo_branco}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }
  if (peça instanceof Rainha) {
    return <div className={myclassnamis}>
      <Image
        src={peça.getCor() === "preto" ? rainha_preta : rainha_branca}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />


    </div>
  }
  if (peça instanceof Rei) {
    return <div className={myclassnamis}>
      <Image
        src={peça.getCor() === "preto" ? rei_preto : rei_branco}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }
  return <div className={myclassnamis}></div>
}
