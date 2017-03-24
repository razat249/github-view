import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Col, Row } from 'react-bootstrap';

import SearchSideBar from './components/SearchSideBar/SearchSideBar.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <SearchSideBar></SearchSideBar>            
            </Col>
            <Col xs={6} md={6}>
            asldjlajksdkllaj</Col>
          </Row>
        </Grid>


        <footer>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
