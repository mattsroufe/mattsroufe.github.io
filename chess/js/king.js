'use strict'

class King extends Piece {

  possibleMoves() {
    return [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]].map((arr) => {
      return Square.find(Board.findRelativeFile(this.file, arr[0]) + Board.findRelativeRank(this.rank, arr[1]));
    }).filter((square) => {
      return square && (square.isEmpty() || square.contains(this.opponent))
    });
  }
}

document.registerElement('chess-king', King);
