import React from 'react';
//   , { useState }    Hook used to add state to function components
//this is now a class component!!!
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super(); //initializes component’s state
        this.state = {
            // username: useState(''), //error: invalid hook
            username: '',
            password: '',
            birthday: '',
            email: ''
        };
    }


    handleUpdate(e) {
        e.preventDefault();
        // console.log(username, password);
        axios.put('https://movie-app-001.herokuapp.com/users/:Username', {
            Username: username,
            Password: password,
            Birthday: birthday,
            Email: email
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                console.log('Updated!');
                // window.open('/', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at registration')
            });
    }


    showFavorites(token) { // = getMovies
        axios.get('https://movie-app-001.herokuapp.com/users/${userData.Username}', {
            // axios.get('https://movie-app-001.herokuapp.com/users/:Username', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ // Assign the result to the state
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        const { userX, user, users, userData, onBackClick, handleUpdate } = this.state;
        // const { users, userData, movieData, addMovie, onBackClick, handleUpdate } = this.props; //extracting the props
        // const [username, setUsername] = useState('');

        return (
            <Container>
                <Row className="register" >

                    <Link to={`/`} className="page-header">
                        <Button variant="link" >All Movies</Button>
                    </Link>
                    <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                    {/* <Button className="material-icons round" onClick={() => { onBackClick={() => history.goBack(); }} ><span>arrow_back</span></Button> */}

                    {/* <h2 className="director-name">Profile of: . . .  {userX.Username} </h2> */}
                    {/* <h2 className="director-name">Profile of: . . .  {this.state.Username} </h2> */}
                    {/* <h2 className="director-name">Profile of: . . .  {users.Username} </h2> */}
                    <Form className="registration-view">
                        <Form.Group controlId="formGroupUser">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter Username"
                                // defaultValue="Ernie"
                                // defaultValue={user.Username}
                                // value={this.Username}
                                onChange={e => setUsername(e.target.value)} />
                            {/* <Form.Control type="text" placeholder="Enter Username" value={this.Username} onChange={setUsername} /> */}
                            {/* <Form.Control type="text" placeholder="Enter Username" value={this.Username} onChange={e => { setUsername(e.target.value); }} /> */}
                            {/* <LoginView onLoggedIn={user => this.onLoggedIn(user)} /> */}
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                /* value={password} */
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type=""
                                placeholder="Enter Birthday"
                                /* value={birthday} */
                                onChange={e => setBirthday(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email"
                                placeholder="Enter Email"
                                /* value={email} */
                                onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Button type="submit" onClick={handleUpdate}>Update</Button>
                    </Form>
                </Row>
                <Row>

                </Row>
            </Container>
        );
    }
}