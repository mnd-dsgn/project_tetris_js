"use strict";

var view = {

  render: function(grid) {
    for(var i = 0; i < grid.length - 4; i++) {
      var $row = $("<div></div>");
      $row.addClass("row");
      for(var j = 0; j < grid[i].length; j++) {
        var $cell = $("<div></div>");
        $cell.addClass("cell");
        if (grid[i][j]) {
          $cell.addClass("block");
          $cell.css("background-color", grid[i][j].color);
        }
        $cell.appendTo($row);
      }
      $row.appendTo($("#grid"))
    }
  }

};
