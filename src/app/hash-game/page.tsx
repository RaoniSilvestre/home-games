"use client";

import GridItem from "@/components/hash-game/gridItem";
import { useState, useEffect } from "react";

export default function Page() {
  const [matriz, setMatriz] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [turn, setTurn] = useState(1);

  function winner(matriz: number[][], player: number) {
    for (let i = 0; i < 3; i++) {
      if (matriz[i][0] === player && matriz[i][1] === player && matriz[i][2] === player) return true;
      if (matriz[0][i] === player && matriz[1][i] === player && matriz[2][i] === player) return true;
    }
    if (matriz[0][0] === player && matriz[1][1] === player && matriz[2][2] === player) return true;
    if (matriz[0][2] === player && matriz[1][1] === player && matriz[2][0] === player) return true;
    return false;
  };

  useEffect(() => {
    if (winner(matriz, 1)) { alert("Player 1 ganhou!"); resetGame() };
    if (winner(matriz, 2)) { alert("Player 2 ganhou!"); resetGame() };
  }, [matriz]);



  const handleClick = (location: [number, number]) => {
    const [i, j] = location;
    if (matriz[i][j] !== 0) return;
    const newMatriz = matriz.map((row) => row.slice());
    newMatriz[i][j] = turn;
    setMatriz(newMatriz);
    setTurn(turn === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setMatriz([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setTurn(1);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-3 gap-4">
          {matriz.map((row, i) =>
            row.map((state, j) => (
              <GridItem
                handleClick={handleClick}
                key={`${i}-${j}`}
                location={[i, j]}
                state={matriz[i][j]}
              />
            ))
          )}
        </div>
      </div>
      <button type="button" className={"bg-purple-100"} onClick={resetGame}>resetar!</button>
    </>
  );
}
