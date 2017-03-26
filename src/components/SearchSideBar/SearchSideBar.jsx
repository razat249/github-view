import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { fetchUsers } from '../../redux/actions/usersActions';
import { fetchUserRepos } from '../../redux/actions/reposActions';
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

  componentWillMount() {
    this.props.dispatch(fetchUsers("razat"))
    this.props.dispatch(fetchUserRepos('razat249'))
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.dispatch(fetchUsers(event.target.value))
  }

  handleClick(userName) {
    this.props.dispatch(fetchUserRepos(userName))
  }

  render() {
    if (this.props.users.data.items) {
      const self = this;
      var usersList = this.props.users.data.items.map(function(user){
        return <a key={user.id} href="#" onClick={ e => self.handleClick(user.login) } className="list-group-item">{user.login}</a>;
      })
    }

    console.log(this.props);
    return (
      <div>
        <div>
          <h4>Search User</h4>
          {this.state.value}
          <from className="form-group">
            <input disabled={this.props.users.fetching} type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
          </from>
          <ul className="list-group">
            {this.props.users.fetching ? <h5>Loading...</h5>: usersList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    repos: state.repos,
  };
}

export default connect(mapStateToProps)(SearchSideBar);
