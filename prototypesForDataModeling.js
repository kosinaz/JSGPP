var out = '',
  monsterLister = function (monsters) {
    'use strict';
    var i, j, p, q;
    for (i = 0; i < monsters.length; i += 1) {
      out += '<li>';
      for (p in monsters[i]) {
        if (monsters[i].hasOwnProperty(p)) {
          if (p === 'prototype') {
            for (j = 0; j < monsters.length; j += 1) {
              if (monsters[j].name === monsters[i][p]) {
                for (q in monsters[j]) {
                  if (monsters[j].hasOwnProperty(q) && q !== 'name') {
                    out += q + ': <b>' + monsters[j][q] + '</b> ';
                  }
                }
                break;
              }
            }
          } else {
            out += p + ': <b>' + monsters[i][p] + '</b> ';
          }
        }
      }
    }
  };

window.addEventListener('load', function () {
  'use strict';
  document.getElementById('output').innerHTML = out;
});
