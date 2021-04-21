import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {

        const { movieData, onMovieClick } = this.props;

        return (
            <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
                <h1>{movieData.Title}</h1>
                <img src={movieData.ImagePath} style={{ width: 300, padding: 10 }} />
            </div>
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
