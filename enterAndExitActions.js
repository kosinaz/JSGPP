function press(keyCode) {
  'use strict';
  return 'press' + keyCode;
}

function release(keyCode) {
  'use strict';
  return 'release' + keyCode;
}
var IMAGE_STAND = 'Standing',
  IMAGE_DUCK = 'Ducking',
  IMAGE_BOMB = 'Super Bomb!',
  MAX_CHARGE = 50,
  PRESS_DOWN = press(40),
  RELEASE_DOWN = release(40),
  standingState;

function DuckingState() {
  'use strict';
  this.chargeTime = 0;
}
DuckingState.prototype.enter = function (heroine) {
  'use strict';
  this.chargeTime = 0;
  heroine.setGraphics(IMAGE_DUCK);
};
DuckingState.prototype.exit = function (heroine) {
  'use strict';
  document.getElementById('timer').innerHTML = '';
};
DuckingState.prototype.handleInput = function (heroine, input) {
  'use strict';
  if (input === RELEASE_DOWN) {
    heroine.changeState(standingState);
  }
};
DuckingState.prototype.update = function (heroine) {
  'use strict';
  this.chargeTime += 1;
  if (this.chargeTime > MAX_CHARGE) {
    heroine.superBomb();
  }
  document.getElementById('timer').innerHTML = 'Charging: ' + this.chargeTime;
};

function StandingState() {
  'use strict';
}
StandingState.prototype.enter = function (heroine) {
  'use strict';
  heroine.setGraphics(IMAGE_STAND);
};
StandingState.prototype.exit = function (heroine) {
  'use strict';
};
StandingState.prototype.handleInput = function (heroine, input) {
  'use strict';
  if (input === PRESS_DOWN) {
    heroine.changeState(heroine.duckingState);
  }
};
StandingState.prototype.update = function (heroine) {
  'use strict';
};
standingState = new StandingState();

function Heroine() {
  'use strict';
  this.state = standingState;
  this.duckingState = new DuckingState();
  this.graphics = IMAGE_STAND;
}
Heroine.prototype.changeState = function (state) {
  'use strict';
  this.state.exit(this);
  this.state = state;
  this.state.enter(this);
};
Heroine.prototype.handleInput = function (input) {
  'use strict';
  this.state.handleInput(this, input);
};
Heroine.prototype.update = function () {
  'use strict';
  this.state.update(this);
  document.getElementById('output').innerHTML = this.graphics;
};
Heroine.prototype.setGraphics = function (graphics) {
  'use strict';
  this.graphics = graphics;
};
Heroine.prototype.superBomb = function () {
  'use strict';
  this.setGraphics(IMAGE_BOMB);
};

window.addEventListener('load', function () {
  'use strict';
  var heroine = new Heroine(),
    update = function () {
      heroine.update();
    };
  window.addEventListener('keydown', function (e) {
    heroine.handleInput(press(e.keyCode));
  });
  window.addEventListener('keyup', function (e) {
    heroine.handleInput(release(e.keyCode));
  });
  window.setInterval(update, 100);
});
