var Ghost = function (health, speed) {
  'use strict';
  return {
    toString: function () {
      return 'Ghost(' + health + ',' + speed + ') ';
    },
    clone: function () {
      return new Ghost(health, speed);
    }
  };
};

var Spawner = function (monsterPrototype) {
  'use strict';
  return {
    spawnMonster: function () {
      return monsterPrototype.clone();
    }
  };
};

window.addEventListener('load', function () {
  'use strict';
  var
    ghostPrototype = new Ghost(15, 3),
    ghostSpawner = new Spawner(ghostPrototype),
    i;
  for (i = 0; i < 5; i += 1) {
    document.getElementById('output').innerHTML += ghostSpawner.spawnMonster();
  }
});
