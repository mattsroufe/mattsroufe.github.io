'use strict'

class Pawn extends Piece {

  forward(int) {
    return this.rank + ((this.color === BLACK) ? -int : int)
  }

  onStartingRank() {
    return (this.color === BLACK) ? this.rank === 7 : this.rank === 2
  }

  possibleMoves() {
    var moves     = [],
        next_rank = this.forward(1),
        forward_1 = window[this.file + next_rank],
        forward_2;

    if ( forward_1 && forward_1.isEmpty() ) {
      moves.push(forward_1);
      forward_2 = window[this.file + this.forward(2)];
      if ( forward_2 && forward_2.isEmpty() && this.onStartingRank() ) moves.push(forward_2);
    }

    [-1,1].forEach((i) => {
      var square = window[Board.findRelativeFile(this.file, i) + next_rank];
      if ( square && square.contains(this.opponent) ) moves.push(square);
    });
    // TODO: implement en passant
    return moves;
  }
}

document.registerElement('chess-pawn', Pawn);
