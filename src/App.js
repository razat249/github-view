import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import SearchSideBar from './components/SearchSideBar/SearchSideBar.jsx';
import ReposList from './components/ReposList/ReposList.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="row">
          <section className="col-md-3 side-search-bar">
            <SearchSideBar></SearchSideBar>        
          </section>
          <section className="col-md-9">
            <ReposList></ReposList>
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


// import { applyMiddleware, combineReducers, createStore } from "redux";
// import logger from "redux-logger";
// import promise from 'redux-promise-middleware';
// import axios from "axios";

// const initialState = {
//   data: [],
//   fetching: false,
//   fetched: false,
// }

// const userReducer = function(state=initialState, action) {
//   switch(action.type) {
//     case "FETCH_USERS_PENDING": {
//       state = {...state};
//       state.fetching = true;
//       state.fetched = false;
//       break;
//     }
//     case "FETCH_USERS_FULFILLED": {
//       state ={...state, data: action.payload.data.items};
//       state.fetched = true;
//       state.fetching = false;
//       break;
//     }
//     case "FETCH_USERS_REJECTED": {
//       break;
//     }
//   }
  
//   return state
// }

// const tweetsReducer = function(state=[], action) {
//   return state
// }

// const reducers = combineReducers({
//   user: userReducer,
//   tweets: tweetsReducer
// })

// const middleware = applyMiddleware(promise(), logger);

// const store = createStore(reducers, middleware);

// store.subscribe(() => {
//   console.log("store changed", store.getState());
// })

// store.dispatch({
//   type: "FETCH_USERS", 
//   payload: axios.get('https://api.github.com/search/users?q=razat')
// })
// store.dispatch({type: "CHANGE_AGE", payload: 3})
// store.dispatch({type: "INC", payload: 4})
// store.dispatch({type: "INC", payload: 6})
// store.dispatch({type: "INC", payload: 7})