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
        console.log(achievement);
      }
    },
    onNotify = function (entity, event) {
      switch (event) {
      case EVENT_ENTITY_FELL:
        if (entity.isHero() && heroIsOnBridge) {
          unlock(ACHIEVEMENT_FELL_OFF_BRIDGE);
        }
        break;
      }
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
  var updateEntity = function (entity) {
    var wasOnSurface = entity.isOnSurface();
    entity.accelerate(GRAVITY);
    entity.update();
    if (wasOnSurface && !entity.isOnSurface()) {
      notify(entity, EVENT_START_FALL);
    }
  };
  return {
    updateEntity: updateEntity
  };
};
Physics.prototype = new Subject();
