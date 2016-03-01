'use strict'

class Pawn extends Piece {

  forward(int) {
    return this.rank + ((this.color === BLACK) ? -int : int)
  }

  onStartingRank() {
    return (this.color === BLACK) ? this.rank === 7 : this.rank === 2
  }

  opponentColor() {
    return this.color === BLACK ? WHITE : BLACK
  }

  possibleMoves() {
    var moves = [];
    var nextRank = window[this.file + this.forward(1)];
    if ( nextRank && nextRank.isEmpty() ) moves.push(nextRank);
    var secondRank = window[this.file + this.forward(2)];
    if (moves.length > 0 && secondRank && secondRank.isEmpty() && this.onStartingRank()) moves.push(secondRank);
    var previousFile = Board.findRelativeFile(this.file, -1);
    var nextFile = Board.findRelativeFile(this.file, 1);
    var left = window[[previousFile, this.forward(1)].join('')]
    if (left && left.contains(this.opponentColor())) moves.push(left);
    var right = window[[nextFile, this.forward(1)].join('')]
    if (right && right.contains(this.opponentColor())) moves.push(right);
    // TODO: implement en passant
    return moves;
  }
}

document.registerElement('chess-pawn', Pawn);
