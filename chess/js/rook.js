'use strict'

class Rook extends Piece {

  possibleMoves() {
    var moves = [];
    var directions = [-1, 1];
    directions.forEach((direction) => {
      var next = direction;
      var square = Square.find(this.file + Board.findRelativeRank(this.rank, direction));
      while ( square && square.isEmpty() ) {
        moves.push(square);
        direction += next;
        square = Square.find(this.file + Board.findRelativeRank(this.rank, direction));
      }
      if ( square && square.contains(this.opponent) ) moves.push(square);
      direction = next;
      var square = Square.find(Board.findRelativeFile(this.file, direction) + this.rank);
      while ( square && square.isEmpty() ) {
        moves.push(square);
        direction += next;
        square = Square.find(Board.findRelativeFile(this.file, direction) + this.rank);
      }
      if ( square && square.contains(this.opponent) ) moves.push(square);
    });
    return moves;
  }
}

document.registerElement('chess-rook', Rook);
