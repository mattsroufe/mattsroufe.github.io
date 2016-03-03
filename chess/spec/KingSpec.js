describe ("King", function(){
  var king, possibleMoves;

  beforeEach(function() {
    king = e1.piece;
  });

  describe("#possibleMoves", function() {
    it ("returns the king's possible moves", function () {
      possibleMoves = king.possibleMoves();
      expect(possibleMoves.length).toEqual(0);

      e2.piece.move(e4);
      expect(king.possibleMoves()).toEqual([e2]);
    });
  });
});
