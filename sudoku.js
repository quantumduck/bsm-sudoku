exports.get = function() {
  var i = 0;
  var iter = 0;
  var grid = getEmptyGrid();
  while (i < 81) {
    iter += 1;
    if (grid[i].choices.length === 0) {
      grid[i] = getEmptySquare();
      i -= 1;
      removeCurrentChoice(grid, i);
    } else {
      grid[i].value = getRandChoice(grid, i);
      if (isValid(grid, i)) {
        i += 1;
      } else {
        removeCurrentChoice(grid, i)
      }
    }
  }
  console.log(`iterations: ${iter}`);
  return grid.map((c) => c.value);
}

function getRandChoice(grid, index) {
  var choices = grid[index].choices;
  return choices[parseInt(choices.length * Math.random())];
}

function removeCurrentChoice(grid, index) {
  var choice = grid[index].value;
  grid[index].choices = grid[index].choices.filter((e) => e !== choice);
}

function getEmptyGrid() {
  var grid = [];
  for (var i = 0; i < 81; i++) {
    grid.push(getEmptySquare());
  }
  return grid;
}

function getEmptySquare() {
  return {value: 0, choices: [1,2,3,4,5,6,7,8,9]};
}

function getRowIndex(i) {
  return parseInt(i / 9);
}

function getColIndex(i) {
  return i % 9;
}

function getBoxIndex(i) {
  return 3 * parseInt(i / 27) + parseInt((i % 9) / 3);
}

function isValid(grid, index) {
  var ri = getRowIndex(index);
  var ci = getColIndex(index);
  var bi = getBoxIndex(index);
  for (var i = 0; i < index; i++) {
    if (grid[i].value === grid[index].value) {
      if (getRowIndex(i) === getRowIndex(index)) {
        return false;
      } else if (getColIndex(i) === getColIndex(index)) {
        return false;
      } else if (getBoxIndex(i) === getBoxIndex(index)) {
        return false;
      }
    }
  }
  return true;
}

function printGrid(gridArray) {
  var line = "+-------+-------+-------+\n";
  var text = line;
  for (var i = 0; i < 9; i++) {
    var text = text + "| ";
    for (var j = 0; j < 9; j++) {
      text = text + gridArray[9 * i + j] + " ";
      if (j % 3 === 2) {
        text = text + "| ";
      }
    }
    text = text + "\n";
    if (i % 3 === 2) {
      text = text + line;
    }
  }
  console.log(text);
}
