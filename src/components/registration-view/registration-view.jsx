import React, { useState } from 'react'; //Hook used to add state to function components
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/Form';
// import FormCheckInput from './FormCheckInput';
import Button from 'react-bootstrap/Button'
import './registration-view.scss';


export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false); //Bootstrap form Validation

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     setValidated(true);
    // };

    const handleRegister = (e) => {
        const form = e.currentTarget; //Bootstrap form Validation
        if (form.checkValidity() === false) { //Bootstrap form Validation
            e.preventDefault();
            console.log('wrong data');
            e.stopPropagation(); //Bootstrap form Validation
        }
        setValidated(true);//Bootstrap form Validation
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
                // window.open('/', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at registration')
            });
    };

    return (
        <div>
            <Row className="register">

                <Form className="registration-view" noValidate validated={validated} onSubmit={handleRegister} /* onSubmit={handleRegister} */  >
                    <Form.Group controlId="formGroupUser" hasvalidation="true">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            required type="text"
                            pattern="[a-zA-Z]" //[a-zA-Z0-9]
                            minLength="5"
                            placeholder="min. 5 letters, alphanumeric"
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                        {/* <Form.Text className="form-info">
                            *min. 5 letters, alphanumeric
                        </Form.Text> */}
                        <Form.Control.Feedback type="invalid" className="error">
                            Please choose a valid username.
                         </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            required type="password" placeholder="Enter Password" value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="error">
                            Please choose a password.
                         </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            required type="text" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="Enter Birthday (YYYY-MM-DD)" value={birthday}
                            onChange={e => setBirthday(e.target.value)} />
                        {/* <Form.Text className="form-info">
                            *YYYY-MM-DD
                        </Form.Text> */}
                        <Form.Control.Feedback type="invalid" className="error">
                            Please enter a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            required type="email" placeholder="Enter Email" value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <Form.Control.Feedback type="invalid" className="error">
                            Please enter a valid emailadress.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" onClick={handleRegister} >Register</Button>
                </Form>
            </Row >
        </div >
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
