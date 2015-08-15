$(function () {
    var materials = {
      plastico  : [200, 221, 194, 201, 208, 199, 203, 240, 287, 301, 314],
      vidro     : [103, 110, 99, 121, 108, 113, 136, 190, 199, 230, 260],
      aluminio  : [75, 84, 90, 79, 81, 75, 80, 88, 94, 101, 121],
      tetrapack : [145, 155, 140, 151, 149, 152, 160, 165, 170, 177, 186],
      papel     : [231, 260, 240, 263, 259, 263, 255, 280, 288, 298, 306],
      outros    : [130, 154, 144, 151, 140, 146, 151, 170, 183, 192, 201]
    };

    var colors = {
      plastico  : Highcharts.getOptions().colors[0],
      vidro     : Highcharts.getOptions().colors[1],
      aluminio  : Highcharts.getOptions().colors[2],
      tetrapack : Highcharts.getOptions().colors[3],
      papel     : Highcharts.getOptions().colors[4],
      outros    : Highcharts.getOptions().colors[5],
    };

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    initial();

    $('select').on('change', function(){
      var current = $('select').val();

      if(current == 'integrado') {
        initial();
        return;
      }
      single(current);
    });

    function single(current) {
      $('#container').highcharts({
          credits: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          chart: {
            backgroundColor: '#F5F5F5',
          },
          title: {
              text: ''
          },
          yAxis: {
            labels: {
              format: '{value}kg'
            },
            title: {
              text: null
            }
          },
          xAxis: {
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          },
          series: [{
              type: 'column',
              name: capitalizeFirstLetter(current),
              data: materials[current],
              color: colors[current]
          }]
      });
    }

    function initial(){
      $('#container').highcharts({
          credits: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          chart: {
            backgroundColor: '#F5F5F5',
          },
          title: {
              text: ''
          },
          yAxis: {
            labels: {
              format: '{value}kg'
            },
            title: {
              text: null
            }
          },
          xAxis: {
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          },
          labels: {
              items: [{
                  html: 'Total Reciclado',
                  style: {
                      left: '50px',
                      top: '18px',
                      color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                  }
              }]
          },
          series: [{
              colorByPoint: true,
              type: 'column',
              name: 'Plastico',
              data: materials.plastico
          },
          {
              type: 'column',
              name: 'Vidro',
              data: materials.vidro
          },
          {
              type: 'column',
              name: 'Alumínio',
              data: materials.aluminio
          }, {
              type: 'column',
              name: 'Tetrapack',
              data: materials.tetrapack
          }, {
              type: 'column',
              name: 'Papel',
              data: materials.papel
          }, {
              type: 'column',
              name: 'Outros',
              data: materials.outros
          }, {
              type: 'pie',
              name: 'Total reciclado',
              data: [{
                  name: 'Plastico',
                  y: eval(materials.plastico.join('+')),
                  color: colors['plastico']
              }, {
                  name: 'Vidro',
                  y: eval(materials.vidro.join('+')),
                  color: colors['vidro']
              }, {
                  name: 'Aluminio',
                  y: eval(materials.aluminio.join('+')),
                  color: colors['aluminio']
              }, {
                  name: 'Tetrapack',
                  y: eval(materials.tetrapack.join('+')),
                  color: colors['tetrapack']
              }, {
                  name: 'Papel',
                  y: eval(materials.papel.join('+')),
                  color: colors['papel']
              }, {
                  name: 'Outros',
                  y: eval(materials.outros.join('+')),
                  color: colors['outros']
              }],
              center: [170, 12],
              size: 80,
              showInLegend: false,
              dataLabels: {
                  enabled: false
              }
          }]
      });
    }
});


