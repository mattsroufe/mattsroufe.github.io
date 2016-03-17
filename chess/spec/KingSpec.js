describe ("King", function() {
  var king, possibleMoves;

  beforeEach(function() {
    king = e1.piece;
  });

  describe("#possibleMoves", function() {
    it ("returns the king's possible moves", function () {
      possibleMoves = king.possibleMoves();
      expect(possibleMoves.length).toEqual(0);

      e2.piece.move(e4);
      e7.piece.move(e5);
      expect(king.possibleMoves()).toEqual([e2]);

      // f1.piece.move(c4);
      // g1.piece.move(f3);
      // possibleMoves = king.possibleMoves();
      // expect(possibleMoves.length).toEqual(3);
      // expect(possibleMoves).toContain(e2);
      // expect(possibleMoves).toContain(f1);
      // expect(possibleMoves).toContain(g1);

      // king.move(g1);
      // expect(f1.piece instanceof Rook).toBe(true);
    });
  });
});
