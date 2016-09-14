"use strict";

var COLORS = ["green", "blue", "DarkKhaki", "red", "magenta", "MediumAquaMarine"]


function Block (x, y) {
  this.xPos = x;
  this.yPos = y;
  this.move = function(direction) {
    this.xPos += direction;
  }
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
}

var GRID_HEIGHT = 24;
var GRID_WIDTH = 10;

var model = {

  init: function() {
    this.createGrid();
  },
  grid: [],

  createGrid: function() {
    for(var i = 0; i < GRID_HEIGHT; i++) {
      var row = [];
      for(var j = 0; j < GRID_WIDTH; j++) {
        row[j] = null;
      }
      this.grid[i] = row;
    }
  },

  createBlock: function() {
    var block = new Block();
  }


};