import React from 'react';
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

    render() {
        const { movieData, onBackClick } = this.props; //extracting the props

        return (
            // <Container>
            <Row className="movie-view">

                <Col sm={12} md={6}>

                    <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>

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

                <Col sm={12} md={6}>
                    <div className="movie-poster" >
                        <Image src={movieData.ImagePath} fluid></Image>
                    </div>
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