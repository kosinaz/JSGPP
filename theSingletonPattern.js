var FileSystem = (function () {
  'use strict';
  var instance = null,
    FileSystemInstance = function () {
      this.value = parseInt(Math.random() * 10, 10) + '<br>';
    },
    getInstance = function () {
      if (instance === null) {
        instance = new FileSystemInstance();
      }
      return instance;
    };
  return {
    getInstance: getInstance
  };
}());

window.addEventListener('load', function () {
  'use strict';
  document.getElementById('output').innerHTML = FileSystem.getInstance().value;
  document.getElementById('output').innerHTML += FileSystem.getInstance().value;
});
