import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';

import './genre-view.scss';

export class GenreView extends React.Component {

    render() {
        const { moviesOfGenre, genreData, onBackClick } = this.props; //extracting the props

        return (
            <Container>
                <Row className="genre-view">
                    <Col sm={12} md={4}>
                        <Button className="material-icons round btn-full" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                    </Col>
                    <Col sm={12} md={8}>
                        <h2 className="value genre-name">{genreData.Name}</h2>
                        <h3 className="genre-description">Description:  </h3>
                        <p className="value">{genreData.Description}</p>
                    </Col>
                </Row>

                <Container>
                    <h2 className="value genre-name">Movies in Genre "{genreData.Name}"</h2>
                    <Row>
                        {
                            moviesOfGenre.map((movie) => {//loop through movieData (= movies-collection in DB) and use the one that has this Genre Name that we're in
                                if (movie.Genre.Name === genreData.Name)
                                    return <Col xs={3} sm={4} md={4} lg={3} key={movie._id}>
                                        <MovieCard movieData={movie} />
                                        {/* when I use MovieCard I have to use this pro name that has been defined in the route for Movie Card? */}
                                        {/* When I display the movie info differently, I can use movieOfGenre? */}
                                        {/* <p className="value">{moviesOfGenre.Title}</p>   */}
                                        {/* this doesn't work because it's just the name of the function? */}
                                    </Col>
                            })
                        }

                        {/* defining the content (the movieData.map function)in the route and just putting it here doesn't work */}
                        {/* why? because I already defined the content for the Genre View in the route and this is sub-content? */}
                        {/* {movieData} */}
                        {/* {movieData = { movie }} */}
                    </Row>
                </Container>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genreData: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
        // moviesOfGenre: do I have to include this and when yes - how? As a function? 
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
