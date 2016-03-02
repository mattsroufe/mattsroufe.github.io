'use strict'

var RANKS = '12345678';
var FILES = 'abcdefgh';

class Board extends HTMLElement {
  static get extends() { return 'table'; }

  static findRelativeRank(rank, int) {
    return RANKS[RANKS.indexOf(rank) + int];
  }

  static findRelativeFile(file, int) {
    return FILES[FILES.indexOf(file) + int];
  }

  // Fires when an instance of the element is created.
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
    this.addEventListener('mousedown', function (e) {
      if ( Piece.selected ) {
        Piece.selected.move(e.target || e.target.parentElement);
      } else {
        if ( e.target instanceof Piece ) e.target.select();
      }
    });
  };
  // Fires when an instance was inserted into the document.
  attachedCallback() {};
  // Fires when an instance was removed from the document.
  detachedCallback() {};
  // Fires when an attribute was added, removed, or updated.
  attributeChangedCallback(attr, oldVal, newVal) {};
}

document.registerElement('chess-board', Board);
