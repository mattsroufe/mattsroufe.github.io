var draggables = document.querySelectorAll('[draggable]');
var droppables = document.querySelectorAll('.droppable');

var FILES = 'abcdefgh'.split('')

var BLACK = 'black';
var WHITE = 'white';

game = {
  moves: []
};

Square = {
  piece: function () {
    return this.childNodes[0];
  },
  rank: function () {
    return parseInt(this.id.charAt(1));
  },
  file: function () {
    return this.id.charAt(0);
  },
  isEmpty: function () {
    return !this.piece();
  },
  contains: function (color) {
    return this.querySelector('[data-color="' + color + '"]') !== null;
  }
};

Piece = {
  color: function () {
    return this.dataset.color;
  },
  currentSquare: function () {
    return this.parentNode;
  },
  rank: function () {
    return this.currentSquare().rank();
  },
  file: function () {
    return this.currentSquare().file();
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
    var piece = document.getElementById(last_position).childNodes[0];
    var targetPosition = document.getElementById(new_position);

    if (targetPosition.childElementCount > 0) {
      targetPosition.removeChild(targetPosition.childNodes[0])
    }

    targetPosition.appendChild(piece);
  }
  deSelect(selected());
  forEach(document.querySelectorAll('.highlighted'), function (index, square) {
    square.classList.remove('highlighted');
  });
};

function select(square) {
  square.classList.add('selected');
  highlightPossilbeMoves(square);
}

function selected() {
  return document.querySelector('.selected');
};

function deSelect(square) {
  if (square !== null) {
    square.classList.remove('selected');
  }
};

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

forEach(draggables, function (index, draggable) {
  draggable.addEventListener('dragstart', dragstart, false);
});

forEach(droppables, function (index, droppable) {
  Object.assign(droppable, Square);
  droppable.addEventListener('dragover', dragover, false);
  droppable.addEventListener('drop', drop, false);
  droppable.addEventListener('mousedown', function () {
    if (selected() === null && !this.isEmpty()) {
      select(this);
    } else if (selected() !== null) {
      move(selected().id, this.id);
    }
  }, false);
});

forEach(document.querySelectorAll('.pawn'), function (index, pawn) {
  Object.assign(pawn, Piece, Pawn);
});
