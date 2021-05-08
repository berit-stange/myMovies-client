import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';  // allows to connect setMovies? 

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
// #0 new
import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list'; // kommt noch

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navigation } from '../navigation/navigation';

import './main-view.scss';

// #2 new: export keyword removed
/* export */ class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            // movies: [], // #3 new 
            registration: null,
            user: null
        };
    }


    getMovies(token) {
        axios.get('https://movie-app-001.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // this.setState({ // Assign the result to the state
                //     movies: response.data
                // });
                this.props.setMovies(response.data);  // #4 new > redux > connected via the import {connect} ?
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) {
        axios.get('https://movie-app-001.herokuapp.com/users/:Username', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }

    onRegistration(registration) {
        this.setState({
            registration
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUser(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        // const { movies, user } = this.state; (old, before redux )

        // In the section of code marked #0, you imported the relevant actions (setMovies). 
        // This action will be used in code section #5, 
        // where you connect it to the MainView using, again, the connect() function, 
        // which returns another function. >>>? 
        let { movies } = this.props; // #5 new
        let { user } = this.state;

        return (
            <Router>
                <div className="main-view">

                    <Navigation user={user} logOut={() => this.onLoggedOut()} />

                    <Row className="justify-content-md-center">

                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="" />;
                            // return movies.map(m => (
                            //     <Col xs={12} sm={6} md={4} lg={3} key={m._id}>
                            //         <MovieCard movieData={m} />
                            //     </Col>
                            // ))

                            //#6 new
                            return <MoviesList movies={movies} />
                        }} />

                        <Route path="/login" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="" />;
                            return movies.map(m => (
                                <Col xs={12} sm={6} md={4} lg={3} key={m._id}>
                                    <MovieCard movieData={m} />
                                </Col>
                            ))
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" /> //add alert: "you're logged in already!"
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }} />

                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="" />;
                            return <Col>
                                <MovieView
                                    movieData={movies.find(m => m._id === match.params.movieId)}
                                    onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="" />;
                            return <Col>
                                <GenreView
                                    genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} //use with {genreData.Name} Genre Daten (from exercise)
                                    // genreData={movies.find((m) => m.Genre.Name === match.params.name)} //use with {genreData.Genre.Name} in GenreView //nimmt ersten Film mit diesem Genre
                                    moviesOfGenre={movies} //function prop that can access the movies-collection in DB

                                    //can I define what content to show in the view besides the Genre info above? And just place it on a certain position?
                                    // moviesOfGenre={movies.map((movie) => {
                                    //     if (movie.Genre.Name === this.Name)
                                    //         return <Col xs={3} sm={4} md={4} lg={3} key={movie._id}>
                                    //             <MovieCard />
                                    //         </Col>
                                    // })}

                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        }} />

                        <Route path="/users/:username" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView
                                    onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            return <Col>
                                <ProfileView
                                    movieData={movies}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        }} />

                    </Row>

                </div>
            </Router >
        );
    }

}

// #7 new    //movieData?
let mapStateToProps = state => {
    return { movies: state.movies }
    // return { movieData: state.movies }
}

// #8 new
export default connect(mapStateToProps, { setMovies })(MainView);