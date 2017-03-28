import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReposList from '../ReposList/ReposList.jsx';
import UserEventsList from '../UserEventsList/UserEventsList.jsx';
import Visualization from '../Visualization/Visualization.jsx';
import './UserDetailsContainer.css';

class UserDetailsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-details-container-wrapper">
        <div>
          <UserEventsList></UserEventsList>
        </div>
        <div>
          {/*<Visualization></Visualization>*/}
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
