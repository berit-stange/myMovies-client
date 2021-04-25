import React, { useState } from 'react'; //Hook used to add state to function components
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username, password);
        // props.onLoggedIn(username);// send request to server for authentication, then call props.onLoggedIn(username)
        axios.post('https://movie-app-001.herokuapp.com/login', { //POST request
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data; //not only username but also token
                props.onLoggedIn(data); //method called through props --- this method triggers the onLoggedIn method of “main-view.jsx”
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (

        <div>
            <Navbar className="">
                <Nav.Item>
                    <Nav.Link href="#" className="logo">
                        myMovies
                        </Nav.Link>
                </Nav.Item>
            </Navbar>
            <Row className="login">
                <Form className="login-view">
                    <Form.Group controlId="formEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={username} onChange={e => setUsername(e.target.value)} />
                        {/* <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br /> */}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        {/* <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br /> */}
                    </Form.Group>

                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </Row>
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};
