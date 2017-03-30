import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'react-fa';

import { fetchRepoEvents } from '../../redux/actions/singleUserActions';
import './ReposList.css';

class ReposList extends Component {
  constructor(props) {
    super(props);

    this.selectRepo = this.selectRepo.bind(this);
  }

  selectRepo(username, repo) {
    this.props.dispatch(fetchRepoEvents(username, repo));
  }

  render() {
    const repos = this.props.repos;
    if (repos.data[0]) {
      const self = this;
      var reposList = repos.data.map(function(repo){
        return <a key={repo.id} href="#" onClick={ e => self.selectRepo(repo.owner.login, repo.name) } className="list-group-item">{repo.name}</a>;
      })
    }

    console.log(this.props)
    return (
      <div className="reposlist-wrapper">
        <div>
          <h4 className="lightslategray-color"><b>Repositories</b></h4>
          { repos.fetching ? <h4 className="lightslategray-color text-center"><b><Icon spin name="spinner" /> Loading...</b></h4> :
            repos.fetched ?
              <ul className="list-group">
                {reposList}
              </ul>:
              <h6 className="lightslategray-color text-center"><b>Your repos will load here.</b></h6> }
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
