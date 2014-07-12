/*global console*/
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
    commands = [],
    i = -1,
    makeMoveUnitCommand = function (unit, x, y) {
      var xBefore, yBefore;
      return {
        execute: function () {
          xBefore = unit.getX();
          yBefore = unit.getY();
          unit.moveTo(x, y);
        },
        undo: function () {
          unit.moveTo(xBefore, yBefore);
        }
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
      } else if (e.keyCode === Y) {
        return 'redo';
      } else if (e.keyCode === Z) {
        return 'undo';
      }
      return null;
    },
    handleEvent = function (e) {
      var output = document.getElementById('output'),
        li = null,
        command = handleInput(e);
      if (command === 'undo' && i >= 0) {
        output.childNodes[i + 1].innerHTML = '<i>' + unit + '</i>';
        commands[i].undo();
        i -= 1;
      } else if (command === 'redo' && i < commands.length - 1) {
        i += 1;
        commands[i].execute();
        output.childNodes[i + 1].innerHTML = unit;
      } else if (command && command.execute) {
        command.execute();
        i += 1;
        commands[i] = command;
        commands.length = i + 1;
        while (output.childElementCount > i) {
          output.removeChild(output.lastChild);
        }
        li = output.appendChild(document.createElement('li'));
        li.innerHTML = unit;
      }
    };
  window.addEventListener('keydown', handleEvent);
}());
