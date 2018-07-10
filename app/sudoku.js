exports.get = function(frozenVals) {
  console.log(frozenVals);
  var i = 0;
  var iter = 0;
  var grid = getEmptyGrid(frozenVals);
  var useFullGrid = frozenVals && Object.keys(frozenVals).length > 0
    ? true : false;
  if (!isValidInitialGrid(grid)) {
    return {error: "Impossible configuration"};
  }
  while (i < 81) {
    iter += 1;
    if (grid[i].choices.length === 0) {
      // console.log(i, "no choices");
      grid[i] = getEmptySquare();
      i -= 1;
      while (grid[i] && grid[i].frozen) {
        i -= 1;
      }
      if (i < 0) {
        return {error: "No solution."};
      }
      removeCurrentChoice(grid, i);
    } else {
      grid[i].value = getRandChoice(grid, i);
      // console.log(i, "random choice", grid[i].value);
      if (isValid(grid, i, useFullGrid)) {
        // console.log(i, "isValid");
        i += 1;
        while (grid[i] && grid[i].frozen) {
          i += 1;
        }
      } else {
        // console.log(i, "remove choice", grid[i].value);
        removeCurrentChoice(grid, i)
      }
    }
  }
  console.log(`iterations: ${iter}`);
  return {grid: grid.map((c) => c.value)};
}

function getRandChoice(grid, index) {
  var choices = grid[index].choices;
  return choices[parseInt(choices.length * Math.random())];
}

function removeCurrentChoice(grid, index) {
  var choice = grid[index].value;
  grid[index].choices = grid[index].choices.filter((e) => e !== choice);
}

function getEmptyGrid(frozenVals) {
  var grid = [];
  for (var i = 0; i < 81; i++) {
    var frozenVal = getFrozenVal(frozenVals, i);
    if (frozenVal) {
      grid.push({
        value: frozenVal,
        choices: [frozenVal],
        frozen: true
      });
    } else {
      grid.push(getEmptySquare());
    }
  }
  return grid;
}

function getFrozenVal(frozenVals, index) {
  if (frozenVals && frozenVals["c" + index]) {
    var v = parseInt(frozenVals["c" + index]);
    if (v >= 1 && v <= 9) {
      return v
    }
  }
  return 0;
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

function isValid(grid, index, useFullGrid) {
  var ri = getRowIndex(index);
  var ci = getColIndex(index);
  var bi = getBoxIndex(index);
  var stopIndex = useFullGrid ? 81 : index;
  for (var i = 0; i < stopIndex; i++) {
    if (i !== index && grid[i].value === grid[index].value) {
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

function isValidInitialGrid(grid) {
  for (var i = 0; i < 81; i++) {
    if (grid[i].value && !isValid(grid, i, true)) {
      return false
    }
  }
  return true;
}
