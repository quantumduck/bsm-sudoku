var express = require('express');
var sudoku = require('./sudoku');
var app = express();
var fs = require("fs");

app.get('/sudoku/board', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(sudoku.get()));
});

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Sudoku API listening at http://%s:%s", host, port)

});
