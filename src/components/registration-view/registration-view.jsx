import React, { useState } from 'react'; //Hook used to add state to function components
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './registration-view.scss';


export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false); //Bootstrap form Validation

    // const handleSubmit = (event) => {  //Bootstrap form Validation  will delete code after call
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     setValidated(true);
    // };

    const handleRegister = (e) => {  // Bootstrap form Validation was inserted here and submitted twice - how can I do this?
        e.preventDefault();
        console.log(username, password);
        axios.post('https://movie-app-001.herokuapp.com/users', {
            Username: username,
            Password: password,
            Birthday: birthday,
            Email: email
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at registration')
            });
    };

    return (
        <Container>
            <Row className="">

                <Form className="registration-form was-validated" noValidate validated={validated} /* onSubmit={handleRegister} */  /* onSubmit={handleSubmit} */  >
                    <Form.Group controlId="formGroupUser" /* hasvalidation="true" */>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            pattern="[a-zA-Z0-9]{5,}" //[a-zA-Z0-9]+ checking if the company name consists out of alphanumeric characters
                            minLength="5"
                            placeholder="Enter Username"
                            // defaultValue="Username"    //when set, the form isn't empty = invalid, but can't be set when value is set
                            // value={username}     //not necessary for targeting, just current input
                            onChange={e => setUsername(e.target.value)} />
                        {/* // onChange={e => setUsername(e.target.value.username)} /> */}
                        <Form.Control.Feedback type="invalid" className="error form-info">
                            Username must have at 5 letters min + alphanumeric.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            required type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="error form-info">
                            Please choose a password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            required type="text"
                            pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                            placeholder="Enter Birthday (YYYY-MM-DD)"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="error form-info">
                            Please enter a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            required type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="error form-info">
                            Please enter a valid emailadress.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className="btn-register" onClick={handleRegister} >Register</Button>
                </Form>
            </Row >

            <Row>
                <Link to={`/login`} className="link-register">
                    {/* <p>No account yet? Register now!</p> */}
                    <Button variant="link" className="">Already registered? Login now!</Button>
                </Link>
            </Row>
        </Container>
    );
}


RegistrationView.propTypes = {
    RegistrationView: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
    handleRegister: PropTypes.func,
};
