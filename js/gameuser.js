'use strict';

(function () {

  const field = document.querySelector('.game__wrap');
  const controlPanel = document.querySelector('.control-panel');
  const cells = document.querySelectorAll('.playing__item');
  const stepName = document.querySelector('.game__step');
  const buttonCloseGame = document.querySelector('.game__close');

  const player1 = 'X';
  const player2 = 'O';

  let stepCount = 0;

  const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  let dataX = []; // ходы игрока Х
  let dataO = []; // ходы игрока O

  const startGame = () => {
    window.utils.addClass(field, 'game__wrap--show');
    window.utils.addClass(controlPanel, 'control-panel--close');
    cells.forEach(function (cell) {
      cell.addEventListener('click', onCurrentCell);
    })
  }

  // ходы игроков для игры 2ух пользователей //

  const onCurrentCell = (evt) => {
    let num = +evt.target.getAttribute('data-cell');
    if (!evt.target.textContent) {
      if (stepCount % 2 === 0) {
        evt.target.innerText = 'X';
        evt.target.style = 'color: #00dffc';
        dataX.push(num);
      } else {
        evt.target.innerText = 'O';
        evt.target.style = 'color: rgb(98%, 82%, 0%, 1)';
        dataO.push(num);
      };
      if ((dataO.length > 2 || dataX.length > 2) && (checkWin(dataO, num) || checkWin(dataX, num))) {
        cells.forEach(function (cell) {
          cell.removeEventListener('click', onCurrentCell);
        })
        if (checkWin(dataO, num)) {
          return (stepName.textContent = 'Победил игрок O');
        }

        if (checkWin(dataX, num)) {
          return (stepName.textContent = 'Победил игрок X');
        }
      }
      
      stepCount++;
      if (stepCount === 9) {
        stepName.textContent = 'Ничья'
      } else if (stepCount % 2 === 0) {
        stepName.textContent = 'Ходит игрок ' + player1;
      } else {
        stepName.textContent = 'Ходит игрок ' + player2;
      }
    }
  }

  // проверка на победные комбинации //

  const checkWin = (arr, number) => {
    for (let i = 0; i < winCombinations.length; i++) {
      let someWinArr = winCombinations[i];
      let count = 0;
      if (someWinArr.indexOf(number) !== -1) {
        for (let k = 0; k < someWinArr.length; k++) {
          if (arr.indexOf(someWinArr[k]) !== -1) {   
            count++;
            if (count === 3) {
              document.querySelector(`[data-cell="${someWinArr[0]}"]`).style = 'color: red';
              document.querySelector(`[data-cell="${someWinArr[1]}"]`).style = 'color: red';
              document.querySelector(`[data-cell="${someWinArr[2]}"]`).style = 'color: red';
              return true;
            }
          }
        }
        count = 0;
      }
    }
  }

  // завершение игры //

  const closeGame = () => {
    window.utils.removeClass(field, 'game__wrap--show');
    window.utils.removeClass(controlPanel, 'control-panel--close');
    cells.forEach(function (cell, index) {
      cell.innerText = '';
      cell.setAttribute('data-cell', index);
    });
    dataO = [];
    dataX = [];
    window.gameai.cellList = [];
    window.gameai.board = [];
    stepCount = 0;
    stepName.textContent = 'Ходит игрок ' + player1;
  }


  window.gameuser = {
    startGame: startGame,
    closeGame: closeGame
  };

})();