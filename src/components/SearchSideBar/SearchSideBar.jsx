import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'react-fa';

import { fetchUsers } from '../../redux/actions/usersActions';
import { fetchUserRepos } from '../../redux/actions/reposActions';
import { fetchUserSummary, fetchUserEvents } from '../../redux/actions/singleUserActions';
import './SearchSideBar.css';

class SearchSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.dispatch(fetchUsers(event.target.value))
  }

  handleClick(userName) {
    this.props.dispatch(fetchUserRepos(userName))
    this.props.dispatch(fetchUserSummary(userName))
    this.props.dispatch(fetchUserEvents(userName))    
  }

  render() {
    if (this.props.users.data.items) {
      var usersList = this.props.users.data.items.map(function(user){
        return <option key={user.id} href="#" value={user.login} />;
      })
    }

    return (
      <div className="search-side-bar-wrapper">
        <div>
          <h5 className="lightslategray-color"><b>GitHub Username</b></h5>
          <from className="form-group">
            <input list="users" className="form-control" value={this.state.value} onChange={this.handleChange}/>
            <datalist id="users">
              {usersList}
            </datalist>
            <h5>
              {this.props.users.fetching ? <span><Icon spin name="spinner" /> Loading...</span>: ""}
            </h5>
            <button className="btn btn-primary" onClick={ e => this.handleClick(this.state.value) }>Submit</button>
          </from>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(SearchSideBar);
