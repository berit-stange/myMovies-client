import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export class GenreView extends React.Component {

    render() {
        const { genreData, onBackClick } = this.props; //extracting the props

        return (
            <Row className="genre-view">
                <Col sm={12} md={4}>
                    <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                </Col>

                <Col sm={12} md={8}>
                    <h2 className="value genre-name">{genreData.Name}</h2>
                    <h3 className="genre-description">Description: </h3>
                    <p className="value">{genreData.Description}</p>
                </Col>
            </Row>

        );
    }
}

GenreView.propTypes = {
    genreData: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    })
};
