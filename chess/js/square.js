Square = (function () {
  return {
    new: function (el) {
      el.addEventListener('dragover', dragover);
      el.addEventListener('drop', drop);
      el.contains = function (color) {
        return this.isEmpty ? false : this.piece.color() === color;
      };

      Object.defineProperties(el, {
        "rank": {
          get: function () {
            return parseInt(this.id.charAt(1));
          }
        },
        "file": {
          get: function () {
            return this.id.charAt(0);
          }
        },
        "piece": {
          get: function () {
            return this.firstChild;
          }
        },
        "isEmpty": {
          get: function () {
            return !this.hasChildNodes();
          }
        }
      });
      return el;
    }
  }
})();
