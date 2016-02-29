'use strict';

var FILES = 'abcdefgh'.split('')
var BLACK = 'black';
var WHITE = 'white';

class Piece extends HTMLElement {

  createdCallback() {
    this.setAttribute("draggable", true);
    this.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData("text/plain", e.target.parentNode.id);
    });
  }

  get color() {
    return this.getAttribute('color');
  }

  get selected() {
    return this.getAttribute('selected');
  }

  rank() {
    return this.currentSquare().rank;
  }

  file() {
    return this.currentSquare().file;
  }

  currentSquare() {
    return this.parentNode;
  }

  select() {
    this.setAttribute('selected', true);
    Piece.selected = this;
    this.possibleMoves().highlight();
  }

  deSelect() {
    this.setAttribute('selected', false);
    Piece.selected = null;
    return this;
  }

  move(target) {
    var possibleMoves = this.possibleMoves();
    if (target.classList.contains('piece')) {
      if (target !== this) target.currentSquare().replaceChild(this, target);
    } else {
      target.appendChild(this);
    }
    this.deSelect();
    possibleMoves.unHighlight();
  }
}

