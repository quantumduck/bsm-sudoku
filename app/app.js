var express = require('express');
var path = require('path');
var sudoku = require('./sudoku');

var app = express();
var fs = require("fs");
var spaRoot = path.join(__dirname, 'spa');

function parseQuery(q) {

}

app.get('/query', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(req.query));
});

app.get('/sudoku/board', function (req, res) {
  var result = sudoku.get(req.query);
  if (result.error) {
    res.status(400);
    res.send(result.error);
  } else {
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(result.grid));
  }
});

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: spaRoot});
});

app.get('/js/main.js', function (req, res) {
  res.sendFile('js/main.js', {root: spaRoot});
});

app.get('/css/style.css', function (req, res) {
  res.sendFile('css/style.css', {root: spaRoot});
});

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Sudoku API listening at http://%s:%s", host, port)

});
