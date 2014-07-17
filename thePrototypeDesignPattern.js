var Spawner = function (Monster) {
  'use strict';
  var spawnMonster = function () {
    return new Monster(15, 3);
  };
  return {
    spawnMonster: spawnMonster
  };
};

var Ghost = function (health, speed) {
  'use strict';
  var toString = function () {
    return 'Ghost(' + health + ',' + speed + ') ';
  };
  return {
    toString: toString
  };
};

window.addEventListener('load', function () {
  'use strict';
  var ghostSpawner = new Spawner(Ghost), i;
  for (i = 0; i < 5; i += 1) {
    document.getElementById('output').innerHTML += ghostSpawner.spawnMonster();
  }
});
