// defining the actions / action types
export const SET_MOVIES = 'SET_MOVIES'; // initilizes the the list with movies
export const SET_FILTER = 'SET_FILTER'; // filter the movies list
export const SET_USER = 'SET_USER'; //setting the user

// action creators
export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USER, value };
}

// explititly naming the the actions
// exporting functions for convenience: 
// can be called from anywhere 

// next:
// actions are sent to store (aided by dispatcher)
// > code to change the state after action and payload (information in action)
