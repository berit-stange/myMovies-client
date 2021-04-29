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
            username: '',
            password: '',
            birthday: '',
            email: '',
            favoriteMovies: '',
            movies: ''
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

    getUserData(token) { //like in MainView, but with more data 
        axios.get('https://movie-app-001.herokuapp.com/users/:Username', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ // Assign the result to the state > access via this.state. .... later
                    username: response.data.Username,
                    password: response.data.Password,
                    birthday: response.data.Birthday,
                    email: response.data.Email,
                    favorites: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getMovies(token) { //from MainView
        axios.get('https://movie-app-001.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ // Assign the result to the state
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) { //from MainView
        axios.get('https://movie-app-001.herokuapp.com/users/:Username', {
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

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')//only getting the login data and token, right?
            });
            // this.getMovies(accessToken);
            this.getUser(accessToken); //calling the functions above + ...
            this.getUserData(accessToken); //mounting all the data that the function "pulled" from DB, access via this.? this.users?
        }
    }

    render() {

        // const { userX, user, users, userData, onBackClick, handleUpdate } = this.state;
        const { movies, userData, setUsername, addMovie, onBackClick, handleUpdate } = this.props; //extracting the props
        const { user, users, favoriteMovies } = this.state;

        return (
            <Container>
                <Row className="register" >

                    <Link to={`/`} className="page-header profile">
                        <Button variant="link" >All Movies</Button>
                    </Link>

                    <Col sm={12} md={4} className="profile">
                        <Button className="material-icons round " onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                    </Col>
                    {/* <h2 className="director-name">Profile of: "{userX.Username}" passed from MainView</h2> */}
                    <h2 className="director-name">"{this.state.user}" - from localStorage, not DB! </h2>
                    {/* <h2 className="director-name">Profile of: "{this.users.Username}" from DB (users)</h2> */}
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

                <Container>
                    {/* <h2 className="value genre-name">More Movies from {directorData.Name}</h2> */}
                    <Row>
                        {/* { //from DirectorView */}
                        {/* movies.map((movie) => {//loop through movieData (= movies-collection in DB) and use the one that has this Genre Name that we're in */}
                        {/* // if (movie.Director.Name === directorData.Name) */}
                        {/* return this.state.favoriteMovies */}
                        {/* // return <Col xs={3} sm={4} md={4} lg={3} key={movie._id}> */}
                        {/* //     <MovieCard movieData={movie} /> */}
                        {/* // </Col> */}
                        {/* // }) */}
                        {/* // } */}

                    </Row>
                </Container>
            </Container>
        );
    }
}