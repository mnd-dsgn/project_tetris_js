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
    //before moving, check if there is a block below the current block. if there is, replace the block
    if(this.hitABlock()){
      this.replaceBlock();
    }
    //if not, move the block
    else{
      this.grid[this.currentBlock.xPos][this.currentBlock.yPos] = null;
      this.currentBlock.yPos -= 1;
      this.addToGrid(this.currentBlock);
    }
    //after moving, check if the block has hit bottom. if so, replace the block
    if (this.hitBottom()){
      this.replaceBlock();
    }
    this.deleteFullRows();
  },

  hitABlock: function(block){
    var b = block || this.currentBlock;
    // return !!this.grid[b.xPos][b.yPos-1];
     if(!!this.grid[b.xPos][b.yPos-1]){
      //debugger;
      return true;
    }
    else{
      return false;
    }
  },

  hitBottom: function(block){
    var b = block || this.currentBlock;
    //return b.yPos === 0; 
    if(b.yPos === 0){
      //debugger;
      return true;
    }
    else{
      return false;
    }
  },

  replaceBlock: function(){
    this.currentBlock = this.createBlock();
  },

  // deleteFullRows: function() {
  //   for(var i = 0; i < GRID_HEIGHT; i++) {
  //     var fullRow = [];
  //     fullRow.fill(false, 0, 9);
  //     for(var j = 0; j < GRID_WIDTH; j++) {
  //       if (!this.grid[j][i]) {
  //         break;
  //       } else {
  //         fullRow[j] = true;
  //       }
  //       if (fullRow.every(function(element) {
  //         return element === true
  //       })) {
  //         this.deleteRow(i);
  //       }
  //     }
  //   }
  // },

  deleteFullRows: function() {
    for(var i = 0; i < GRID_HEIGHT; i++) {
      var blocks = 0;
      for(var j = 0; j < GRID_WIDTH; j++) {
        if (!this.grid[j][i]) {
           break;
        }  
        else{
          blocks ++;
        }
      }
      if(blocks === 10){
        this.deleteRow(i);
      }
    }
  },

  deleteRow: function(rowIndex) {
    //move the block to be in sync with the board
    this.currentBlock.yPos -= 1;
    for(var j = 0; j < GRID_WIDTH; j++) {
      this.grid[j].splice(rowIndex,1);
      this.grid[j].push(null);
      //this.grid[j][rowIndex] = null;
      controller.userScore += 1;
    }
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

  placeBlock: function() {
    var b = this.currentBlock;
    while(this.currentBlock === b) {
      this.dropBlock();
    }
  },

  moveBlock: function(direction){
    if(this.blockMoveValid(direction)){
      this.grid[this.currentBlock.xPos][this.currentBlock.yPos] = null;
      this.currentBlock.move(direction);
      this.addToGrid(this.currentBlock);
    }
  },

  blockMoveValid: function(direction){
    var x = this.currentBlock.xPos;
    if(x === 0 && direction === -1){
      return false;
    }
    else if(x === GRID_WIDTH-1 && direction === 1){
      return false;
    }
    else{
      return true;
    }
  },

  checkLine20: function() {
    for(var i = 0; i < GRID_WIDTH; i++) {
      if (this.grid[i][20] && this.hitABlock(this.grid[i][20])) {
        return true;
      }
    }
    return false;
  }


};