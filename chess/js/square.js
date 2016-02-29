'use strict';

class Square extends HTMLElement {
  static get extends() { return 'td'; }

  createdCallback() {
    function dragover(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    function drop(e) {
      e.preventDefault();
      var last_position = e.dataTransfer.getData("text");
      var new_position  = (e.target.id.length > 0) ? e.target.id : e.target.parentNode.id;
      console.log(last_position, new_position);
    };

    this.addEventListener('dragover', dragover);
    this.addEventListener('drop', drop);
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
