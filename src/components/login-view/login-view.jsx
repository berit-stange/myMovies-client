import React, { useState } from 'react'; //Hook used to add state to function components
import PropTypes from 'prop-types';
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
        console.log(username, password);
        props.onLoggedIn(username);// send request to server for authentication, then call props.onLoggedIn(username)
    };

    return (

        <div>
            <Navbar className="page-header">
                <Nav.Item>
                    <Nav.Link href="#" className="logo">
                        myMovies
                        </Nav.Link>
                </Nav.Item>
            </Navbar>
            <Row className="login">
                <Form className="login-view">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={username} onChange={e => setUsername(e.target.value)} />
                        {/* <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br /> */}
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
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
