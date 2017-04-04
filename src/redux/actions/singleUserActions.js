import axios from 'axios';

const ITEMS_PER_PAGE = 20;

export function fetchUserSummary(user) {
    return {
        type: "FETCH_USER_SUMMARY", 
        payload: axios.get('https://api.github.com/users/' + user),
    }
}

export function fetchUserEvents(user) {
    return {
        type: "FETCH_USER_EVENTS",
        payload: axios.get(`https://api.github.com/users/${user}/events?page=1&per_page=${ITEMS_PER_PAGE}`),
    }
}

export function fetchRepoEvents(user, repo) {
    return {
        type: "FETCH_REPO_EVENTS",
        payload: axios.get(`https://api.github.com/repos/${user}/${repo}/events?page=1&per_page=${ITEMS_PER_PAGE}`),
    }
}

export function loadMoreEvents(user, repo, pageNumberToLoad) {
    if (!repo) {
        return {
            type: "LOAD_MORE_EVENTS",
            payload: axios.get(`https://api.github.com/users/${user}/events?page=${pageNumberToLoad}&per_page=${ITEMS_PER_PAGE}`),
        }
    } else {
        return {
            type: "LOAD_MORE_EVENTS",
            payload: axios.get(`https://api.github.com/repos/${user}/${repo}/events?page=${pageNumberToLoad}&per_page=${ITEMS_PER_PAGE}`),
        }
    }
}