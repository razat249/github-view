import React, { Component } from 'react';
import './SearchSideBar.css';

import { ListGroup, ListGroupItem} from 'react-bootstrap';

class SearchSideBar extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>Search User</h4>
          <input type="text"/>
        </div>
        <div>
          <ListGroup>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>sadk</ListGroupItem>
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default SearchSideBar;
