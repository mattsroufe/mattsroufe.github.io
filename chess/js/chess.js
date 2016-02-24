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
  forEach(document.querySelectorAll('.highlighted'), function (index, square) {
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
    if (e.target.tagName === "IMG") e.target.parentElement.select();
  }
}

function highlightPossilbeMoves(square) {
  forEach(square.piece().possibleMoves(), function (index, square) {
    square.classList.add('highlighted');
  });
};

var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

board.addEventListener('mousedown', mousedown);

forEach(document.querySelectorAll('[draggable]'), function (index, draggable) {
  draggable.addEventListener('dragstart', dragstart);
});

forEach(document.querySelectorAll('.square'), function (index, square) {
  Square.new(square);
});

forEach(document.querySelectorAll('.pawn'), function (index, pawn) {
  Object.assign(pawn, Piece, Pawn);
});
