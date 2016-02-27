Pawn = {
  possibleMoves: function () {
    var moves = Moves.new([this.currentSquare()]);
    var nextRank = window[[this.file(), this.nextRank()].join('')];
    var secondRank = window[[this.file(), this.nextRank(2)].join('')];
    if (nextRank.isEmpty()) moves.push(nextRank);
    if (!!secondRank && secondRank.isEmpty() && this.atStartPosition()) moves.push(secondRank);

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
};
