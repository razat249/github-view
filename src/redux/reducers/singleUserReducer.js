export default function reducer(state = {
  userSummary: {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
  },
  userEvents: {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
  },
}, action) {
  switch (action.type) {
    case "FETCH_USER_SUMMARY_PENDING":
      {
        state = { ...state };
        state.userSummary.fetching = true;
        state.userSummary.fetched = false;
        break;
      }
    case "FETCH_USER_SUMMARY_FULFILLED":
      {
        state = { ...state };
        state.userSummary.data = action.payload.data;
        state.userSummary.fetched = true;
        state.userSummary.fetching = false;
        break;
      }
    case "FETCH_USER_SUMMARY_REJECTED":
      {
        state = { ...state };
        state.userSummary.error = "user fetching error";
        state.userSummary.fetched = false;
        state.userSummary.fetching = false;
        break;
      }

      
    case "FETCH_USER_EVENTS_PENDING":
      {
        state = { ...state };
        state.userEvents.fetching = true;
        state.userEvents.fetched = false;
        break;
      }
    case "FETCH_USER_EVENTS_FULFILLED":
      {
        state = { ...state };
        state.userEvents.data = action.payload.data;
        state.userEvents.fetched = true;
        state.userEvents.fetching = false;
        break;
      }
    case "FETCH_USER_EVENTS_REJECTED":
      {
        state = { ...state };
        state.userEvents.error = "user fetching error";
        state.userEvents.fetched = false;
        state.userEvents.fetching = false;
        break;
      }

    case "FETCH_REPO_EVENTS_PENDING":
      {
        state = { ...state };
        state.userEvents.fetching = true;
        state.userEvents.fetched = false;
        break;
      }
    case "FETCH_REPO_EVENTS_FULFILLED":
      {
        state = { ...state };
        state.userEvents.data = action.payload.data;
        state.userEvents.fetched = true;
        state.userEvents.fetching = false;
        break;
      }
    case "FETCH_REPO_EVENTS_REJECTED":
      {
        state = { ...state };
        state.userEvents.error = "user fetching error";
        state.userEvents.fetched = false;
        state.userEvents.fetching = false;
        break;
      }
  }

  return state
}