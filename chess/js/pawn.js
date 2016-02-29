'use strict'

class Pawn extends Piece {

  nextRank(amount) {
    if (amount === undefined) amount = 1
    return this.rank() + ((this.color === BLACK) ? -amount : amount)
  }

  fileIndex() {
    return FILES.indexOf(this.file());
  }

  atStartPosition() {
    return (this.color === BLACK) ? this.rank() === 7 : this.rank() === 2
  }

  opponentColor() {
    return this.color === BLACK ? WHITE : BLACK
  }

  possibleMoves() {
    var moves = new Moves(this.square);
    var nextRank = window[[this.file(), this.nextRank()].join('')];
    var secondRank = window[[this.file(), this.nextRank(2)].join('')];
    if (nextRank.isEmpty) moves.push(nextRank);
    if (!!secondRank && secondRank.isEmpty && this.atStartPosition()) moves.push(secondRank);
    var previousFile = FILES[this.fileIndex() - 1];
    var nextFile = FILES[this.fileIndex() + 1];
    var leftAttackSquare = window[[previousFile, this.nextRank()].join('')]
    if (!!leftAttackSquare && leftAttackSquare.contains(this.opponentColor())) moves.push(leftAttackSquare);
    var rightAttackSquare = window[[nextFile, this.nextRank()].join('')]
    if (!!rightAttackSquare && rightAttackSquare.contains(this.opponentColor())) moves.push(rightAttackSquare);
    // TODO: fix case where pawn can still move two at start even if a piece is in the way
    // TODO: implement en passant
    return moves;
  }
}

document.registerElement('chess-pawn', Pawn);
