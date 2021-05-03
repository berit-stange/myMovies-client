import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';


export class ProfileView extends React.Component {
    constructor() {
        super(); //initializes component’s state
        this.state = {
            username: '',
            password: '',
            birthday: '',
            email: '',
            favoriteMovies: []
        };
        this.form = React.createRef(); //grabbing the forms reference //react form validation
        this.validate = this.validate.bind(this);
    }

    validate() { //creates the validate method
        this.form.current.reportValidity();
    }

    deleteFavorite(movie) {
        axios.delete(`https://movie-app-001.herokuapp.com/users/${this.state.username}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                console.log('Deleted!');
                window.open('/users/${this.state.username}', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at deleteFavorite');
            });
    }

    handleDelete(e) {
        console.log('before');
        e.preventDefault();
        console.log('after');
        const { username, password, birthday, email } = this.state;
        axios.delete(`https://movie-app-001.herokuapp.com/users/${this.state.username}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                // const data = response.data;
                // console.log(data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.setState({
                    user: null
                });
                console.log('Deleted!');
                window.open('/', '_self'); //self: page will open in the current tab
                // localStorage.setItem('user', data.Username);
            })
            .catch(e => {
                console.log('error at delete user')
            });
    }

    handleUpdate(e) {
        // console.log('before');
        e.preventDefault();
        // console.log('after');
        this.validate();
        const { username, password, birthday, email } = this.state;
        axios.put(`https://movie-app-001.herokuapp.com/users/${this.state.username}`, {
            Username: username,
            Password: password,
            Birthday: birthday,
            Email: email
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                console.log('Updated!');
                alert('Updated!');
                // window.open('/', '_self'); //self: page will open in the current tab
                localStorage.setItem('user', data.Username);
            })
            .catch(e => {
                console.log('error at registration')
            });
    }

    getUserData(token) { //like in MainView, but with more data 
        // console.log(token);
        axios.get(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // console.log(response, '!userdata response');
                this.setState({ // Assign the result to the state > access via this.state. .... later
                    username: response.data.Username, //!!!!
                    password: response.data.Password,
                    birthday: response.data.Birthday,
                    email: response.data.Email,
                    favoriteMovies: response.data.FavoriteMovies
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
            this.getUserData(accessToken); //calling the functions above + mounting all the data that the function "pulled" from DB, access via this.? this.users?
        }
    }

    render() {

        // console.log(this.props, 'props');
        const { movieData, onBackClick } = this.props; //extracting the props
        const { username, email, favoriteMovies } = this.state; //object destructuring 
        // console.log(favoriteMovies);
        const favoriteMovieList = movieData.filter(m => favoriteMovies.includes(m._id));

        return (
            <Container>
                <Row className="profile-row" >

                    <Link to={`/`} className="page-header profile">
                        <Button variant="link" >All Movies</Button>
                    </Link>

                    <Col sm={12} md={4} className="profile">
                        <Button className="material-icons round " onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                    </Col>
                    <h2 className="director-name">Hello {username}!</h2> {/* from localStorage, not DB! */}

                    <Form className="registration-view" ref={this.form}>
                        <Form.Group controlId="formGroupUser">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                pattern="[a-zA-Z0-9]{5,}"
                                title="*min. 5 letters, alphanumeric"
                                value={username}
                                // defaultValue="Ernie"
                                onChange={e => this.setState({ username: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter old password or a new one"
                                // value={password} //shows value from DB: shows the hashed password and could submit this too!
                                onChange={e => this.setState({ password: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formGroupBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YYYY-MM-DD"
                                // value={birthday} // shows value from DB: when used it shows the transformed data format!
                                pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                onChange={e => this.setState({ birthday: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={e => this.setState({ email: e.target.value })} />
                        </Form.Group>

                        <Button type="submit" onClick={event => this.handleUpdate(event)}>Update</Button>
                        <Button type="submit" className="btn-delete" onClick={event => this.handleDelete(event)}>DELETE {localStorage.getItem('user')} {/* {username} */}</Button>
                    </Form>
                </Row>

                <Container>
                    <h2 className="value genre-name">These are your favorite movies:</h2>
                    <Row>
                        {favoriteMovieList.map((movie) => {
                            return (
                                <Col /* xs={12} */ sm={6} md={4} lg={3} key={movie._id}>
                                    <MovieCard movieData={movie} />
                                    <Button className="btn-delete" onClick={() => this.deleteFavorite(movie)}>DELETE</Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </Container >
        );
    }
}

ProfileView.propTypes = {
    ProfileView: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func.isRequired,
    // handleUpdate: PropTypes.func.isRequired,   // props transmit data between components
    // deleteFavorite: PropTypes.func.isRequired, // these are only used inside this one
    // handleDelete: PropTypes.func.isRequired
};