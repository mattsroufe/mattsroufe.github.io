describe ("Bishop", function(){
  var bishop, possibleMoves;

  beforeEach(function() {
    bishop = f1.piece;
  });

  describe("#possibleMoves", function() {
    it ("returns the bishops's possible moves", function () {
      possibleMoves = bishop.possibleMoves();
      expect(possibleMoves).toEqual([]);

      e2.piece.move(e3);

      possibleMoves = bishop.possibleMoves();
      expect(possibleMoves.length).toEqual(5);
      expect(possibleMoves).toContain(e2);
      expect(possibleMoves).toContain(d3);
      expect(possibleMoves).toContain(c4);
      expect(possibleMoves).toContain(b5);
      expect(possibleMoves).toContain(a6);

      bishop.move(c4);

      expect(bishop.possibleMoves().length).toEqual(9);
    });
  });
});
