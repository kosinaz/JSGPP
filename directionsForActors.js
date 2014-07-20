var Unit = function (name, x, y) {
  'use strict';
  var getX = function () {
      return x;
    },
    getY = function () {
      return y;
    },
    moveTo = function (newX, newY) {
      x = newX;
      y = newY;
    },
    toString = function () {
      return name + ' moved to ' + x + ',' + y;
    };
  return {
    getX: getX,
    getY: getY,
    moveTo: moveTo,
    toString: toString
  };
};
var game = (function () {
  'use strict';
  var LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    Y = 89,
    Z = 90,
    unit = new Unit('player', 10, 10),
    makeMoveUnitCommand = function (unit, x, y) {
      return function () {
        unit.moveTo(x, y);
      };
    },
    handleInput = function (e) {
      if (e.keyCode === LEFT) {
        return makeMoveUnitCommand(unit, unit.getX() - 1, unit.getY());
      } else if (e.keyCode === UP) {
        return makeMoveUnitCommand(unit, unit.getX(), unit.getY() - 1);
      } else if (e.keyCode === RIGHT) {
        return makeMoveUnitCommand(unit, unit.getX() + 1, unit.getY());
      } else if (e.keyCode === DOWN) {
        return makeMoveUnitCommand(unit, unit.getX(), unit.getY() + 1);
      }
      return null;
    },
    handleEvent = function (e) {
      var output = document.getElementById('output'),
        command = handleInput(e);
      if (command) {
        command();
        output.innerHTML = unit;
      }
    };
  window.addEventListener('keydown', handleEvent);
}());
