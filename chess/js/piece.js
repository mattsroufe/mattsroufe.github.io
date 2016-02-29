"use strict";

var FILES = 'abcdefgh'.split('')
var BLACK = 'black';
var WHITE = 'white';
var selectedPiece;

class Piece extends HTMLElement {
  static get extends() { return 'div'; }

  createdCallback() {
    this.color = this.classList.contains(BLACK) ? BLACK : WHITE
    this.setAttribute("draggable", true);
    this.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData("text/plain", e.target.parentNode.id);
    });
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
    this.classList.add('selected');
    selectedPiece = this;
    this.possibleMoves().highlight();
  }

  deSelect() {
    this.classList.remove('selected');
    selectedPiece = null;
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

