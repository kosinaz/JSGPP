var Unit = function (name, x, y) {
  'use strict';
  var log = function (text) {
    document.getElementById('output').innerHTML =
      text + '<br>' + document.getElementById('output').innerHTML;
  };
  return {
    getX: function () {
      return x;
    },
    getY: function () {
      return y;
    },
    moveTo: function (targetX, targetY) {
      x = targetX || x + Math.floor(Math.random() * 3) - 1;
      y = targetY || y + Math.floor(Math.random() * 3) - 1;
      log([name, 'lurched to', x, y].join(' '));
    }
  };
};

var CommandList = function () {
  'use strict';
  var
    commands = [],
    i = -1;
  return {
    add: function (commandObject) {
      i += 1;
      commands[i] = commandObject;
      commands[i].execute();
    },
    undo: function () {
      if (commands[i - 1]) {
        i -= 1;
        commands[i].undo();
      }
    },
    redo: function () {
      if (commands[i + 1]) {
        i += 1;
        commands[i].execute();
      }
    }
  };
};

var game = (function () {
  'use strict';
  var
    unit1 = new Unit('Unit 1', 10, 10),
    unit2 = new Unit('Unit 2', 20, 20),
    enemy = new Unit('Enemy', 20, 10),
    commands = new CommandList(),
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
    handleEvent = function (e) {
      var handle, ids, keyCommands, keys, result, unit;
      unit = document.getElementById('unit1').checked ? unit1 : unit2;
      keys = [];
      ids =
        ['left', 'up', 'right', 'down', 'undo', 'redo'];
      ids.forEach(function (item) {
        keys[document.getElementById(item).value] = item;
      });
      keyCommands = {
        'left': function () {
          commands.add(makeMoveUnitCommand(unit, unit.getX() - 1, unit.getY()));
          commands.add(makeMoveUnitCommand(enemy));
        },
        'up': function () {
          commands.add(makeMoveUnitCommand(unit, unit.getX(), unit.getY() - 1));
          commands.add(makeMoveUnitCommand(enemy));
        },
        'right': function () {
          commands.add(makeMoveUnitCommand(unit, unit.getX() + 1, unit.getY()));
          commands.add(makeMoveUnitCommand(enemy));
        },
        'down': function () {
          commands.add(makeMoveUnitCommand(unit, unit.getX(), unit.getY() + 1));
          commands.add(makeMoveUnitCommand(enemy));
        },
        'undo': function () {
          commands.undo();
          commands.undo();
        },
        'redo': function () {
          commands.redo();
          commands.redo();
        },
        'default': function () {
          commands.add(makeMoveUnitCommand(enemy));
        }
      };
      if (keyCommands[keys[e.key]]) {
        handle = keyCommands[keys[e.key]];
      } else {
        handle = keyCommands['default'];
      }
      handle();
    };
  window.addEventListener('keydown', handleEvent);
}());
