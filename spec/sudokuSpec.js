var sudoku = require('../app/sudoku');

function isValidSudokuArray(array) {
  for (var i = 0; i < 9; i++) {
    if (!checkRow(array, i)) {
      return false;
    }
    if (!checkCol(array, i)) {
      return false;
    }
    if (!checkBox(array, i)) {
      return false;
    }
  }
  return true;
}

function checkRow(array, i) {
  var row = [];
  for (var j = 0; j < 9; j++) {
    var n = array[9 * i + j];
    if (n >= 1 && n <= 9 && !row.includes(n)) {
      row.push(n);
    }
  }
  return row.length === 9;
}

function checkCol(array, i) {
  var col = [];
  for (var j = 0; j < 9; j++) {
    var n = array[9 * j + i];
    if (n >= 1 && n <= 9 && !col.includes(n)) {
      col.push(n);
    }
  }
  return col.length === 9;
}

function checkBox(array, i) {
  var box = [];
  for (var j = 0; j < 3; j++) {
    for (var k = 0; k < 3; k++) {
      var n = array[27 * parseInt(i / 3) + 3 * (i % 3) + 9 * j + k];
      if (n >= 1 && n <= 9 && !box.includes(n)) {
        box.push(n);
      }
    }
  }
  return box.length === 9;
}

describe("Sudoku Generator", function() {
  describe("get", function() {
    it("returns valid sudoku array", function() {
      var array = sudoku.get();
      expect(array.length).toBe(81);
      expect(isValidSudokuArray(array)).toBe(true);
    });
  });
});
