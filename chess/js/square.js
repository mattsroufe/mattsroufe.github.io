var selectedSquare;

Square = {
  new: function (el) {
    el.addEventListener('dragover', dragover);
    el.addEventListener('drop', drop);
    this.rank = parseInt(el.id.charAt(1));
    this.file = el.id.charAt(0);
    return Object.assign(el, this);
  },
  piece: function () {
    return this.firstChild;
  },
  isEmpty: function () {
    return !this.hasChildNodes();
  },
  contains: function (color) {
    return this.isEmpty() ? false : this.piece().color() === color;
  },
  select: function () {
    this.classList.add('selected');
    selectedSquare = this;
    highlightPossilbeMoves(this);
  },
  deSelect: function () {
    this.classList.remove('selected');
    selectedSquare = null;
  }
};
