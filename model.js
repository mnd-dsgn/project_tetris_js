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
    this.currentBlock = this.createBlock();
  },
  grid: [],

  createGrid: function() {
    for(var i = 0; i < GRID_WIDTH; i++) {
      var column = [];
      for(var j = 0; j < GRID_HEIGHT; j++) {
        column[j] = null;
      }
      this.grid[i] = column;
    }
  },

  dropBlock: function(){
    this.grid[this.currentBlock.xPos][this.currentBlock.yPos] = null;
    this.currentBlock.yPos -= 1;
    this.addToGrid(this.currentBlock);
    this.checkForDeath();
  },

  checkForDeath: function(){
    //if currentblock has hit the bottom or another dead block, make it a dead block and create a new block
  },

  createBlock: function() {
    //start block at random X and first hidden row 
    var block = new Block(this.randomX(), 20);
     this.addToGrid(block);
    return block;
  },

  addToGrid: function(block){
    this.grid[block.xPos][block.yPos] = block;
  },

  randomX: function(){
    return Math.floor(Math.random()*GRID_WIDTH);
  },


};