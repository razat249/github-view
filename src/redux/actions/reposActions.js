import axios from 'axios';

export function fetchUserRepos(user) {
    return {
        type: "FETCH_REPOS", 
        payload: axios.get(`https://api.github.com/users/${user}/repos?sort=pushed&page=1&per_page=100`),
    }
}

export function selectRepo(id) {
    return {
        type: "SELECT_REPO",
        payload: id,
    }
}

export function unSelectRepo() {
    return {
        type: "UN_SELECT_REPO",
    }
}