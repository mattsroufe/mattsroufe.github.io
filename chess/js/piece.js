'use strict';

var FILES = 'abcdefgh'.split('')
var BLACK = 'black';
var WHITE = 'white';

class Piece extends HTMLElement {
  static get extends() { return 'div'; }

  createdCallback() {
    this.setAttribute("draggable", true);
    this.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData("text/plain", e.target.parentNode.id);
    });
  }

  get color() {
    return this.getAttribute('color');
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

  nextRank(amount) {
    if (amount === undefined) amount = 1
    return this.rank() + ((this.color === BLACK) ? -amount : amount)
  }

  fileIndex() {
    return FILES.indexOf(this.file());
  }

  atStartPosition() {
    return (this.color === BLACK) ? this.rank() === 7 : this.rank() === 2
  }

  opponentColor() {
    return this.color === BLACK ? WHITE : BLACK
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

