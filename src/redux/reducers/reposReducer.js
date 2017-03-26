export default function reducer(state={
    data: {},
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
  }
  
  return state
}