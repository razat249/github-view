import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';

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
    const userEvents = this.props.data.singleUser.userEvents;
    
    const intialState = (
      <div className="lightslategray-color text-center user-details-container-initial">
        <Icon name="area-chart" />
        <h4><b>Your visualization will appear here.</b></h4>
      </div>
    );

    const fetchingState = (
      <div>
        <br/><br/>
        <h2 className="lightslategray-color text-center">
          <Icon spin name="circle-o-notch" />
          <b> Loading...</b>
        </h2>
      </div>
    );

    const fetchedState = (
      <div>
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
          { this.state.activeTimeline ? <UserEventsList user={this.props.data.singleUser} dispatch={this.props.dispatch} username={this.props.data.singleUser.userSummary.data.login} selectedRepo={this.props.data.repos.selectedRepo} /> : "" }
        </div>
        <div>
          { this.state.activeVisualization ? <Visualization activities={ this.props.data.singleUser.userEvents }></Visualization> : "" }
        </div>
      </div>
    );

    return (
      <div className="user-details-container-wrapper">
        { userEvents.fetched ? fetchedState : ( userEvents.fetching ? fetchingState : intialState ) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(UserDetailsContainer);
