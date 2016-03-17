describe ("Knight", function() {
  var knight, possibleMoves;

  beforeEach(function() {
    knight = g1.piece;
  });

  describe("#possibleMoves", function() {
    it ("returns the knight's possible moves", function () {
      possibleMoves = knight.possibleMoves();
      expect(possibleMoves.length).toEqual(2);
      // expect(possibleMoves).toContain(f3);
      // expect(possibleMoves).toContain(h3);

      // knight.move(f3);

      // possibleMoves = knight.possibleMoves();
      // expect(possibleMoves.length).toEqual(5);
      // expect(possibleMoves).toContain(d4);
      // expect(possibleMoves).toContain(e5);
      // expect(possibleMoves).toContain(g5);
      // expect(possibleMoves).toContain(h4);
      // expect(possibleMoves).toContain(g1);
    });
  });
});
