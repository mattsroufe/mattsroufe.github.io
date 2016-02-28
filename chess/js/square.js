document.registerElement('chess-square', {
  extends: 'td',
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        function dragover(e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        };

        function drop(e) {
          e.preventDefault();
          var last_position = e.dataTransfer.getData("text");
          var new_position  = (e.target.id.length > 0) ? e.target.id : e.target.parentNode.id;
          console.log(last_position, new_position);
        };

        this.addEventListener('dragover', dragover);
        this.addEventListener('drop', drop);
      }
    },
    contains: {
      value: function (color) {
        return this.isEmpty ? false : this.piece.color() === color;
      }
    },
    rank: {
      get: function () {
        return parseInt(this.id.charAt(1));
      }
    },
    file: {
      get: function () {
        return this.id.charAt(0);
      }
    },
    piece: {
      get: function () {
        return this.firstChild;
      }
    },
    isEmpty: {
      get: function () {
        return !this.hasChildNodes();
      }
    }
  })
});
