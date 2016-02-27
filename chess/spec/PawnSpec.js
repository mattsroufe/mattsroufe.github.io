describe ("Pawn", function(){

  describe("#possibleMoves", function() {
    it ("returns the pawn's possible moves", function () {
      var pawn = e2.piece();
      expect(pawn.possibleMoves()).toEqual(Moves.new([e2, e3, e4]));
    });
  });

  describe("#color", function() {
    it ("returns the pawn's color", function () {
      var pawn = e2.piece();
      expect(pawn.color()).toEqual(WHITE);
    });
  });

  describe("#select", function () {
    it ("adds the selected class", function () {
      var pawn = e2.piece();
      expect(pawn).not.toHaveClass('selected');
      pawn.select();
      expect(pawn).toHaveClass('selected');
    });
  });

  describe("#move", function () {
    it ("moves the pawn to the new square", function () {
      var pawn = e2.piece();
      pawn.move(e4);
      expect(pawn.currentSquare()).toEqual(e4);
    });
  });
});
