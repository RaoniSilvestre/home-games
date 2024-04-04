import PeçaDeXadrez from "./peças/peça";

export type Cor = "branco" | "preto";
export type MPeça = PeçaDeXadrez | null;
export type Posição = { x: number, y: number }
