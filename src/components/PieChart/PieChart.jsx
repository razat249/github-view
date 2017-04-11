import React, { Component } from 'react';

// import './PieChart.css';
import { Chart } from 'react-google-charts';

class PieChart extends Component {
    constructor(props) {
        super(props);
    }

    parseActivity() {
        const activitiesList = [ 
            ["Event Type", "count"], 
            ["Push/commits", 0], 
            ["Comments", 0], 
            ["Create", 0], 
            ["Issues", 0],
            ["Fork", 0],
            ["PullRequest", 0],
            ["others", 0],
        ];
        this.props.activities.data.map(event => {
            switch (event.type) {
                case "PushEvent": {
                    activitiesList[1][1]++;
                    break;
                }
                case "IssueCommentEvent": {
                    activitiesList[2][1]++;
                    break;
                }
                case "CreateEvent": {
                    activitiesList[3][1]++;
                    break;
                }
                case "IssuesEvent": {
                    activitiesList[4][1]++;
                    break;
                }
                case "ForkEvent": {
                    activitiesList[5][1]++;
                    break;
                }
                case "PullRequestEvent": {
                    activitiesList[6][1]++;
                    break;
                }
                default: {
                    activitiesList[7][1]++;
                    break;
                }
            }
        })
        console.log(activitiesList)
        return [activitiesList, this.props.activities.data.length];
    }

    render() {

        const [chartData, length]= this.parseActivity()

        return (
            <div>
                <h5 className="lightslategray-color"><b>Showing Chart for past { length } activities</b></h5>    
                <Chart
                    chartType="PieChart"
                    data={chartData}
                    options={{
                        title: "Activity Plot",
                        pieHole: 0.4,
                    }}
                    graph_id="PieChart"
                    width="100%"
                    height="50vh"
                    legend_toggle
                />
            </div>
        );
    }
}

export default PieChart;
