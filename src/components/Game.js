import React, { useState } from "react";
import Square from "./Square";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);

  const handlerClick = (index) => {
    const notify1 = () =>
      toast.success(`Player ${winner} has been won`, {
        theme: "colored",
      });

    const notify2 = () =>
      toast.info(`The game is draw`, {
        theme: "colored",
      });

    if (gameOver) return;

    let newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    let winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true);
      //   alert(`Player ${winner} has been won`);
      notify1();
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      //   alert(`The game is draw`);
      notify2();
    } else setPlayer(player === "X" ? "O" : "X");
  };

  const calculateWinner = (square) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c])
        return square[a];
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setGameOver(false);
  };

  return (
    <>
      <div className="header">
        <h1>Tic Tac Toe Game</h1>
      </div>

      <div className="board">
        {board.map((item, index) => {
          return (
            <Square
              clickBtn={handlerClick}
              key={index}
              value={item}
              index={index}
            />
          );
        })}
      </div>
      <div className="btn">
        <button onClick={resetGame}>Restart Game</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Game;
