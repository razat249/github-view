import React, { Component } from 'react';

import ReposList from '../ReposList/ReposList.jsx';
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
          <h4>User Name</h4>
        </div>
        <div>
          <Visualization></Visualization>
        </div>
        <div>
          <h4>Repositories</h4>
          <ReposList></ReposList>
        </div>
      </div>
    );
  }
}

export default UserDetailsContainer;
