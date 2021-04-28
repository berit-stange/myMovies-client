import React, { useState } from 'react'; //Hook used to add state to function components
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
            username: ''
            // selectedMovie: null, //tells the application that no movie cards were clicked
            // registration: null,
            // user: null,
            // users: []
        };
    }

    // handleUpdate = (e) => {
    handleUpdate(e) {
        const [username, setUsername] = useState('');
        e.preventDefault();
        console.log(username, password);
        // props.onRegistration(username);
        axios.put('https://movie-app-001.herokuapp.com/users/:Username', {
            Username: username,
            Password: password,
            Birthday: birthday,
            Email: email
        })
            .then(response => {
                // const data = response.data;
                // console.log(data);
                console.log('Updated!');
                // window.open('/', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at registration')
            });
    };

    // setUsername(u) { //When x is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
    //     this.setState({
    //         Username: username
    //     });
    // }

    render() {

        const { users, userData, movieData, addMovie, onBackClick, handleUpdate } = this.props; //extracting the props
        // const { setUsername } = useState('');
        // const [username, setUsername] = useState('');
        // const [password, setPassword] = useState('');
        // const [birthday, setBirthday] = useState('');
        // const [email, setEmail] = useState('');

        return (
            <Container>
                <Row className="register" >

                    <Link to={`/`} className="page-header">
                        <Button variant="link" >All Movies</Button>
                    </Link>
                    <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                    {/* <Button className="material-icons round" onClick={() => { onBackClick={() => history.goBack(); }} ><span>arrow_back</span></Button> */}

                    {/* <h2 className="director-name">Profile of: . . .  {userData.Username} </h2> */}
                    <h2 className="director-name">Profile of: . . .  {this.Username} </h2>
                    {/* <h2 className="director-name">Profile of: . . .  {users.username} </h2> */}
                    <Form className="registration-view">
                        <Form.Group controlId="formGroupUser">
                            <Form.Label>Username:</Form.Label>
                            {/* <Form.Control type="text" placeholder="Enter Username" value={this.Username} onChange={e => setUsername(e.target.value)} /> */}
                            <Form.Control type="text" placeholder="Enter Username" value={this.Username} onChange={e => { setUsername(e.target.value); }} />
                            {/* <LoginView onLoggedIn={user => this.onLoggedIn(user)} /> */}
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" /* value={password} */ onChange={e => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type="" placeholder="Enter Birthday" /* value={birthday} */ onChange={e => setBirthday(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" /* value={email} */ onChange={e => setEmail(e.target.value)} />
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