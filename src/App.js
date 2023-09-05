import { useState } from 'react';
import './App.css';

function InfoAboutGame({ isXTurn, onNewGame }) {
  return (
    <div className='infoAboutGame'>
      <button onClick={onNewGame} className='startBtn'>New game</button>
      <p>Now walks {isXTurn ? 'X' : 'O'}</p>
    </div>
  )
}

function GameTable(props) {
  return (
    <div className='gameTable'>
      <Squares {...props} />
    </div>
  )
}

function Squares({ isXTurn, onChangeTurn, squares, changeSquares }) {

  function handleClick(pos) {
    if (isWinner(squares)) {
      return;
    }
    if (squares[pos]) {
      return;
    }
    const newSquares = [...squares];
    if (isXTurn) {
      newSquares[pos] = 'X';
    } else {
      newSquares[pos] = 'O';
    }
    onChangeTurn();
    changeSquares(newSquares);
  }

  return (
    <>
      {[0, 3, 6].map((i) => (
        <div className='row' key={i}>
          {[0, 1, 2].map((j) => (
            <Square value={squares[j + i]} onSquareClick={() => handleClick(j + i)} key={j} />
          ))}
        </div>
      ))}
      <div className='winnerInfo'>
        <WinnerInfo squares={squares} />
      </div>
    </>
  )
}

function Square({ value, onSquareClick }) {
  
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

function WinnerInfo({ squares }) {
  const winnerStatus = isWinner(squares);
 
  if (winnerStatus) {
    return <p>Winner: {winnerStatus}</p>
  } else if (!squares.includes(null)) { 
    return <p>Draw</p>
  } else {
    return <p>Game is still on...</p>
  }
}

function isWinner(squares) {
  const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

function App() {

    const [isXTurn, setIsXTurn] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleNewGame() {
      setSquares(Array(9).fill(null));
      setIsXTurn(true);
    }

    function handleNewSquares(newSquares) {
      setSquares(newSquares);
    }

    function handleXTurn() {
      setIsXTurn(!isXTurn);
    }
    return (
      <div className='game'>
        <InfoAboutGame 
          isXTurn={isXTurn} 
          onNewGame={handleNewGame} 
        />
        <GameTable 
          isXTurn={isXTurn} 
          onChangeTurn={handleXTurn} 
          squares={squares} 
          changeSquares={handleNewSquares}
        />
      </div>
    )
}

export default App;
