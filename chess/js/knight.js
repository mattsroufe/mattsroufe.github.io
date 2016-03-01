'use strict'

class Knight extends Piece {

  possibleMoves() {
    return [[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1]].map((arr) => {
      return [Board.findRelativeFile(this.file, arr[0]), Board.findRelativeRank(this.rank, arr[1])];
    }).filter((arr) => {
      return arr.indexOf(undefined) < 0
    }).map((arr) => {
      return window[arr.join('')];
    }).filter((square) => {
      return square.isEmpty() || (square.piece.color && square.piece.color !== this.color)
    });
  }
}

document.registerElement('chess-knight', Knight);
