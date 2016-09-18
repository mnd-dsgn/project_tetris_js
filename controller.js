
var controller = {

  userScore: 0,
  
  init: function() {
    model.init();
    view.init();
    view.render(model.grid);
    gameLoop = setInterval(this.playGame, 20);
  },

  counter: 0,

  playGame: function(){
    controller.counter ++;
    if(controller.counter % 25 === 0){
      model.dropBlock();
    }
    view.render(model.grid);
    if (controller.gameOver()) {
      alert("Game over.");
      clearInterval(gameLoop);
    }
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
      // spacebar 
      case 32:
        model.rotateBlock();
    }
  },

  gameOver: function() {
    return model.checkLine20();
  }

};