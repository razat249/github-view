import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import './Visualization.css';
import PieChart from '../PieChart/PieChart'

class Visualization extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.activities);
    return (
      <div>
        <br />
        {/*<div className="alert alert-warning">This page will not work right now. (Under Development)</div>
        <div className="text-center">
          <h5 className="lightslategray-color"><b>Pie Chart</b></h5>            
        </div>*/}
        <section className="pie-chart">
          <PieChart activities={ this.props.activities }></PieChart>
        </section>
        {/*<section>
          <div className="inline-block">
            <DropdownButton title="Choose Visualization" id="visual">
              <MenuItem eventKey="1" active>Calendar heatmap</MenuItem>
              <MenuItem eventKey="2">Pie chart</MenuItem>
              <MenuItem eventKey="3">Line chart</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">coming soon</MenuItem>
            </DropdownButton>
          </div>
          <div className="pull-right">
            <DropdownButton title="Choose activity type" id="visual">
              <MenuItem eventKey="1" active>Commits</MenuItem>
              <MenuItem eventKey="2">Issues</MenuItem>
              <MenuItem eventKey="3">Pull requests</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">coming soon</MenuItem>
            </DropdownButton>
          </div>
        </section>
        <br />
        <section className="visualization-wrapper">
          <h5 className="lightslategray-color"><b>Contributions</b></h5>
          <CalendarHeatmap
            endDate={new Date()}
            numDays={365}
            values={[
              { date: '2017-01-01', count: 1 },
              { date: '2017-01-22', count: 1 },
              { date: '2017-01-30', count: 1 },
              // ...and so on
            ]}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
            titleForValue={(value) => "Pupu"}
            tooltipDataAttrs={{ 'data-toggle': 'tooltip' }}
          />
        </section>
        <hr/>
        <section>
          <h4 className="lightslategray-color"><b>One Day Activity</b></h4>          
          <div className="list-group">
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Pushed 5 Commits to repo github/view </h4>
              <p className="list-group-item-text">d3ffr - "add list group to visualization page"</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Created github-view Repository</h4>
              <p className="list-group-item-text">Analysing activities.</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Branched react-redux-boilerplate from github/view </h4>
            </a>
          </div>
        </section>*/}
      </div>
    );
  }
}

export default Visualization;
