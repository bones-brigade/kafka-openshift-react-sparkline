import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'patternfly/dist/css/patternfly.css';
import 'patternfly/dist/css/patternfly-additions.css';
import $ from 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import c3 from 'c3/c3.min.js';
import 'd3/d3.min.js';
import 'patternfly/dist/js/patternfly.js';

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        columns: [
          ['%', 10, 14, 12, 20, 31, 27, 44, 36, 52, 55, 62, 68, 69, 88, 74, 88, 91],
        ],
        type: 'area'
      }
    };
  }

  componentDidMount() {
    var c3ChartDefaults = $().c3ChartDefaults();
    var sparklineChartConfig = c3ChartDefaults.getDefaultSparklineConfig();
    sparklineChartConfig.bindto = '#sparkline-chart';
    sparklineChartConfig.data = this.state.data;
    c3.generate(sparklineChartConfig);
  }

  render() {
    return (
      <div>
        <div id="sparkline-chart" class="chart-pf-sparkline"></div>
      </div>
    );
  }
}

class Console extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default navbar-pf">
          <div className="navbar-header">
            <img src="/brand.svg" alt="Kafka Charter"/>
          </div>
        </nav>
        <div class="row">
          <div class="col-xs-8 col-xs-offset-2">
            <Sparkline />
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
