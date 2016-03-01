describe ("Pawn", function(){
  var pawn;

  beforeEach(function() {
    pawn = e2.piece;
  });

  describe("#possibleMoves", function() {
    it ("returns the pawn's possible moves", function () {
      g1.piece.move(f3);
      expect(f2.piece.possibleMoves()).toEqual([]);
      expect(pawn.possibleMoves()).toEqual([e3, e4]);
      pawn.move(e6);
      expect(pawn.possibleMoves().length).toEqual(2);
      expect(pawn.possibleMoves()).toContain(d7);
      expect(pawn.possibleMoves()).toContain(f7);
    });
  });

  describe("#color", function() {
    it ("returns the pawn's color", function () {
      expect(pawn.color).toEqual(WHITE);
    });
  });

  describe("#select", function () {
    it ("adds the selected class", function () {
      expect(pawn.selected).toBe(null);
      pawn.select();
      expect(pawn.selected).toBe('true');
    });
  });

  describe("#move", function () {
    it ("moves the pawn to the new square", function () {
      pawn.move(e4);
      expect(pawn.square).toEqual(e4);
    });
  });
});
