import axios from 'axios';

export function fetchUserSummary(user) {
    return {
        type: "FETCH_USER_SUMMARY", 
        payload: axios.get('https://api.github.com/users/' + user),
    }
}

export function fetchUserEvents(user) {
    return {
        type: "FETCH_USER_EVENTS",
        payload: axios.get(`https://api.github.com/users/${user}/events`),
    }
}