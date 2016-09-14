"use strict";


var controller = {
  
  init: function() {
    model.init();
    view.init();
    view.render(model.grid);
    var gameLoop = setInterval(this.playGame, 40);
  },

  counter: 0,

  playGame: function(){
    controller.counter ++;
    if(controller.counter % 25 === 0){
      model.dropBlock();
    }
    view.render(model.grid);
  },

  handleKeyPress: function(key){
    switch(key) {
      //down
      case 40:
        model.placeBlock();
        break;
      //left
      case 37:
        model.moveBlock(-1);
        break;
      //right
      case 39:
        model.moveBlock(1);
        break;
    }
  }

};