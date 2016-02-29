'use strict'

class Board extends HTMLElement {
  static get extends() { return 'table'; }
  // Fires when an instance of the element is created.
  createdCallback() {
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
