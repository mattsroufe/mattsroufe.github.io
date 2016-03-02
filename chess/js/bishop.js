'use strict'

class Bishop extends Piece {

  possibleMoves() {
    var moves = [];
    var directions = [[-1,1],[1,1],[1,-1],[-1,-1]];
    directions.forEach((direction) => {
      var next_file = direction[0];
      var next_rank = direction[1];
      var square = Square.find(Board.findRelativeFile(this.file, direction[0]) + Board.findRelativeRank(this.rank, direction[1]));
      while ( square && square.isEmpty() ) {
        moves.push(square);
        direction[0] = direction[0] + next_file;
        direction[1] = direction[1] + next_rank;
        square = Square.find(Board.findRelativeFile(this.file, direction[0]) + Board.findRelativeRank(this.rank, direction[1]));
      }
      if ( square && square.contains(this.opponent) ) moves.push(square);
    });
    return moves;
  }
}

document.registerElement('chess-bishop', Bishop);
