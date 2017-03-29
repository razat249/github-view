import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReposList from '../ReposList/ReposList.jsx';
import UserEventsList from '../UserEventsList/UserEventsList.jsx';
import Visualization from '../Visualization/Visualization.jsx';
import './UserDetailsContainer.css';

class UserDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTimeline: "active",
      activeVisualization: "",
    }
    this.handleClick = this.switchTabs.bind(this);
  }

  switchTabs(isTimelineActive) {
    if (isTimelineActive) {
      this.setState({
        activeTimeline: "active",
        activeVisualization: "",
      })
    } else {
      this.setState({
        activeTimeline: "",
        activeVisualization: "active",
      })
    }
  }

  render() {
    return (
      <div className="user-details-container-wrapper">
        <section>
          <ul className="nav nav-tabs row">
            <li className={ this.state.activeTimeline + " col-md-6 text-center" }>
              <a href="#" onClick={ e => this.switchTabs(true) }>Timeline</a>
            </li>
            <li className={ this.state.activeVisualization + " col-md-6 text-center" }>
              <a href="#" onClick={ e => this.switchTabs(false) } >Visualization</a>
            </li>
          </ul>
        </section>
        <div>
          { this.state.activeTimeline ? <UserEventsList></UserEventsList> : "" }
        </div>
        <div>
          { this.state.activeVisualization ? <Visualization></Visualization> : "" }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.repos,
  };
}

export default connect(mapStateToProps)(UserDetailsContainer);
