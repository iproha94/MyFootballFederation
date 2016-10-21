import React from 'react';

export default React.createClass({
    componentDidMount: function () {
        $('ul.tabs').tabs();

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Год', 'Голы', 'Красные карточки'],
                ['2013', 1000, 400],
                ['2014', 1170, 460],
                ['2015', 660, 1120],
                ['2016', 1030, 540]
            ]);

            var options = {
                title: 'Статистика игрока',
                hAxis: {title: 'Год', titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0}
            };

            var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    },
    render: function () {
        return (
            <div id="chart_div"></div>
        )
    }
});
