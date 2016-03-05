'use strict'

class King extends Piece {

  possibleMoves() {
    let moves = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]].map((arr) => {
      return Square.find(Board.findRelativeFile(this.file, arr[0]) + Board.findRelativeRank(this.rank, arr[1]));
    }).filter((square) => {
      return square && (square.isEmpty() || square.contains(this.opponent))
    });
    return moves.concat(this.castlingMoves());
  }

  castlingMoves() {
    var moves = [];
    if ( !this.onStartingRank() ) return moves;
    var king_side = Square.find("g" + this.rank);
    if ( Square.find("f" + this.rank).isEmpty() && king_side.isEmpty() ) moves.push(king_side);
    return moves;
  }

  onStartingRank() {
    return (this.color === BLACK) ? this.rank === 8 : this.rank === 1
  }
}

document.registerElement('chess-king', King);
