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
            <div className="card">
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a href="#test1">Test 1</a></li>
                        <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
                        <li className="tab col s3"><a href="#test3">Test 3</a></li>
                        <li className="tab col s3"><a href="#test4">Test 4</a></li>
                    </ul>
                </div>
                <div id="test1" className="col s12">
                    <div id="chart_div"></div>
                </div>
                <div id="test2" className="col s12">Test 2</div>
                <div id="test3" className="col s12">Test 3</div>
                <div id="test4" className="col s12">Test 4</div>
            </div>
            </div>
        )
    }
});
