import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            birthday: '',
            email: '',
            favoriteMovies: '',
            // movies: ''
        };
    }

    getUserData(token) { //like in MainView, but with more data 
        // console.log(token);
        axios.get(`https://berit-stange.de/test/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // console.log(response, '!userdata response')
                this.setState({ // Assign the result to the state > access via this.state. .... later
                    username: response.data.Username, //!!!!
                    // password: response.data.Password,
                    // birthday: response.data.Birthday,
                    // email: response.data.Email,
                    favoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addFavorite(e) {
        console.log('before');
        e.preventDefault();
        console.log('after');
        const { username } = this.state;
        const { movieData } = this.props;
        axios.post(`https://berit-stange.de/test/users/${this.state.username}/favorites/${movieData._id}`,
            {
                Username: username
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                // const data = response.data;
                // console.log(data);
                console.log('Added!');
                alert('Added!');
                // window.open('/', '_self'); //self: page will open in the current tab
                // localStorage.setItem('user', data.Username);
            })
            .catch(e => {
                console.log('error at addMovie')
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')//only getting the login data and token, right?
            });
            // this.getMovies(accessToken);
            // this.getUser(accessToken); //calling the functions above + ...
            this.getUserData(accessToken); //mounting all the data that the function "pulled" from DB, access via this.? this.users?
        }
    }


    render() {
        const { movieData, onBackClick } = this.props; //extracting the props
        // const { username, password, birthday, email, favoriteMovies } = this.state;

        return (
            // <Container>
            <Row className="movie-view">

                <Col sm={12} md={6}>

                    <Button className="material-icons round btn-full" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>

                    <h2 className="value movie-title">{movieData.Title}</h2>

                    <h3 className="movie-description">Description: </h3>
                    <p className="value">{movieData.Description}</p>

                    <h3 className="movie-director">Director:</h3>
                    <p className="value">{movieData.Director.Name}</p>
                    <Link to={`/directors/${movieData.Director.Name}`}>
                        <Button variant="link">see Director</Button>
                    </Link>

                    <h3 className="movie-genre">Genre:</h3>
                    <p className="value">{movieData.Genre.Name}</p>
                    <Link to={`/genre/${movieData.Genre.Name}`}>
                        <Button variant="link">see Genre</Button>
                    </Link>

                    <h3 className="movie-genre">Actors:</h3>
                    <p className="value">{movieData.Actors}</p>

                    <h3 className="movie-genre">Release Year:</h3>
                    <p className="value">{movieData.ReleaseYear}</p>
                </Col>

                <Col sm={12} md={6} className="movie-poster">
                    <Image src={movieData.ImagePath} fluid></Image>
                    <Button className="material-icons round btn-add btn-full" onClick={(event) => { this.addFavorite(event); }} ><span>add</span></Button>
                </Col>

            </Row>
            // </Container>
        );
    }
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired
};