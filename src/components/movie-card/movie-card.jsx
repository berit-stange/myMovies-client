import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {

    render() {

        const { movieData } = this.props;

        return (
            <Card>
                <Link to={`/movies/${movieData._id}`}>
                    <Card.Img variant="top" src={movieData.ImagePath} />
                    {/* <Card.Body>
                        <Card.Title>{movieData._id}</Card.Title>
                    </Card.Body> */}
                </Link>
                {/* <Link to={`/movies/${movieData._id}`}> */}
                {/* <Button variant="link" className="material-icons round"><span>open_in_full</span></Button> */}
                {/* </Link> */}

            </Card>
        );
    }
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};
