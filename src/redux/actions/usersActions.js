import axios from 'axios';

export function fetchUsers(query) {
    return {
        type: "FETCH_USERS", 
        payload: axios.get('https://api.github.com/search/users?q=' + query)
    }
}