import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {

        const { movieData, onMovieClick } = this.props;

        return (
            // <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
            //     <h1>{movieData.Title}</h1>
            //     <img src={movieData.ImagePath} style={{ width: 300, padding: 10 }} />
            // </div>
            <Card>
                {/* <Card.Img variant="top" src={movieData.ImagePath} /> */}
                <Card.Body>
                    <Card.Title>{movieData.Tile}</Card.Title>
                    {/* <Card.Text>{movieData.Description}</Card.Text> */}
                    <Button onClick={() => onMovieClick(movieData)} variant="link">OPEN</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
