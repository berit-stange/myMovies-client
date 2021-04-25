import React from 'react'; //import React into file
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
// import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

export class MainView extends React.Component { //exposing the component

    constructor() {
        super(); //initializes component’s state
        this.state = {
            movies: [],
            selectedMovie: null, //tells the application that no movie cards were clicked
            registration: null,
            user: null
        };
    }

    // componentDidMount() {
    //     axios.get('https://movie-app-001.herokuapp.com/movies')
    //         .then(response => {
    //             this.setState({
    //                 movies: response.data
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(movie) { //When movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
        this.setState({
            selectedMovie: movie
        });
    }

    onRegistration(registration) {
        this.setState({
            registration
        });
    }

    onLoggedIn(authData) { //parameter has been renamed - need to use both the user and the token
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

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

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        const { movies, selectedMovie, user, registration } = this.state;

        // if (!registration) return <RegistrationView onRegistration={registration => this.onRegistration(registration)} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Navbar >
                    <Nav.Item>
                        <Nav.Link href="#" className="logo">
                            myMovies
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="page-header">
                        <Button className="page-header__item btn-logout" onClick={() => { this.onLoggedOut() }}>LOG OUT</Button>
                        <Nav.Link href="#" className="page-header__item">
                            PROFILE
                        </Nav.Link>
                    </Nav.Item>
                </Navbar>

                <Row className="justify-content-md-center">
                    {selectedMovie
                        ? (
                            <Col>
                                <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        : movies.map(movie => (
                            <Col xs={6} sm={4} md={3} key={movie._id}>
                                <MovieCard movieData={movie} onMovieClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie)
                                }} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }

}
