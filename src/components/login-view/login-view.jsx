import React from 'react'; //, { useState } before redux > Hook used to add state to function components
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions'; //importing the actions

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './login-view.scss';


function LoginView(props) {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const { user } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username, password);
        // props.onLoggedIn(username);// send request to server for authentication, then call props.onLoggedIn(username)
        axios.post('https://movie-app-001.herokuapp.com/login', { //POST request
            // Username: username, // before redux
            // Password: password
            Username: user.Username, // redux
            Password: user.Password
        })
            .then(response => {
                const data = response.data; //not only username but also token
                props.onLoggedIn(data); //method called through props --- this method triggers the onLoggedIn method of “main-view.jsx”
                // console.log(user.Username);
                window.open('/', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('LoginView - handleSubmit - no such user');
                // alert('LoginView - handleSubmit - no such user');
            });
    };

    return (
        <Container className="login-view">
            <Row >
                <Form className="login was-validated" noValidate /* validated={validated} */>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter email"
                            // value={username}  // before redux
                            // onChange={e => setUsername(e.target.value)} // before redux
                            // value={user.Username}
                            // onChange={e => props.setUser(e.target.value)} // first try
                            onChange={e => props.setUser({ Username: e.target.value })}
                        // value={props.visibilityFilter}  //syntax from VisibilityFilter
                        // onChange={e => props.setFilter(e.target.value)} //syntax from VisibilityFilter
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            // value={password} // before redux
                            // onChange={e => setPassword(e.target.value)} // before redux
                            // value={user.Password}
                            // onChange={e => props.setUser(e.target.value)} // first try
                            onChange={e => props.setUser({ ...user, Password: e.target.value })} //Spread-Operator: entpackt ein Object in einem anderen
                        // onChange={e => props.setUser({ Password: e.target.value })} // why does this not work? like for Username?
                        />
                    </Form.Group>
                    <Button type="submit" className="btn-login" onClick={handleSubmit}>LOGIN</Button>
                </Form>
            </Row>

            <Row>
                <Link to={`/register`} className="link-register">
                    {/* <p>No account yet? Register now!</p> */}
                    <Button variant="link" className="">No account yet? Register now!</Button>
                </Link>
            </Row>
        </Container>
    );
}

// LoginView.propTypes = {
//     onLoggedIn: PropTypes.shape({
//         username: PropTypes.string.isRequired,
//         password: PropTypes.string.isRequired
//     }).isRequired,
//     onLoggedIn: PropTypes.func.isRequired
// };

// const mapStateToProps = state => {  // read from the store
//     const { user } = state;
//     return { user };
// }
let mapStateToProps = state => {
    const { user, movies } = state;
    return {
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setUser })(LoginView); //connecting to the store