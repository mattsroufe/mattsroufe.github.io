'use strict';

class Square extends HTMLElement {
  static get extends() { return 'td'; }

  static highlight(squares) {
    (this._highlighted = squares).forEach((square) => {
      square.classList.add('highlighted');
    });
  }

  static removeHighlighting() {
    (this._highlighted || []).forEach((square) => {
      square.classList.remove('highlighted');
    });
  }

  createdCallback() {

    this.rank = parseInt(this.id.charAt(1));
    this.file = this.id.charAt(0);
  }

  isEmpty() {
    return !this.hasChildNodes();
  }

  contains(color) {
    return this.isEmpty() ? false : this.piece.color === color;
  }

  get piece() {
    return this.firstChild;
  }
}

document.registerElement('chess-square', Square);
