describe ("Pawn", function(){

  describe("#possibleMoves", function() {
    it ("returns the pawn's possible moves", function () {
      var pawn = e2.piece();
      expect(pawn.possibleMoves()).toEqual([e3, e4]);
    });
  });

  // it ("highlights the selected square on mousedown", function () {
  //   $('#e2').trigger('mousedown');
  //   expect($("#e2")).toHaveClass('selected');
  // });
});