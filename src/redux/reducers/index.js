import { combineReducers } from 'redux';

import users from './usersReducer';
import repos from './reposReducer';
import singleUser from './singleUserReducer';
// import other from './otherReducer';

export default combineReducers({
    users,
    repos,
    singleUser,
    // other,
})

