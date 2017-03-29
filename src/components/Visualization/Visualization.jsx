import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

import './Visualization.css';

class Visualization extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br/><br/>
        <div className="visualization-wrapper">
          <h5 className="lightslategray-color">Contributions</h5>
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
            tooltipDataAttrs={{ 'data-toggle': 'tooltip'}}
          />
        </div>
      </div>
    );
  }
}

export default Visualization;
