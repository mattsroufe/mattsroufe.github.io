describe ("Board", function(){

  describe("#findRelativeRank", function() {
    it ("returns the rank relative to another", function () {
      expect(Board.findRelativeRank("1", 1)).toEqual("2");
      expect(Board.findRelativeRank("3", 3)).toEqual("6");
      expect(Board.findRelativeRank("7", 3)).toBeUndefined();
      expect(Board.findRelativeRank("7", -3)).toEqual("4");
    });
  });

  describe("#findRelativeFile", function() {
    it ("returns the file relative to another", function () {
      expect(Board.findRelativeFile("a", 1)).toEqual("b");
      expect(Board.findRelativeFile("c", 3)).toEqual("f");
      expect(Board.findRelativeFile("g", 3)).toBeUndefined();
      expect(Board.findRelativeFile("g", -3)).toEqual("d");
    });
  });
});
