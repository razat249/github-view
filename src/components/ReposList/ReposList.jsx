import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'react-fa';

import './ReposList.css';

class ReposList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.repos.data[0]) {
      const self = this;
      var reposList = this.props.repos.data.map(function(repo){
        return <a key={repo.id} href="#" className="list-group-item">{repo.name}</a>;
      })
    }

    console.log(this.props)
    return (
      <div className="reposlist-wrapper">
        <div>
          <h5 className="lightslategray-color"><b>Repositories</b></h5>
          { this.props.repos.fetching ? <h5><Icon spin name="spinner" /> Loading...</h5> :
            <ul className="list-group">
              {reposList}
            </ul> }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    repos: state.repos,
  };
}

export default connect(mapStateToProps)(ReposList);
