import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Tile from './components/Tile';


// Constraints: 
// 1. Variable-size board
// Board has 3 rows each with 3 cols
// Board 
function App() {
  const [scores, setScores] = useState<number[]>([0, 0]);
  const [board, setBoard] = useState<string[]>([]);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [tileElem, setTileElem] = useState('O');
  

  useEffect(() => {
    generateBoard();
  }, [])
  
  const generateBoard = () => {
    setBoard(Array(9).fill(''));
    setTileElem('O');
    setWinner('');
    setGameEnd(false);
  }

  const onTileClick = (index: number) => {
    if (gameEnd) return;
    if (board[index] === '') {
      
      setBoard((prevBoard) => {
        prevBoard[index] = tileElem;
        checkWinner(prevBoard);

        return prevBoard;
      })
      
  
      if (tileElem === 'O')  {
        setTileElem('X');
      } else if (tileElem === 'X')  {
        setTileElem('O');
      }

    }
  }


  const checkWinner = (board: string[]) => {
    let winner = isRowWin(board) || isColWin(board) || isDiagWin(board);
    if (winner !== '') {
      if (winner === 'O') {
        setWinner("Player 1");
        setScores([scores[0]+1, scores[1]])
      } else if (winner === 'X') {
        setWinner("Player 2");
        setScores([scores[0], scores[1]+1])
      }
      setGameEnd(true);
      return true;
    }
    checkDraw(board)
    return false;
  }

  const checkDraw = (board: string[]) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') return false;
    }
    setGameEnd(true);
    return true;
  }

  const isRowWin = (board: string[]) => {
    for (let i = 0; i < board.length; i+=3) {
      if (board[i] === '') continue;
      if (board[i] === board[i+1] && board[i+1] === board[i+2]) {
        return board[i];
      }
    }
    return '';
  }

  const isColWin = (board: string[]) => {
    // Constraint: Only 3 cols allowed
    for (let i = 0; i < 3; i++) {
      if (board[i] === '') continue;
      if (board[i] === board[i+3] && board[i+3] === board[i+6]) {
        return board[i];
      }
    }
    return '';
  }

  const isDiagWin = (board: string[]) => {
    // Constraint: Only 3 cols allowed
    for (let i = 0; i < 3; i++) {
      if (board[i] === '') continue;

      if (board[i] === board[i+4] && board[i+4] === board[i+8]) {
        return board[i];
      }
    }
    if (board[2] === board[4] && board[4] === board[6]) return board[2];
    return '';
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {gameEnd 
        ? (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 p-8 text-center'>
            {winner 
            ? <h1 className='font-bold text-lg'>{winner} wins!</h1>
            : <h1 className='font-bold text-lg'>Draw!</h1>
            }
            <button onClick={generateBoard} type="button">Play again?</button>
          </div>
        )
        : <></>
      }
      <h1 className='font-bold text-3xl'>Tic Tac Toe</h1>
      <h1 className='font-bold text-xl absolute left-8 top-8'>Player 1 Score: {scores[0]}</h1>
      <h1 className='font-bold text-xl absolute right-8 top-8'>Player 2 Score: {scores[1]}</h1>
      <h1 className='font-bold text-xl mb-8'>{tileElem === 'O' ? "Player 1" : "Player 2"}'s Turn</h1>
      <div className='mx-auto grid grid-cols-3 gap-0 w-[300px]'>
        {board.map((elem, index) => (
          <Tile onClick={() => onTileClick(index)} key={index} 
            tileElem={elem} />
        ))}
      </div>
    </div>
  );
}

export default App;
