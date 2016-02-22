Square = {
  piece: function () {
    return this.firstChild;
  },
  rank: function () {
    return parseInt(this.id.charAt(1));
  },
  file: function () {
    return this.id.charAt(0);
  },
  isEmpty: function () {
    return !this.hasChildNodes();
  },
  contains: function (color) {
    return this.querySelector('[data-color="' + color + '"]') !== null;
  },
  select: function () {
    this.classList.add('selected');
    highlightPossilbeMoves(this);
  }
};
