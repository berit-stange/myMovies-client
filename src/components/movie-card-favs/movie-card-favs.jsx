import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './movie-card-favs.scss';



export class MovieCardFavs extends React.Component {

    constructor() {
        super(); //initializes component’s state
        this.state = {
            username: '',
            // password: '',
            // birthday: '',
            // email: '',
            favoriteMovies: []
        }
    }

    deleteFavorite(movie) {
        axios.delete(`https://movie-app-001.herokuapp.com/users/${this.state.username}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                console.log('Deleted!');
                window.open('/users/${this.state.username}', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at deleteFavorite');
            });
    }

    render() {

        const { movieData, movie } = this.props;
        const favoriteMovieList = movieData.filter(m => favoriteMovies.includes(m._id));

        return (
            <Card>
                <Card.Img variant="top" src={movieData.ImagePath} />
                {/* <Card.Title>{movieData.Title}</Card.Title> */}
                <Card.Body>
                    <Row>
                        <Col>
                            <Button className="material-icons round delete-favorite" onClick={() => this.deleteFavorite(movie)}><span>remove</span></Button>
                        </Col>
                        <Col>
                            <Link to={`/movies/${movieData._id}`}>
                                {/* <Button variant="link" className="btn-card">Open</Button> */}
                                <Button variant="link" className="material-icons round"><span>open_in_full</span></Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

MovieCardFavs.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};
