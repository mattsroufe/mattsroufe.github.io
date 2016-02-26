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

function move(last_position, new_position) {
  if (last_position !== new_position) {
    var piece = window[last_position].piece();
    var targetPosition = window[new_position];

    if ( !targetPosition.isEmpty() ) {
      targetPosition.replaceChild(piece, targetPosition.piece())
    } else {
      targetPosition.appendChild(piece);
    }
  }
  selectedSquare.deSelect();
  Array.from(document.querySelectorAll('.highlighted'), (square) => {
    square.classList.remove('highlighted');
  });
};

function mousedown(e) {
  // var target = e.target;
  if ( selectedSquare ) {
    // if ( selectedPiece.possibleMoves().includes(target) )
    // selectedPiece.moveTo(e.target.id || e.target.parentElement.id);
    move(selectedSquare.id, e.target.id || e.target.parentElement.id);
  } else {
    if (e.target.tagName === "DIV") e.target.parentElement.select();
  }
}

function highlightPossilbeMoves(square) {
  Array.from(square.piece().possibleMoves(), (square) => {
    square.classList.add('highlighted')
  });
};

board.addEventListener('mousedown', mousedown);

Array.from(board.querySelectorAll('.piece'), (piece) => {
  piece.setAttribute("draggable", true);
  piece.addEventListener('dragstart', dragstart);
});

Array.from(board.querySelectorAll('.square'), (el) => Square.new(el));

Array.from(board.querySelectorAll('.pawn'), (pawn) => {
  Object.assign(pawn, Piece, Pawn);
});
