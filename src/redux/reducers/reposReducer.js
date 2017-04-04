export default function reducer(state={
    data: [],
    fetching: false,
    fetched: false,
    error: null,    
}, action) {
  switch(action.type) {
    case "FETCH_REPOS_PENDING": {
      state = {...state};
      state.fetching = true;
      state.fetched = false;
      break;
    }
    case "FETCH_REPOS_FULFILLED": {
      state ={...state, data: action.payload.data};
      state.fetched = true;
      state.fetching = false;
      break;
    }
    case "FETCH_REPOS_REJECTED": {
      state ={...state, error: "user fetching error"};
      state.fetched = false;
      state.fetching = false;
      break;
    }
    case "SELECT_REPO": {
      state = {...state}
      state.data.forEach(function(repo) {
        if (action.payload === repo.id) {
          repo.selected = true;
        } else {
          repo.selected = false;
        }
      });
    }
  }
  
  return state
}