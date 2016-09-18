"use strict";

var COLORS = ["green", "blue", "DarkKhaki", "red", "magenta", "MediumAquaMarine"]


function Block(x,y) {
  this.xPos = x;
  this.yPos = y;
  this.currentFormIndex = 0;
  this.body = [];
  this.move = function(direction) {
    this.xPos += direction;
  };
  this.nextFormIndex = function() {
    this.currentFormIndex += 1;
    if (this.currentFormIndex > this.forms.length - 1) {
      this.currentFormIndex = 0;      
    }
  };
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
}

var GRID_HEIGHT = 24;
var GRID_WIDTH = 10;

var LINE = [
  [[-2,0],
    [-1,0], 
    [0,0],
    [1,0]],

  [[0,0],
    [0,-1],
    [0,1],
    [0,2]] 
];

var I_SHAPE = [
  [[0,0],
    [0,1],
    [0,2],
    [0,-1]],

  [[0,0],
    [-1,0],
    [-2,0],
    [1,0]]
];

var CUBE = [
  [[0,0],
  [1,0],
  [1,-1],
  [0,-1]]
];

var RIGHT_HOOK = [
  [[-1,0],
    [0,0],
    [1,0],
    [1,-1]],

  [[-1,-1],
    [0,-1],
    [0,0],
    [0,1]],

  [[-1,1],
    [-1,0],
    [0,0],
    [1,0]],

  [[0,-1],
    [0,0],
    [0,1],
    [1,1]]
];

var LEFT_HOOK = [
  [[-1,-1],
    [-1,0],
    [0,0],
    [1,0]],

  [[-1,1],
    [0,-1],
    [0,0],
    [0,1]],

  [[1,1],
    [-1,0],
    [0,0],
    [1,0]],

  [[0,-1],
    [0,0],
    [0,1],
    [1,-1]]
];

var S_SHAPE = [
  [[-1,-1],
    [0,-1],
    [0,0],
    [1,0]],

  [[0,1],
    [0,0],
    [1,0],
    [1,-1]]
];

var T_SHAPE = [
  [[-1,0],
    [0,0],
    [0,-1],
    [1,0]],

  [[-1,0],
    [0,0],
    [0,1],
    [0,-1]],

  [[-1,0],
    [0,0],
    [1,0],
    [0,1]],

  [[0,0],
    [0,1],
    [0,-1],
    [1,0]]
];

