describe ("Square", function() {

  describe(".find", function() {
    it ("it finds the square at the id", function () {
      expect(Square.find('e2')).toEqual(e2);
      expect(Square.find('e10')).toBeUndefined();
    });
  });

  describe("#piece", function() {
    it ("returns the piece on the square", function () {
      expect(e2.piece instanceof Pawn).toBe(true);
      expect(e3.piece).toBeNull();
    });
  });

  describe("#rank", function() {
    it ("returns the square's rank", function () {
      expect(e2.rank).toEqual(2);
    });
  });

  describe("#file", function() {
    it ("returns the square's file", function () {
      expect(e2.file).toEqual("e");
    });
  });

  describe("#isEmpty", function() {
    describe("when the square contains a piece", function() {
      it ("returns false", function () {
        expect(e2.isEmpty()).toBe(false);
      });
    });

    describe("when the square does not contain a piece", function() {
      it ("returns true", function () {
        expect(e3.isEmpty()).toBe(true);
      });
    });
  });
});
