import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import SearchSideBar from '../../components/SearchSideBar/SearchSideBar.jsx';
import UserSummary from '../../components/UserSummary/UserSummary.jsx';
import ReposList from '../../components/ReposList/ReposList.jsx';
import UserDetailsContainer from '../../components/UserDetailsContainer/UserDetailsContainer.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <header className="text-center main-header">
          <h5 className="text-color-white"><b>GITHUB VIEW</b></h5>
        </header>
        <section className="row App">
          <section className="col-md-2 side-search-bar">
            <SearchSideBar></SearchSideBar>
            <hr/>
            <UserSummary></UserSummary>
          </section>
          <section className="col-md-2 side-search-bar">
            <ReposList></ReposList>
          </section>          
          <section className="col-md-8">
            <UserDetailsContainer></UserDetailsContainer>
          </section>
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