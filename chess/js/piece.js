var FILES = 'abcdefgh'.split('')
var BLACK = 'black';
var WHITE = 'white';
var selectedPiece;

Piece = {
  color: function () {
    return this.classList.contains(BLACK) ? BLACK : WHITE
  },
  currentSquare: function () {
    return this.parentNode;
  },
  rank: function () {
    return this.currentSquare().rank;
  },
  file: function () {
    return this.currentSquare().file;
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
  },
  move: function (target) {
    var possibleMoves = this.possibleMoves();
    if (target.classList.contains('piece')) {
      if (target !== this) target.currentSquare().replaceChild(this, target);
    } else {
      target.appendChild(this);
    }
    this.deSelect();
    possibleMoves.unHighlight();
  },
  select: function () {
    this.classList.add('selected');
    selectedPiece = this;
    this.possibleMoves().highlight();
  },
  deSelect: function () {
    this.classList.remove('selected');
    selectedPiece = null;
    return this;
  }
};
