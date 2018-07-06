document.addEventListener("DOMContentLoaded", init);

function init() {
  var animation = displayRandomNums(document.getElementById('sudoku-board'));

}

function displayRandomNums(element) {
  return window.setInterval(() => {
    var gridArray = new Array(81);
    var rIndex = parseInt(81 * Math.random());
    var rVal = parseInt(9 * Math.random()) + 1;
    gridArray[rIndex] = rVal;
    element.innerHTML = printGrid(gridArray);
  }, 100);
}

function printGrid(gridArray) {
  var line = "+-------+-------+-------+<br>";
  var text = line;
  for (var i = 0; i < 9; i++) {
    var text = text + "|&nbsp;";
    for (var j = 0; j < 9; j++) {
      var digit = gridArray[9 * i + j] || "&nbsp;";
      text = text + digit + "&nbsp;";
      if (j % 9 === 8) {
        text = text + "|";
      } else if (j % 3 === 2) {
        text = text + "|&nbsp;";
      }
    }
    text = text + "<br>";
    if (i % 3 === 2) {
      text = text + line;
    }
  }
  return text;
}
