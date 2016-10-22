var Unit = function (name, x, y) {
  'use strict';
  var
    swapped = false,
    moveTo = function (targetX, targetY) {
      x = targetX;
      y = targetY;
    };
  return {
    executeCommand: function () {
      var action, args, commands, execute;
      args = arguments;
      commands = {
        'lurch': function () {
          var directions, move, random;
          directions = {
            'left': function () {
              moveTo(x - 1, y);
            },
            'up': function () {
              moveTo(x, y - 1);
            },
            'right': function () {
              moveTo(x + 1, y);
            },
            'down': function () {
              moveTo(x, y + 1);
            },
            'default': function () {
              random = Math.floor(Math.random() * 4);
              directions[['left', 'up', 'right', 'down'][random]]();
            }
          };
          if (args[1]) {
            move = directions[args[1]];
          } else {
            move = directions['default'];
          }
          move();
          action = ['lurched to', x, y].join(' ');
        },
        'jump': function () {
          moveTo(args[1], args[2]);
          action = ['phase jumped to', x, y].join(' ');
        },
        'fire': function () {
          action = 'fired his ' + (swapped ? 'sidearm' : 'gun');
        },
        'swap': function () {
          swapped = !swapped;
          action = 'swapped weapons';
        },
        'default': function () {
          action = 'took a rest';
        }
      };
      if (args[0]) {
        execute = commands[args[0]];
      } else {
        execute = commands['default'];
      }
      execute();
      return [name, action].join(' ');
    }
  };
};
var game = (function () {
  'use strict';
  var
    player = new Unit('Player', 10, 10, 10),
    enemy = new Unit('Enemy', 20, 10, 5),
    log = function (text) {
      document.getElementById('output').innerHTML = text;
    },
    handleEvent = function (e) {
      var handle, keyCodes, result;
      keyCodes = {
        16: function () {
          result = player.executeCommand('swap');
        },
        17: function () {
          result = player.executeCommand('fire');
        },
        32: function () {
          result = player.executeCommand('jump', 10, 10);
        },
        37: function () {
          result = player.executeCommand('lurch', 'left');
        },
        38: function () {
          result = player.executeCommand('lurch', 'up');
        },
        39: function () {
          result = player.executeCommand('lurch', 'right');
        },
        40: function () {
          result = player.executeCommand('lurch', 'down');
        },
        'default': function () {
          result = player.executeCommand();
        }
      };
      if (keyCodes[e.keyCode]) {
        handle = keyCodes[e.keyCode];
      } else {
        handle = keyCodes['default'];
      }
      handle();
      log(result + '<br>' + enemy.executeCommand('lurch'));
    };
  window.addEventListener('keydown', handleEvent);
}());
