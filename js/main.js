'use strict';

(function(){

  const container = document.getElementById('playing');
  const buttonStartGameUser = document.querySelector('.control-panel__button--user'); 
  const buttonStartGameComputer = document.querySelector('.control-panel__button--computer');
  const field = document.querySelector('.game__wrap');
  const controlPanel = document.querySelector('.control-panel');
  const cells = document.querySelectorAll('.playing__item');
  const stepName = document.querySelector('.game__step');
  const buttonCloseGame = document.querySelector('.game__close');

  const player1 = 'X';
  const player2 = 'O';
  const playerComputer = 'Компьютер';

  let stepCount = 0;

  const winCombinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ]

  let dataX = []; // ходы игрока Х
  let dataO = []; // ходы игрока O

  // вспомогательные функции добавления и удаления классов //

  const addClassForElement = (element, className) => {
    element.classList.add(className);
  }

  const removeClassForElement = (element, className) => {
    element.classList.remove(className);
  }

  // начало игры для двух пользователей //

  const startGame = () => {
    addClassForElement(field, 'game__wrap--show');
    addClassForElement(controlPanel, 'control-panel--close');
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
    removeClassForElement(field, 'game__wrap--show');
    removeClassForElement(controlPanel, 'control-panel--close');
    cells.forEach(function (cell) {
      cell.innerText = '';
    });
    dataO = [];
    dataX = [];
    stepCount = 0;
    stepName.textContent = 'Ходит игрок ' + player1;
  }


  buttonStartGameUser.addEventListener('click', startGame);
  buttonCloseGame.addEventListener('click', closeGame);

})();