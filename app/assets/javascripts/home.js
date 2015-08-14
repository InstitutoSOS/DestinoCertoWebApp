var DestinoCerto = DestinoCerto || {};
DestinoCerto.HomePage= (function(){
  'use strict';

  var __private = {
    cache : function(){
      this.items = $('.material');
    },

    animate: function(){
      this.items.each(function(index) {
        $(this).delay(250 * index).fadeIn(1000);
      });
    }
  };

  return {
    init: function(){
      __private.cache();
      __private.animate();
    }
  };
})();
