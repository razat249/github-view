import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import SearchSideBar from './components/SearchSideBar/SearchSideBar.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="row">
          <section className="col-md-3 side-search-bar">
            <SearchSideBar></SearchSideBar>        
          </section>
          <section className="col-md-9"></section>
        </section>
        
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
