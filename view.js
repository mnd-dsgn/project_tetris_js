"use strict";

var view = {

  render: function(grid) {
    $("#grid").empty();
    for(var i = grid[0].length-5; i >= 0; i--) {
      var $column = $("<div></div>");
      $column.addClass("column");
      for(var j = 0; j < grid.length; j++) {
        var $cell = $("<div></div>");
        $cell.addClass("cell");
        if (grid[j][i]) {
          $cell.addClass("block");
          $cell.css("background-color", grid[j][i].color);
        }
        $cell.appendTo($column);
      }
      $column.appendTo($("#grid"))
    }
  }

};
