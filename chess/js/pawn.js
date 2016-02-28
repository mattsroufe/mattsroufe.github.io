document.registerElement('chess-pawn', {
  extends: 'div',
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        Object.assign(this, Piece);
        this.setAttribute("draggable", true);
        this.addEventListener('dragstart', function(e) {
          e.dataTransfer.setData("text/plain", e.target.parentNode.id);
        });
      }
    },
    possibleMoves: {
      value: function () {
        var moves = Moves.new([this.currentSquare()]);
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
  })
});
