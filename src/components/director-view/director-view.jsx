import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';

import './director-view.scss';

export class DirectorView extends React.Component {

    render() {
        const { directorData, moviesOfDirector, onBackClick } = this.props; //extracting the props

        return (
            <Container>

                {/* <Navbar>
                    <Nav.Item className="logo">
                        myMovies
                            </Nav.Item>
                    <Nav.Item className="page-header">
                        <Button className="page-header__item btn-logout" onClick={() => { this.onLoggedOut() }}>LOG OUT</Button>
                        <Nav.Link href={`/users/${user}`} className="">
                            <Button variant="link" className="page-header__item btn-profile" onClick={() => { this.onLoggedIn() }}>{this.state.user}</Button>
                        </Nav.Link>
                    </Nav.Item>
                </Navbar> */}


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

                <Container>
                    <h2 className="value genre-name">More Movies from {directorData.Name}</h2>
                    <Row>
                        {
                            moviesOfDirector.map((m) => {//loop through movieData (= movies-collection in DB) and use the one that has this Genre Name that we're in
                                if (m.Director.Name === directorData.Name)
                                    return <Col xs={3} sm={4} md={4} lg={3} key={m._id}>
                                        <MovieCard movieData={m} />
                                        {/* when I use MovieCard I have to use this prop name that has been defined in the route for Movie Card? */}
                                        {/* When I display the movie info differently, I can use movieOfDirector? */}
                                        {/* <p className="value">{moviesOfDirector.Title}</p>   */}
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

DirectorView.propTypes = {
    directorData: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
