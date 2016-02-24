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
