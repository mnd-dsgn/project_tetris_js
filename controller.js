"use strict";


var controller = {
  
  init: function() {
    model.init();
    view.render(model.grid);
    var gameLoop = setInterval(this.playGame, 40);
  },

  counter: 0,

  playGame: function(){
    controller.counter ++;
    if(controller.counter%25 === 0){
      model.dropBlock();
    }
    view.render(model.grid);
  }

};