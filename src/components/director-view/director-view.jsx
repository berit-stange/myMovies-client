import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './director-view.scss';

export class DirectorView extends React.Component {

    render() {
        const { directorData, onBackClick } = this.props; //extracting the props

        return (
            <Row className="director-view">
                <Col sm={12} md={4}>
                    <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                </Col>

                <Col sm={12} md={8}>
                    <h2 className="director-name">{directorData.Name}</h2>
                    <h3 className="director-bio">Bio: </h3>
                    <p>{directorData.Bio}</p>
                </Col>
            </Row>
        );
    }
}

DirectorView.propTypes = {
    directorData: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    })
};
