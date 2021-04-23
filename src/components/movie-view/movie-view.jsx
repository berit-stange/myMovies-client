import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movieData, onBackClick } = this.props; //extracting the props

        return (
            <Row className="movie-view">

                <Col sm={12} md={6}>
                    <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>

                    <div className="movie-title">
                        {/* <span className="label">Title: </span> */}
                        <h2 className="value">{movieData.Title}</h2>
                    </div>

                    <h3 className="movie-description">Description: </h3>
                    <p className="value">{movieData.Description}</p>

                    <h3 className="movie-director">Director:</h3>
                    <p className="value">{movieData.Director.Name}</p>

                    <h3 className="movie-genre">Genre:</h3>
                    <p className="value">{movieData.Genre.Name}</p>

                    <h3 className="movie-genre">Actors:</h3>
                    <p className="value">{movieData.Actors}</p>

                    <h3 className="movie-genre">Release Year:</h3>
                    <p className="value">{movieData.ReleaseYear}</p>

                    {/* <div className="movie-genre"> //code style from exercise
                        <span className="label">Genre: </span>
                        <span className="value">{movieData.Genre.Name}</span>
                    </div> */}
                </Col>
                <Col sm={12} md={6}>
                    <div className="movie-poster" >
                        <Image src={movieData.ImagePath} fluid></Image>
                    </div>
                </Col>
            </Row>
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