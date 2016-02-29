'use strict';

class Moves extends Array {

  highlight() {
    this.forEach(function (square) {
      square.classList.add('highlighted');
    });
  }

  unHighlight() {
    this.forEach(function (square) {
      square.classList.remove('highlighted');
    });
  };
}
