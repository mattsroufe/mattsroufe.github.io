function dragstart(e) {
  e.dataTransfer.setData("text/plain", e.target.parentNode.id);
};

function dragover(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

function drop(e) {
  e.preventDefault();
  var last_position = e.dataTransfer.getData("text");
  var new_position  = (e.target.id.length > 0) ? e.target.id : e.target.parentNode.id;
  move(last_position, new_position);
};

function mousedown(e) {
  if ( selectedPiece ) {
    selectedPiece.move(e.target || e.target.parentElement);
  } else {
    if ( e.target.classList.contains('piece') ) e.target.select();
  }
}

board.addEventListener('mousedown', mousedown);

Array.from(board.querySelectorAll('.square'), (el) => {
  // var child = el.firstChild;

  // new Square(el):
  // if (child) new Piece(child);
  var square = Square.new(el);
  var piece = square.piece;

  if (piece) {
    piece.setAttribute("draggable", true);
    piece.addEventListener('dragstart', dragstart);
    Object.assign(piece, Piece, Pawn);
  }
});
