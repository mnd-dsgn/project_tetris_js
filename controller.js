"use strict";


var controller = {
  
  init: function() {
    model.init();
    view.render(model.grid);
  }

};