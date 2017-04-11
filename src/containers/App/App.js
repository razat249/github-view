import React, { Component } from 'react';
import { Icon } from 'react-fa';

import './App.css';
import SearchSideBar from '../../components/SearchSideBar/SearchSideBar.jsx';
import UserSummary from '../../components/UserSummary/UserSummary.jsx';
import ReposList from '../../components/ReposList/ReposList.jsx';
import UserDetailsContainer from '../../components/UserDetailsContainer/UserDetailsContainer.jsx';

class App extends Component {
  render() {
    return (
      <div className="wrapper">

        {/*Fork me on GitHub ribbon*/}
        <a href="https://github.com/razat249/github-view" target="_"><img className="fork-ribbon" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" /></a>

        {/*main app start*/}
        <div>
          <header className="text-center main-header">
            <h5 className="text-color-white"><b>GITHUB VIEW</b><small className="text-color-white"> v0.2.7</small></h5>
          </header>

          <section className="row App">
            <section className="col-md-2 side-search-bar App-height">
              <SearchSideBar></SearchSideBar>
              <hr/>
              <UserSummary></UserSummary>
            </section>
            <section className="col-md-2 side-search-bar App-height">
              <ReposList></ReposList>
            </section>          
            <section className="col-md-8 App-height">
              <UserDetailsContainer></UserDetailsContainer>
            </section>
          </section>
        
          <footer>
            <h6 className="lightslategray-color text-center">
              <span>Made with <Icon className="footer-love-icon" name="heart"/> by Rajat Patwa(
                <a href="https://github.com/razat249">@razat249</a>) under MIT License</span>
            </h6>
          </footer>
        </div>
        {/*main app end*/}

      </div>
    );
  }
}

export default App;