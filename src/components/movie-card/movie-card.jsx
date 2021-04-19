import React from 'react';

export class MovieCard extends React.Component {
    render() {
        // const { movieData } = this.props;
        const { movieData, onMovieClick } = this.props;
        // return <div className="movie-card" >{movieData.Title}</div>;
        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
            <h1>{movieData.Title}</h1>
        </div>;

    }
}
