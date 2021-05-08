import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux'; //this + next line import connect() function and React Redux
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers'; //gets the reducer > takes a state and an action + returns new state

import MainView from './components/main-view/main-view'; //{} removed because exported as default component

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//parameter from reducer.js + dev tools
const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyMoviesApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyMoviesApplication), container);
