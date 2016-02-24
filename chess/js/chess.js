var FILES = 'abcdefgh'.split('')
var BLACK = 'black';
var WHITE = 'white';

Piece = {
  color: function () {
    return this.dataset.color;
  },
  currentSquare: function () {
    return this.parentNode;
  },
  rank: function () {
    return this.currentSquare().rank;
  },
  file: function () {
    return this.currentSquare().file;
  }
};

Pawn = {
  possibleMoves: function () {
    var moves = [];
    var nextRank = window[[this.file(), this.nextRank()].join('')];
    var secondRank = window[[this.file(), this.nextRank(2)].join('')];
    if (nextRank.isEmpty()) moves.push(nextRank);
    if (!!secondRank && secondRank.isEmpty() && this.atStartPosition()) moves.push(secondRank);

    var previousFile = FILES[this.fileIndex() - 1];
    var nextFile = FILES[this.fileIndex() + 1];

    var leftAttackSquare = window[[previousFile, this.nextRank()].join('')]
    if (!!leftAttackSquare && leftAttackSquare.contains(this.opponentColor())) moves.push(leftAttackSquare);
    var rightAttackSquare = window[[nextFile, this.nextRank()].join('')]
    if (!!rightAttackSquare && rightAttackSquare.contains(this.opponentColor())) moves.push(rightAttackSquare);
    // TODO: fix case where pawn can still move two at start even if a piece is in the way
    // TODO: implement en passant
    return moves;
  },
  nextRank: function (amount) {
    if (amount === undefined) amount = 1
    return this.rank() + ((this.color() === BLACK) ? -amount : amount)
  },
  fileIndex: function () {
    return FILES.indexOf(this.file());
  },
  atStartPosition: function () {
    return (this.color() === BLACK) ? this.rank() === 7 : this.rank() === 2
  },
  opponentColor: function () {
    return this.color() === BLACK ? WHITE : BLACK
  }
};

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
    var piece = document.getElementById(last_position).firstChild;
    var targetPosition = document.getElementById(new_position);

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
  if ( selectedSquare ) {
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
