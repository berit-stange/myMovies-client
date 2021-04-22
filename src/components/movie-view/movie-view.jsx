import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    render() {
        const { movieData, onBackClick } = this.props; //extracting the props

        return (
            <div className="movie-view" style={{ width: 300 }}>

                <button onClick={() => { onBackClick(null); }} >BACK</button>

                <div className="movie-poster" >
                    <img src={movieData.ImagePath} />
                </div>

                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movieData.Title}</span>
                </div>

                <div className="movie-description" >
                    <span className="label">Description: </span>
                    <span className="value">{movieData.Description}</span>
                </div>

                <div className="movie-director" >
                    <span className="label">Director: </span>
                    {/* <span className="value">{movieData.Director}</span> */}
                    <span className="value">{movieData.Director.Name}</span>
                </div>

                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movieData.Genre.Name}</span>
                </div>

            </div>
        );
    }
}

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired
};