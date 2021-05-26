import React, { useEffect } from 'react';
import axios from 'axios';

import { connect, useDispatch, useSelector } from 'react-redux';  //  useSelector > read redux state,, useDispatch > gives access to dispatch function

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"; // for goBack() ? 

import { setMovies } from '../../actions/actions'; // #0 new > Redux //importing the actions
import { setUser } from '../../actions/actions';

import Navigation from '../navigation/navigation';
import MoviesList from '../movies-list/movies-list';


import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
// import { MovieCard } from '../movie-card/movie-card'; //imported and used in MoviesList component
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

// #2 new: export keyword removed
const MainView = (props) => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    console.log(movies, '!movies');

    function getMovies() {
        // axios.get('https://movie-app-001.herokuapp.com/movies', {
        //     headers: { Authorization: `Bearer ${token}` }
        // })
        //     .then(response => {
        //         // this.setState({ // Assign the result to the state
        //         //     movies: response.data
        //         // });
        //         props.setMovies(response.data);  // #4 new > redux > connected via the import {connect} ?
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        return async (dispatch, getState) => {
            const response = await axios.get('https://movie-app-001.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            dispatch(setMovies(response.data));
        };
    }


    useEffect(() => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            // this.setState({
            //     user: localStorage.getItem('user')
            // });
            // props.setUser({
            //     user: localStorage.getItem('user')
            // });
            // getMovies(accessToken);
            dispatch(getMovies());
        }
    });

    function onRegistration() {
        // onRegistration(registration) {
        // this.setState({        //before redux
        //     registration       // this.state > registration: null,
        // });
        props.setUser({});
    }

    function onLoggedIn(authData) {
        console.log(authData);
        // this.setState({       //before redux
        //     user: authData.user.username, 
        // });
        props.setUser({
            username: authData.user.Username,
            password: authData.user.Password,
            email: authData.user.Email,
            birthday: authData.user.Birthday,
            favoriteMovies: authData.user.FavoriteMovies
        })
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        getMovies(authData.token);
        // this.getUser(authData.token);
    }

    function onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // this.setState({ // before redux
        //     user: null
        // });
        props.setUser({});
        window.open(`/`, '_self');
    }



    let { user } = props; // #5 new  >>> movies durch setMovies? und user durch setUser?
    let accessToken = localStorage.getItem('token');


    return (
        <Router >
            <div className="main-view">

                <Navigation token={accessToken} logOut={() => onLoggedOut()} onBackClick={() => history.goBack()} />

                <Row className="justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!accessToken) return <Col>
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="" />;

                        return <MoviesList movies={movies} user={user} /> //#6 new >>> Redux
                    }} />

                    <Route path="/login" render={() => {
                        if (!accessToken) return <Col>
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="" />;
                        return movies.map(m => (
                            <Col xs={12} sm={6} md={4} lg={3} key={m._id}>
                                <MovieCard movieData={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (accessToken) return <Redirect to="/" /> //add alert: "you're logged in already!"
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!accessToken) return <Col>
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="" />;
                        return <Col>
                            <MovieView
                                movieData={movies.find(m => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!accessToken) return <Col>
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="" />;
                        return <Col>
                            <DirectorView
                                directorData={movies.find(m => m.Director.Name === match.params.name).Director}
                                moviesOfDirector={movies}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!accessToken) return <Col>
                            <LoginView onLoggedIn={user => onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="" />;
                        return <Col>
                            <GenreView
                                genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} //use with {genreData.Name} Genre Daten (from exercise)
                                moviesOfGenre={movies} //function prop to access the movies-collection in DB
                                onBackClick={() => history.goBack()}
                            />
                        </Col>
                    }} />

                    <Route path="/users/:username" render={({ history }) => {
                        if (!accessToken) return <Col>
                            <LoginView
                                onLoggedIn={user => onLoggedIn(user)} />
                        </Col>
                        return <Col>
                            <ProfileView
                                movieData={movies}
                                token={accessToken}
                                // onBackClick={() => props.history.goBack()}
                                onBackClick={() => history.goBack()}
                            />
                        </Col>
                    }} />

                </Row>

            </div>
        </Router >
    );


}

// #7 new    
let mapStateToProps = state => {
    return {
        // movies: state.movies,
        user: state.user
    }
}

let mapDispatchToProps = state => {
    return { user: state.user }
}

// #8 new  //connecting to the store
export default connect(mapStateToProps, { /* setMovies, */ setUser })(MainView);
