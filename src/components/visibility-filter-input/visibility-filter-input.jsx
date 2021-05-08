import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions'; // ../../ > because I'm in components hand actions is in a higher directory

function VisibilityFilterInput(props) { //function component is basically a wrapper around a React Bootstrap text input
    return <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
    />;
}

export default connect( //connecting to the store
    null,
    { setFilter }
)(VisibilityFilterInput);

// already has visibilityFilter in its props
// because I’ll be passing the same 
// visibilityFilter prop I have in the MoviesList component