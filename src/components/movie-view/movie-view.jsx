import React from 'react';

export class MovieView extends React.Component {

    render() {
        const { movieData, onBackClick } = this.props; //extracting the props


        return (
            <div className="movie-view" style={{ width: 300 }}>

                <button onClick={() => { onBackClick(null); }} style={{ margin: 10, width: 300, padding: 10, backgroundColor: 'lightblue', border: 'none' }} >BACK</button>

                <div className="movie-poster" >
                    <img src={movieData.ImagePath} style={{ width: 300, padding: 10 }} />
                </div>

                <div className="movie-title" style={{ padding: 10 }}>
                    <span className="label">Title: </span>
                    <span className="value">{movieData.Title}</span>
                </div>

                <div className="movie-description" style={{ padding: 10 }} >
                    <span className="label">Description: </span>
                    <span className="value">{movieData.Description}</span>
                </div>

                <div className="movie-director" style={{ padding: 10 }} >
                    <span className="label">Director: </span>
                    <span className="value">{movieData.Director}</span>
                </div>

                <div className="movie-genre" style={{ padding: 10 }}>
                    <span className="label">Genre: </span>
                    <span className="value">{movieData.Genre}</span>
                </div>

                {/* <button onClick={() => { onBackClick(null); }} style={{ width: 300, padding: 10 }} >BACK</button> */}

            </div>
        );
    }
}