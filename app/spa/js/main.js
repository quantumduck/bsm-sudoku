document.addEventListener("DOMContentLoaded", init);

function init() {
  reload();
  var reloadButton = document.getElementById("reloadButton");
  reloadButton.addEventListener("click", reload);
  var waitButton = document.getElementById("waitButton");
  waitButton.addEventListener("click", wait);
}

function reload() {
  var gridElement = document.getElementById("sudoku-board");
  var messageElement = document.getElementById("message-box");
  window.clearInterval(window.loadingAnimation);
  wait();
  getSudokuAsync().then(function(grid) {
    window.clearInterval(window.loadingAnimation);
    gridElement.innerHTML = printGrid(grid);
    messageElement.innerHTML = "Done :)";
  });
}

function wait() {
  var gridElement = document.getElementById("sudoku-board");
  var messageElement = document.getElementById("message-box");
  messageElement.innerHTML = "Please wait...";
  window.loadingAnimation = displayRandomNums(gridElement);
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

function getSudokuAsync() {
  return new Promise((resolve) => {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    }
    req.open("GET", window.location + "sudoku/board", true);
    req.send(null);
  });
}
