var DestinoCerto = DestinoCerto || {};
DestinoCerto.Maps = (function(){
  'use strict';

  var __private = {
    cache : function(){
      this.cooperativeItem = $('[data-cooperative-item]');
      this.map = null;
      this.gmarkers = [];
      this.infoWindow = new google.maps.InfoWindow();
      this.items = [];
    },

    bind: function(){
      this.cooperativeItem.on('click', this.handleMap);
    },

    handleMap: function(e){
      e.preventDefault();

      var name = $(this).find('strong').text();

      __private.removeActiveItems();
      __private.setCurrentPin(name);
      __private.map.setZoom(14);

      $(this).addClass('active');
    },

    loadData: function(){
      this.items = locations;

      __private.createMarkers(this.items);
      __private.createCooperativeItems(locations);
    },

    createCooperativeItems: function(items){
      var generatedContent = '';
      for(var i = 0, l = items.length; i < l; i++) {
        generatedContent += this.createSingleCooperativeItem(items[i], i);
      }

      $('[data-cooperatives-target]').html(generatedContent);

      this.cooperativeItem = $('[data-cooperative-item]');
      this.bind();
    },

    createSingleCooperativeItem: function(item, index){
      var template = $('[data-cooperative-template]').html();

      var name     = item[0];
      var location = item[1];
      var lat      = item[3];
      var phone    = item[4];

      template = template.replace('{{name}}', name);
      template = template.replace('{{location}}', location);
      template = template.replace('{{phone}}', phone);
      template = template.replace('{{index}}', index);
      template = template.replace('{{lat}}', lat.split('.')[1]);

      return template;
    },

    setCurrentPin: function(name){
      google.maps.event.trigger(this.gmarkers[name],'click');
    },

    removeActiveItems: function(){
      $('.map-content .active').removeClass('active');
    },

    loadMap: function(){
      this.map = new google.maps.Map(document.querySelector('[data-map-target]'), {
        zoom: 12,
        panControl: false,
        zoomControl: true,
        scaleControl: false,
        center: new google.maps.LatLng(-23.550228111445016, -46.63098330873412),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    },

    createSingleMarker: function(position, content){
      var map = this.map;

      var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: position,
        map: map
      });

      google.maps.event.addListener(marker, "mouseover", function() {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      });

      google.maps.event.addListener(marker, "mouseout", function() {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      });

      google.maps.event.addListener(marker, 'click', function() {
        if(arguments[0] !== undefined) {
          var id = arguments[0]['latLng']['K'].toString().split('.')[1];

          __private.removeActiveItems();
          $('[data-cooperative-' + id + ']').addClass('active');
        }

        __private.infoWindow.setContent(content);
        __private.infoWindow.open(map, marker);
      });

      return marker;
    },

    createMarkers: function(locations){
      var position, content;

      for (var i = 0, l = locations.length; i < l; i++) {
        var position = new google.maps.LatLng(locations[i][2], locations[i][3]);
        var content  = locations[i][0] + "<br>" + locations[i][1];

        this.gmarkers[locations[i][0]] = __private.createSingleMarker(position, content);
      }
    }
  };

  return {
    init: function(){
      __private.cache();
      __private.bind();

      __private.loadMap();
      __private.loadData();
    }
  };
})();
