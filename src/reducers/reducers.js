import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function user(state = {}, action) { //{} because user is an object not an array? or string '' because of input ?
    switch (action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

// built-in function from Redux - imported in index.jsx
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
});

export default moviesApp;
