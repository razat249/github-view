import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { fetchUsers } from '../../redux/actions/usersActions'
import './SearchSideBar.css';

class SearchSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchData: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers("razat"))
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    const self = this;
    this.props.dispatch(fetchUsers(event.target.value))
  }

  render() {
    if (this.props.users.items) {
      var namesList = this.props.users.items.map(function(user){
                      return <li key={user.id} className="list-group-item">{user.login}</li>;
                    })
    }

    console.log(this.props);
    return (
      <div>
        <div>
          <h4>Search User</h4>
          {this.state.value}
          <from className="form-group">
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
          </from>
          <ul className="list-group">
            {namesList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.data
  };
}

export default connect(mapStateToProps)(SearchSideBar);
