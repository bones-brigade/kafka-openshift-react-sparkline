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
    this.renderChart = this.renderChart.bind(this);
  }

  renderChart() {
    var data = {
      columns: [
        this.props.numbers,
      ],
      type: 'area'
    };

    var c3ChartDefaults = $().c3ChartDefaults();
    var config = c3ChartDefaults.getDefaultSparklineConfig();
    config.bindto = '#sparkline-chart';
    config.data = data;
    c3.generate(config);
  }

  componentDidMount() {
    this.renderChart()
  }

  render() {
    this.renderChart()
    return (
      <div>
        <div id="sparkline-chart" className="chart-pf-sparkline"></div>
      </div>
    );
  }
}

class Console extends React.Component {
  constructor(props) {
    super(props);
    var zeroes = [];
    zeroes.length = 100;
    zeroes.fill(0);
    this.state = {
      numbers: zeroes,
    }
    this.updateNumbers = this.updateNumbers.bind(this);
  }

  updateNumbers(data) {
    var value = parseInt(data, 10);
    var newnumbers = this.state.numbers.slice();
    if (!isNaN(value) && (value >=0 && value <= 100)) {
      newnumbers.unshift(value);
      this.setState({
        numbers: newnumbers.slice(0, 100),
      });
    }
  }

  componentDidMount() {
    /*
    this.timerID = window.setInterval(
      this.updateNumbers,
      2000
    );
    */
    const socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => console.log('connection open');
    socket.onerror = (error) => console.log('connection error ' + error);
    socket.onmessage = (event) => this.updateNumbers(event.data);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default navbar-pf">
          <div className="navbar-header">
            <img src="/brand.svg" alt="Kafka Charter"/>
          </div>
        </nav>
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <Sparkline
               numbers={this.state.numbers} />
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
