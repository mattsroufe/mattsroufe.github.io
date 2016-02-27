Moves = (function () {
  var highlight = function () {
    this.forEach(function (square) {
      square.classList.add('highlighted');
    });
  };
  var unHighlight = function () {
    this.forEach(function (square) {
      square.classList.remove('highlighted');
    });
  };

  return {
    new: function (squares) {
      return Object.assign(squares, {
        highlight: highlight,
        unHighlight: unHighlight
      });
    }
  }
})();
