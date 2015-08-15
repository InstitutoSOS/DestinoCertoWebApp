$(function () {
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
        xAxis: {
            categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'] 
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
            type: 'column',
            name: 'Plastico',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15]
        },
        {
            type: 'column',
            name: 'Vidro',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15]
        },
        {
            type: 'column',
            name: 'Aluminio',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15]
        }, {
            type: 'column',
            name: 'Tetrapack',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15]
        }, {
            type: 'column',
            name: 'Paper',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15]
        }, {
            type: 'column',
            name: 'Others',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15]
        }, {
            type: 'spline',
            name: 'Média',
            data: [2, 3, 5, 6, 6, 7, 8, 9, 10, 12, 15],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: 'Jane',
                y: 13,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: 'John',
                y: 23,
                color: Highcharts.getOptions().colors[1] // John's color
            }, {
                name: 'Joe',
                y: 19,
                color: Highcharts.getOptions().colors[2] // Joe's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
});


