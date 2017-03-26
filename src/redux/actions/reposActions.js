import axios from 'axios';

export function fetchUserRepos(user) {
    return {
        type: "FETCH_REPOS", 
        payload: axios.get(`https://api.github.com/users/${user}/repos`)
    }
}