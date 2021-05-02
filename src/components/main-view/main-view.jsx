import React from 'react'; //import React into file
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

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

import './main-view.scss';

export class MainView extends React.Component { //exposing the component

    constructor() {
        super(); //initializes component’s state
        this.state = {
            movies: [],
            // selectedMovie: null, //tells the application that no movie cards were clicked
            registration: null,
            user: null,
            // users: []
        };
    }

    // setSelectedMovie(movie) { //When movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
    //     this.setState({
    //         selectedMovie: movie
    //     });
    // }

    getMovies(token) {
        axios.get('https://movie-app-001.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ // Assign the result to the state
                    movies: response.data
                });
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
                this.setState({ // Assign the result to the state
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

    onLoggedIn(authData) { //parameter has been renamed - need to use both the user and the token
        console.log(authData);
        this.setState({
            user: authData.user.username,
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUser(authData.token);
        // window.open('/', '_self'); //self: page will open in the current tab
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <div className="main-view">

                    <Navbar>
                        <Nav.Item className="logo">
                            myMovies
                            </Nav.Item>
                        <Nav.Item className="page-header">
                            <Button className="page-header__item btn-logout" onClick={() => { this.onLoggedOut() }}>LOG OUT</Button>
                            <Nav.Link href={`/users/${user}`} className="">
                                <Button variant="link" className="page-header__item btn-profil-e" onClick={() => { this.onLoggedIn() }}>{this.state.user}</Button>
                            </Nav.Link>
                        </Nav.Item>
                    </Navbar>

                    <Row className="justify-content-md-center">

                        <Route exact path="/" render={() => {
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
                            // if (users.length === 0) return <div className="" />;
                            return <Col>
                                <ProfileView
                                    movieData={movies}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        }} />

                    </Row>

                </div>
            </Router>
        );
    }

}
