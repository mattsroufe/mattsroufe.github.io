describe ("Rook", function() {
  var rook, possibleMoves;

  beforeEach(function() {
    rook = h1.piece;
  });

  describe("#possibleMoves", function() {
    it ("returns the rook's possible moves", function () {
      possibleMoves = rook.possibleMoves();
      expect(possibleMoves).toEqual([]);

      h2.piece.move(h4);
      e7.piece.move(e5);

      possibleMoves = rook.possibleMoves();
      expect(possibleMoves.length).toEqual(2);
      // expect(possibleMoves).toContain(h2);
      // expect(possibleMoves).toContain(h3);

      // rook.move(h3);
      // expect(rook.possibleMoves().length).toEqual(9);

      // rook.move(g3);
      // expect(rook.possibleMoves().length).toEqual(11);

      // rook.move(g5);
      // e7.piece.move(e5);
      // expect(rook.possibleMoves().length).toEqual(7);
    });
  });
});
