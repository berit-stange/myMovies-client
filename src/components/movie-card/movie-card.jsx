import React from 'react';

export class MovieCard extends React.Component {
    render() {
        // const { movie } = this.props;
        const { movieData, onMovieClick } = this.props;
        // return <div className="movie-card" >{movie.Title}</div>;
        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;

    }
}
