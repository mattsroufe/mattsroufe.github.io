'use strict'

class Knight extends Piece {

  possibleMoves() {
    return [[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1]].map((arr) => {
      return Square.find(Board.findRelativeFile(this.file, arr[0]) + Board.findRelativeRank(this.rank, arr[1]));
    }).filter((square) => {
      return square && (square.isEmpty() || square.contains(this.opponent))
    });
  }
}

document.registerElement('chess-knight', Knight);
