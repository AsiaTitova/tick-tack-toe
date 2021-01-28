'use strict';

(function () {
  
  const container = document.querySelector(".game__playing");
  const field = document.querySelector('.game__wrap');
  const controlPanel = document.querySelector('.control-panel');
  const cells = document.querySelectorAll('.playing__item');
  const stepName = document.querySelector('.game__step');
  let stepCount = 0;
  let board, cellList;
  let origCellList = [];
  let origBoard = [];
  
  const humanPlayer = 'X';
  const aiPlayer = 'O';

  // игра с компьютером // 
  
  const setCellList = () => {
    cells.forEach(function (cell) {
      origCellList.push(cell);      
    })
    return origCellList;
  }

  const setNewBoard = () => {
    cells.forEach(function (cell) {
      origBoard.push(cell.getAttribute("data-cell"));      
    })
    return origBoard;
  }

  const startGameForComputer = () => {
    window.utils.addClass(field, 'game__wrap--show');
    window.utils.addClass(controlPanel, 'control-panel--close');
    cellList = setCellList();
    board = setNewBoard();
    container.addEventListener('click', onCurrentCellWithBot);
  }

  // находим пустые ячейки //

  const findEmptyCells = (board) => {
    return board.filter(cell => cell !== "X" && cell !== "O");
  }

  // алгоритм игры с компьютером //



  const onCurrentCellWithBot = (evt) => {
    let num = +evt.target.getAttribute('data-cell');
    board[num] = humanPlayer;
    evt.target.innerText = 'X';
    evt.target.style = 'color: #00dffc';
    if (checkWinner(board, humanPlayer)) {
      return (stepName.textContent = 'Вы победили!');      
    }  
    const bestMove = minimax(board, aiPlayer);
    board[bestMove.index] = aiPlayer;
    if (cellList[bestMove.index] !== undefined) {
      cellList[bestMove.index].innerText = aiPlayer;
    } else {
      return (stepName.textContent = 'Ничья');
    }
    if (checkWinner(board, aiPlayer)) {
      return (stepName.textContent = 'Победил Компьютер');      
    }
  }

  const minimax = (newBoard, player) => {
  // шаги игры //
  stepCount++;
  
  // доступные клетки //
  let emptyCells = findEmptyCells(newBoard);

  // проверка на терминальное состояние (победа / поражение / ничья) //
  if (checkWinner(newBoard, humanPlayer)){
    return {
      score: -10
    }
  } else if (checkWinner(newBoard, aiPlayer)) {
    return {
      score: 10
    }
	} else if (emptyCells.length === 0) {
  	return {
      score: 0
    }
  }

  // создаем массив для хранения всех движений //
  let moves = [];

  // цикл по доступным клеткам //
  for (let i = 0; i < emptyCells.length; i++) {
    let move = {};
  	move.index = newBoard[emptyCells[i]];

    // совершить ход за текущего игрока //
    newBoard[emptyCells[i]] = player;

    //получить очки, заработанные после вызова минимакса от противника текущего игрока //
    if (player == aiPlayer) {
      let result = minimax(newBoard, humanPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    // очистить клетку //
    newBoard[emptyCells[i]] = move.index;

    // положить объект в массив //
    moves.push(move);
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = +Infinity;
    for (let i = 0; i < moves.length; i++) {
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
  }

  const checkWinner = (board, player) => {
    if (board[0] === player && board[1] === player && board[2] === player ||
        board[3] === player && board[4] === player && board[5] === player ||
        board[6] === player && board[7] === player && board[8] === player ||
        board[0] === player && board[3] === player && board[6] === player ||
        board[1] === player && board[4] === player && board[7] === player ||
        board[2] === player && board[5] === player && board[8] === player ||
        board[0] === player && board[4] === player && board[8] === player ||
        board[2] === player && board[4] === player && board[6] === player) {
          return true;
        }
    return false;
  }


  window.gameai = {
    startGame: startGameForComputer,
    cellList: cellList,
    board: board
  };

})();