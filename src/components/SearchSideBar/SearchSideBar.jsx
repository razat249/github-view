import React, { Component } from 'react';
import axios from "axios";
import './SearchSideBar.css';

class SearchSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchData: [1,2,3,4,5]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    const self = this;
    // Make a request for a user with a given ID 
    axios.get('https://api.github.com/search/users?q=' + this.state.value)
      .then(function (response) {
        console.log(response);
        self.setState({searchData: response.data.items});
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  render() {
    var namesList = this.state.searchData.map(function(user){
                    return <li key={user.id} className="list-group-item">{user.login}</li>;
                  })
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

export default SearchSideBar;
