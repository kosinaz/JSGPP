var EVENT_ENTITY_FELL = 1,
  EVENT_START_FALL = 1,
  EVENT_ENTITY_MOVED_ON_BRIDGE = 2,
  GRAVITY = 1;

var Achievement = function (text) {
  'use strict';
  var unlocked = false,
    isUnlocked = function () {
      return unlocked;
    },
    unlock = function () {
      unlocked = true;
    },
    toString = function () {
      return 'Achievement: ' + text;
    };
  return {
    isUnlocked: isUnlocked,
    unlock: unlock,
    toString: toString
  };
};

var Achievements = function () {
  'use strict';
  var ACHIEVEMENT_FELL_OFF_BRIDGE =
    new Achievement('Hurts less than falling in love...'),
    heroIsOnBridge = false,
    unlock = function (achievement) {
      if (!achievement.isUnlocked()) {
        achievement.unlock();
        document.getElementById('output').innerHTML += achievement;
      }
    },
    onNotify = function (entity, event) {
      switch (event) {
      case EVENT_ENTITY_FELL:
        if (entity.isHero() && heroIsOnBridge) {
          unlock(ACHIEVEMENT_FELL_OFF_BRIDGE);
        }
        break;
      case EVENT_ENTITY_MOVED_ON_BRIDGE:
        if (entity.isHero()) {
          heroIsOnBridge = true;
        }
        break;
      }
    };
  return {
    onNotify: onNotify
  };
};

var Subject = function () {
  'use strict';
  var observers = [],
    numObservers = 0,
    addObserver = function (observer) {
      observers.push(observer);
      numObservers += 1;
    },
    removeObserver = function (observer) {
      observers.splice(observers.indexOf(observer), 1);
      numObservers -= 1;
    },
    notify = function (entity, event) {
      var i;
      for (i = 0; i < numObservers; i += 1) {
        observers[i].onNotify(entity, event);
      }
    };
  return {
    addObserver: addObserver,
    removeObserver: removeObserver,
    notify: notify
  };
};

var Physics = function () {
  'use strict';
  var notify = this.notify,
    updateEntity = function (entity) {
      var wasOnSurface = entity.isOnSurface();
      entity.accelerate(GRAVITY);
      entity.update();
      if (wasOnSurface && !entity.isOnSurface()) {
        notify(entity, EVENT_START_FALL);
      }
    };
  return {
    addObserver: this.addObserver,
    removeObserver: this.removeObserver,
    updateEntity: updateEntity
  };
};
Physics.prototype = new Subject();

var Entity = function (name, hero) {
  'use strict';
  var notify = this.notify,
    distance = 0,
    onSurface = true,
    stopped = false,
    isHero = function () {
      return hero;
    },
    isStopped = function () {
      return stopped;
    },
    isOnSurface = function () {
      return onSurface;
    },
    accelerate = function (i) {
      distance += 1;
    },
    update = function () {
      var status = name + ' moved ';
      if (distance < 2) {
        if (parseInt(Math.random() * 10, 10)) {
          status += 'towards the bridge. ';
        } else {
          status += 'off surface! ';
          onSurface = false;
          this.stop();
        }
      } else if (distance < 6) {
        notify(this, EVENT_ENTITY_MOVED_ON_BRIDGE);
        if (parseInt(Math.random() * 5, 10)) {
          status += 'on bridge. ';
        } else {
          status += 'off bridge! ';
          onSurface = false;
          this.stop();
        }
      } else {
        status += 'and reached the other side! ';
        this.stop();
      }
      document.getElementById('output').innerHTML += status;
    },
    stop = function () {
      stopped = true;
    };
  return {
    addObserver: this.addObserver,
    removeObserver: this.removeObserver,
    isHero: isHero,
    isStopped: isStopped,
    isOnSurface: isOnSurface,
    accelerate: accelerate,
    update: update,
    stop: stop
  };
};
Entity.prototype = new Subject();

window.addEventListener('load', function () {
  'use strict';
  var achs = new Achievements(),
    phys = new Physics(),
    hero = new Entity('Hero', true),
    monster = new Entity('Monster', false),
    i;
  phys.addObserver(achs);
  hero.addObserver(achs);
  monster.addObserver(achs);
  while (!hero.isStopped() && !monster.isStopped()) {
    document.getElementById('output').innerHTML += '<br>';
    phys.updateEntity(hero);
    if (!hero.isStopped()) {
      phys.updateEntity(monster);
    }
  }
});