var Z_SHAPE = [
  [[-1,0],
    [0,0],
    [0,-1],
    [1,-1]],

  [[0,-1],
    [0,0],
    [1,0],
    [1,1]]
]

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
      this.clearGridOfOldBlock(); 
      this.currentBlock.yPos -= 1; 
      this.setBlockBody(this.currentBlock);
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
    var lowestCells = this.lowestCellsInBlock(b); //returns an array
     // if there are objects in grid beneath any lowest [x,y] coord pair, return true
    for (var i = 0; i < lowestCells.length; i += 1) {
      var x = lowestCells[i][0], y = lowestCells[i][1];
      if (this.grid[x][y-1]) {
        return true 
      } 
    }
  },

  lowestCellsInBlock: function(block) {
    var bottomCells = [];

    for (var i = 0; i < block.body.length; i += 1) {
      var thisCell = block.body[i];
      var lowerThanXCells = 0;

      for (var j = 0; j < block.body.length; j += 1) {
        var otherCell = block.body[j];
        // if cells in the same column but this cell is lower, increment lowerThanXCells
        if (thisCell[0] === otherCell[0] && thisCell[1] < otherCell[1]) {
          lowerThanXCells += 1;
        // if x values differ, incrementLowerThanXCells
        } else if (thisCell[0] !== otherCell[0]) {
          lowerThanXCells += 1;
        }
      }
      // if lowerThanXCells equals block.body.length, it is lower than all other cells in that column
      if (lowerThanXCells === block.body.length - 1) {
        bottomCells.push(thisCell);
      }
    }
    
    return bottomCells;
  },

  hitBottom: function(block){
    var b = block || this.currentBlock;
    for (var i = 0; i < b.body.length; i += 1) {
      var thisCell = b.body[i];
      if (thisCell[1] === 0) {
        return true
      }
    }
    return false
  },

  clearGridOfOldBlock: function() {
    for (var i = 0; i < this.currentBlock.body.length; i++) {
      var blockCoords = this.currentBlock.body[i];
      this.grid[blockCoords[0]][blockCoords[1]] = null;
    }
  },

  replaceBlock: function(){
    this.currentBlock = this.createBlock();
  },

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
    this.setBlockBody(this.currentBlock);
    for(var j = 0; j < GRID_WIDTH; j++) {
      this.grid[j].splice(rowIndex,1);
      this.grid[j].push(null);
      //this.grid[j][rowIndex] = null;
      controller.userScore += 1;
    }
  },

  createBlock: function() {
    //start block at random X and first hidden row 
    var block = new Block(5, 20);
    block.forms = this.randomType();
    this.setBlockBody(block); 
    this.addToGrid(block);
    return block;
  },

  setBlockBody: function(block) {
    for(var cellIndex = 0; cellIndex < 4; cellIndex++) {
      var newBodyCoords = [];
      newBodyCoords[0] = block.forms[block.currentFormIndex][cellIndex][0] + block.xPos;
      newBodyCoords[1] = block.forms[block.currentFormIndex][cellIndex][1] + block.yPos;
      block.body[cellIndex] = newBodyCoords;
    }
  },

  addToGrid: function(block){
    // this.grid[block.xPos][block.yPos] = block;
    // iterate through the block's body, setting the grid space at each x&y location to the block
    for(var i = 0; i < block.body.length; i++) {
      this.grid[block.body[i][0]][block.body[i][1]] = block;
    }
  },

  placeBlock: function() {
    var b = this.currentBlock;
    while(this.currentBlock === b) {
      this.dropBlock();
    }
  },

  moveBlock: function(direction){
    if(this.blockMoveValid(direction)){
      this.wipeCurrentBlockFromGrid();
      this.currentBlock.move(direction);
      this.setBlockBody(this.currentBlock);
      this.addToGrid(this.currentBlock);
    }
  },

  wipeCurrentBlockFromGrid: function() {
    for(var i = 0; i < this.currentBlock.body.length; i++) {
      var bodyCell = this.currentBlock.body[i];
      this.grid[bodyCell[0]][bodyCell[1]] = null;
    }
  },

  blockMoveValid: function(direction){
    var leftX = this.leftmostX(this.currentBlock);
    var rightX = this.rightmostX(this.currentBlock);
    if (leftX === 0 && direction === -1){
      return false;
    } 
    else if (rightX === GRID_WIDTH-1 && direction === 1){
      return false;
    } 
    else if (direction === -1 && this.leftMoveUnhindered(this.currentBlock)) {
      return true;
    } 
    else if (direction === 1 && this.rightMoveUnhindered(this.currentBlock)) {
      return true;
    } 
  },

  leftMoveUnhindered: function (block) {
    // OVERVIEW: get each block cell where there is no cell to the left of it
    var leftmostCells = this.getLeftmostCells(block);
    for (var i = 0; i < leftmostCells.length; i += 1) {
      var thisCell = leftmostCells[i];
      // if there's something on the grid at the same y-value just to the left;
      if (this.grid[thisCell[0]-1][thisCell[1]]) {
        return false;
      }
    }
    return true;
  },

  getLeftmostCells: function (block) {
    var leftmostCells = [];

    for (var i = 0; i < block.body.length; i += 1) {
      var thisCell = block.body[i];
      var lefterThanXCells = 0;

      for (var j = 0; j < block.body.length; j += 1) {
        var otherCell = block.body[j];
        // if cells in the same row but this cell is further left, increment lefterThanXCells
        if (thisCell[1] === otherCell[1] && thisCell[0] < otherCell[0]) {
          lefterThanXCells += 1;
        // if x values differ, incrementlefterThanXCells
        } else if (thisCell[1] !== otherCell[1]) {
          lefterThanXCells += 1;
        }
      }
      // if lefterThanXCells equals block.body.length, it is further left than all other cells in that row
      if (lefterThanXCells === block.body.length - 1) {
        leftmostCells.push(thisCell);
      }
    }
    
    return leftmostCells;
  },

  rightMoveUnhindered: function (block) {
    // OVERVIEW: get each block cell where there is no cell to the left of it
    var rightmostCells = this.getRightmostCells(block);
    for (var i = 0; i < rightmostCells.length; i += 1) {
      var thisCell = rightmostCells[i];
      // if there's something on the grid at the same y-value just to the right;
      if (this.grid[thisCell[0]+1][thisCell[1]]) {
        return false;
      }
    }
    return true;
  },

  getRightmostCells: function (block) {
    var rightmostCells = [];

    for (var i = 0; i < block.body.length; i += 1) {
      var thisCell = block.body[i];
      var righterThanXCells = 0;

      for (var j = 0; j < block.body.length; j += 1) {
        var otherCell = block.body[j];
        // if cells in the same row but this cell is further right, increment righterThanXCells
        if (thisCell[1] === otherCell[1] && thisCell[0] > otherCell[0]) {
          righterThanXCells += 1;
        // if x values differ, incrementrighterThanXCells
        } else if (thisCell[1] !== otherCell[1]) {
          righterThanXCells += 1;
        }
      }
      // if righterThanXCells equals block.body.length, it is lower than all other cells in that column
      if (righterThanXCells === block.body.length - 1) {
        rightmostCells.push(thisCell);
      }
    }
    
    return rightmostCells;
  },

  leftmostX: function (block) {
    var out = 20;
    for (var i = 0; i < block.body.length; i += 1) {
      if (block.body[i][0] < out) {
        out = block.body[i][0];
      }
    };
    return out;
  },

  rightmostX: function (block) {
    var out = 0;
    for (var i = 0; i < block.body.length; i += 1) {
      if (block.body[i][0] > out) {
        out = block.body[i][0];
      }
    };
    return out;    
  },

  checkLine20: function() { 
    for(var i = 0; i < GRID_WIDTH; i++) {
      if (this.grid[i][20] && this.hitABlock(this.grid[i][20])) {
        return true;
      }
    }
    return false;
  },

  randomType: function() {
    var types = [Z_SHAPE, S_SHAPE, RIGHT_HOOK, LEFT_HOOK, T_SHAPE, CUBE, I_SHAPE];
    var typeIndex = Math.floor(Math.random() * types.length);
    console.log(types[typeIndex]);
    console.log(typeIndex);
    return types[typeIndex]
  },

  validRotation: function(block) {
    for (var i = 0; i < block.body.length; i++) {
      var thisCell = block.body[i];
      if (thisCell[0] < 0 || thisCell[0] >= GRID_WIDTH || thisCell[1] < 0)  {
        return false
      } else if (this.grid[thisCell[0]][thisCell[1]]) {
        return false
      }
    }
    return true 
  },

  nextValidRotation: function (b) {
    for (var i = 1; i < b.forms.length; i++) {
      do {
        b.nextFormIndex();
        this.setBlockBody(b);
      } while(!this.validRotation(b))
    }
  },

  rotateBlock: function() {
    this.clearGridOfOldBlock();
    this.nextValidRotation(this.currentBlock);
    this.addToGrid(this.currentBlock);
  }

};