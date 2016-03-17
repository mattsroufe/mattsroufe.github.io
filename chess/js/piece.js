'use strict';

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

  get rank() {
    return this.square.rank;
  }

  get file() {
    return this.square.file;
  }

  get square() {
    return this.parentNode;
  }

  get opponent() {
    return this.color === BLACK ? WHITE : BLACK
  }

  possibleMoves() {
    return chess.moves({square: this.square.id, verbose: true}).map((move) => window[move.to]);
  }

  select() {
    this.setAttribute('selected', true);
    Piece.selected = this;
    Square.highlight(this.possibleMoves().concat(this.square));
    return this;
  }

  deSelect() {
    this.setAttribute('selected', false);
    Piece.selected = null;
    Square.removeHighlighting();
    return this;
  }

  move(target) {
    if (target !== this) {
      var from = this.square, to;
      if (target.classList.contains('piece')) {
        to = target.square;
        to.replaceChild(this, target);
      } else {
        to = target;
        target.appendChild(this);
      }
      chess.move({from: from.id, to: to.id});
    }
    this.deSelect();
  }
}

