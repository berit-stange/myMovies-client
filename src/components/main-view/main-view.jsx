import React from 'react'; //import React into file
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { RegistrationView } from '../registration-view/registration-view';
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

    componentDidMount() {
        axios.get('https://movie-app-001.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
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

    onLoggedIn(user) { //When user logs in, this function updates the `user` property in state to that particular user
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, registration } = this.state;

        // if (!registration) return <RegistrationView onRegistration={registration => this.onRegistration(registration)} />;

        // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div>
                <Nav className="page-header">
                    <Nav.Item >
                        <Nav.Link href="#" className="logo">
                            myMovies
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="page-header__item">
                        <Nav.Link href="#" className="page-header__item">
                            PROFILE
                        </Nav.Link>
                    </Nav.Item>
                    {/* <Button>PROFILE</Button> */}
                </Nav>
                <Row className="justify-content-md-center main-view">

                    {selectedMovie
                        ? (
                            <Col md={8}>
                                <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        : movies.map(movie => (
                            <Col xs={6} sm={4} md={3}>
                                <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => {
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
