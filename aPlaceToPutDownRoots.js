var Terrain = function (movementCost, water, texture) {
  'use strict';
  var getMovementCost = function () {
      return movementCost;
    },
    isWater = function () {
      return water;
    },
    getTexture = function () {
      return texture;
    };
  return {
    getMovementCost: getMovementCost,
    isWater: isWater,
    getTexture: getTexture
  };
};

var World = function () {
  'use strict';
  var x,
    WIDTH = 20,
    HEIGHT = 10,
    GRASS_TEXTURE = '"',
    HILL_TEXTURE = '^',
    RIVER_TEXTURE = '~',
    grassTerrain = new Terrain(1, false, GRASS_TEXTURE),
    hillTerrain = new Terrain(3, false, HILL_TEXTURE),
    riverTerrain = new Terrain(2, true, RIVER_TEXTURE),
    tiles = [],
    generateTerrain = function () {
      var x, y;
      for (x = 0; x < WIDTH; x += 1) {
        tiles[x] = [];
        for (y = 0; y < HEIGHT; y += 1) {
          if (parseInt(Math.random() * 10, 10) === 0) {
            tiles[x][y] = hillTerrain;
          } else {
            tiles[x][y] = grassTerrain;
          }
        }
      }
      x = parseInt(Math.random() * WIDTH, 10);
      for (y = 0; y < HEIGHT; y += 1) {
        tiles[x][y] = riverTerrain;
      }
    },
    getTile = function (x, y) {
      return tiles[x][y];
    };
  return {
    WIDTH: WIDTH,
    HEIGHT: HEIGHT,
    generateTerrain: generateTerrain,
    getTile: getTile
  };
};

window.addEventListener('load', function () {
  'use strict';
  var world, cost, texture, x, y;
  world = new World();
  world.generateTerrain();
  cost = world.getTile(2, 3).getMovementCost();
  document.getElementById('output').innerHTML += cost;
  for (y = 0; y < world.HEIGHT; y += 1) {
    document.getElementById('output').innerHTML += '<br>';
    for (x = 0; x < world.WIDTH; x += 1) {
      texture = world.getTile(x, y).getTexture();
      document.getElementById('output').innerHTML += texture;
    }
  }
});
