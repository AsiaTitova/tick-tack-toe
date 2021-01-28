'use strict';

(function () {

  // вспомогательные функции добавления и удаления классов //
  
  const addClassForElement = (element, className) => {
    element.classList.add(className);
  }

  const removeClassForElement = (element, className) => {
    element.classList.remove(className);
  }


  window.utils = {
    addClass: addClassForElement,
    removeClass: removeClassForElement
  };

})();