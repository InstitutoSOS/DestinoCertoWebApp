var DestinoCerto = DestinoCerto || {};
DestinoCerto.App = (function(){
  'use strict';

  var __private = {
    loadModules: function(){
      for(var module in DestinoCerto) {
        if(DestinoCerto.hasOwnProperty(module) && module !== "App") {
          DestinoCerto[module].init();
        }
      }
    }
  };

  return {
    init: function(){
      __private.loadModules();
    }
  };
})();
