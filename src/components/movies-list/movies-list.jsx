import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => { //function extracts visibilityFilter into a prop named visibilityFilter
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;
    // let filteredMovies = movieData;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
        // filteredMovies = movieData.filter(m => m.Tilte.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <Col md={12} style={{ margin: '1em' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>

        {filteredMovies.map(m => (
            <Col md={3} key={m._id}>
                <MovieCard movieData={m} />
            </Col>
        ))}
    </>;

    // return filteredMovies.map(m => (
    //     <Col md={3} key={m._id}>
    //         <MovieCard movieData={m} />
    //     </Col>
    // ));
}

//connected to the store using connect()
//uses only one argument: mapStateToProps  >>> function that converts/transforms the store into props that MoviesList component will use
// the second (actions to bind) is implicitly null
export default connect(mapStateToProps)(MoviesList);