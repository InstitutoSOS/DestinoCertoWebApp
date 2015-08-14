var DestinoCerto = DestinoCerto || {};
DestinoCerto.Maps = (function(){
  'use strict';

  var API_ENDPOINT = 'http://destinocerto.sebastianhaeni.ch/api/material/';

  var CELLPHONES   = [
    '(11) 3412-7100', '(11) 3316-2738', '(11) 3183-4613', '(11) 3342-0192',
    '(11) 3491-3419', '(11) 3457-9342', '(11) 3274-1149', '(11) 3951-1425',
    '(11) 3143-7143', '(11) 3598-3151', '(11) 3365-3200', '(11) 3429-9146'
  ];

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
      __private.map.setZoom(16);
      __private.map.panTo(__private.gmarkers[name].getPosition());

      $(this).addClass('active');
    },

    loadData: function(){
      var that = this;
      var url  = API_ENDPOINT + materialsId[currentMaterial];

      $.getJSON('https://jsonp.afeld.me/?url=' + url, function(data){
        that.items = data.sites;

        $('[data-total-results]').html(data.sites.length);

        if(data.sites.length != 0) {
          __private.createCooperativeItems(data.sites);
          __private.createMarkers(data.sites);
        } else {
          $('[data-cooperatives-target]').html('<small>Nenhuma cooperativa foi encontrada. :(</small>')
        }
      });
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

      var name     = item.currentLocation.site.name;
      var location = item.currentLocation.site.address;
      var lat      = item.currentLocation.site.lat.split('.')[1];
      var weight   = parseFloat(item.weight);

      template = template.replace('{{name}}', name);
      template = template.replace('{{location}}', location);
      template = template.replace('{{index}}', index);
      template = template.replace('{{lat}}', lat);
      template = template.replace('{{weight}}', weight);

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
          var id = arguments[0]['latLng']['G'].toString().split('.')[1];

          __private.removeActiveItems();
          $('[data-cooperative-' + id + ']').addClass('active');
        }

        __private.infoWindow.setContent(content);
        __private.infoWindow.open(map, marker);
      });

      return marker;
    },

    createMarkers: function(locations){
      var position, content, lat, lng, name, address, phone;

      for (var i = 0, l = locations.length; i < l; i++) {
        address = locations[i].currentLocation.site.address;
        name    = locations[i].currentLocation.site.name;
        lat     = locations[i].currentLocation.site.lat;
        lng     = locations[i].currentLocation.site.lng;
        phone   = CELLPHONES[Math.floor(Math.random()*CELLPHONES.length)];

        position = new google.maps.LatLng(lat, lng);
        content  = '<strong style="font-size: 16px">' + name + '</strong>';
        content += "<br>" + address;
        content += '<br><br>' + phone;

        this.gmarkers[name] = __private.createSingleMarker(position, content);
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
