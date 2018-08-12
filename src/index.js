import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'patternfly/dist/css/patternfly.css';
import 'patternfly/dist/css/patternfly-additions.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.js';

class Console extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default navbar-pf">
          <div className="navbar-header">
            <img src="/brand.svg" alt="Kafka Charter"/>
          </div>
        </nav>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Console />,
  document.getElementById('root')
);
