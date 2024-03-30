import { MPeça, Peão } from "@/libs/chess/peças"
import Image from "next/image"
import peao_preto from "@/assets/chess/peao_preto.png"
import peao_branco from "@/assets/chess/peão_branco.png"
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

  return <div className={myclassnamis}></div>
}
