import { MPeça, Peão, Torre } from "@/libs/chess/peças"
import Image from "next/image"

import peao_preto from "@/assets/chess/peao_preto.png"
import peao_branco from "@/assets/chess/peão_branco.png"
import torre_preta from "@/assets/chess/torre_preta.png"
import torre_branca from "@/assets/chess/torre_branca.png"

interface PropsCasa {
  peça: MPeça;
  cor: number;
}

export default function CasaDaPeça({ peça, cor }: PropsCasa) {
  const tamanhoDasCoisa = 100
  let myclassnamis = `h-[${tamanhoDasCoisa}px] w-[${tamanhoDasCoisa}px]`
  myclassnamis = myclassnamis + (cor % 2 === 0 ? ' bg-gray-200' : ' bg-gray-300')

  if (peça instanceof Peão) {
    return <div className={myclassnamis}>
      <Image
        src={peça.cor === "preto" ? peao_preto : peao_branco}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }

  if (peça instanceof Torre) {
    return <div className={myclassnamis}>
      <Image
        src={peça.cor === "preto" ? torre_preta : torre_branca}
        alt="peão preto"
        width={tamanhoDasCoisa}
        height={tamanhoDasCoisa}
      />

    </div>
  }

  return <div className={myclassnamis}></div>
}
