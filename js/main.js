'use strict';

(function(){

  const buttonStartGameUser = document.querySelector('.control-panel__button--user'); 
  const buttonStartGameComputer = document.querySelector('.control-panel__button--computer');
  const buttonCloseGame = document.querySelector('.game__close');

  buttonStartGameUser.addEventListener('click', window.gameuser.startGame);
  buttonStartGameComputer.addEventListener('click', window.gameai.startGame);
  buttonCloseGame.addEventListener('click', window.gameuser.closeGame);

})();
