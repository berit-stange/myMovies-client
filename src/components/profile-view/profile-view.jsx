import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions'; //importing the actions
import { setMovies } from '../../actions/actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieCardFavs } from '../movie-card-favs/movie-card-favs';
import './profile-view.scss';


class ProfileView extends React.Component {
    constructor() {
        super(); //initializes component’s state
        // this.state = {
        //     username: '',
        //     password: '',
        //     birthday: '',
        //     email: '',
        //     favoriteMovies: []
        // }
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
        // console.log('before');
        e.preventDefault();
        // console.log('after');
        alert('Are you sure?');
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
        // const { username, password, birthday, email } = this.state; //before redux
        const { user } = this.props;
        axios.put(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}`
            ,
            { //this.props.setUser
                // Username: username,
                // Password: password,
                // Birthday: birthday,
                // Email: email
                Username: user.username,
                Password: user.password,
                Birthday: user.birthday,
                Email: user.email
                // Username: user.Username, // from LoginView
                // Password: user.Password,
                // Birthday: user.Birthday,
                // Email: user.Email
            }
            ,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                // const data = response.data;
                // console.log(data);
                console.log('Updated!');
                // alert('Updated!');
                // window.open('/', '_self'); //self: page will open in the current tab
                localStorage.setItem('user', data.Username);
            })
            .catch(e => {
                console.log('ProfileView - handleUpdate - error at update')
            });
    }

    getUserData(token) { //like in MainView, but with more data 
        // console.log(token);
        // const { user } = this.props;
        axios.get(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response, '!userdata response - ProfileView');
                // this.setState({ // Assign the result to the state > access via this.state. .... later
                //     username: response.data.Username, //!!!!
                //     password: response.data.Password,
                //     birthday: response.data.Birthday,
                //     email: response.data.Email,
                //     favoriteMovies: response.data.FavoriteMovies
                // });
                // this.props.setUser(response.data);
                this.props.setUser({
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favoriteMovies: response.data.FavoriteMovies
                })
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
        const { movieData, onBackClick, user } = this.props; //extracting the props
        const { username, email, favoriteMovies } = this.props; //object destructuring 
        // console.log(favoriteMovies);
        // const favoriteMovieList = movieData.filter(m => user.favoriteMovies.includes(m._id));

        return (
            <Container>
                <Row className="profile-row">
                    <Col /* sm={12} md={4} */ className="profil">
                        <Button className="material-icons round btn-full" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>
                    </Col>
                    <Col>
                        <h2 className="director-name">Hello {user.username}!</h2> {/* from this.props */}
                    </Col>
                </Row>

                {/* <Container>
                    <h3 className="value genre-name">These are your favorite movies:</h3>
                    <Row>
                        {favoriteMovieList.map((movie) => {
                            return (
                                <Col sm={4} md={4} lg={3} key={movie._id}>
                                    <MovieCard movieData={movie} />
                                    <Button className="material-icons round" onClick={() => this.deleteFavorite(movie)}><span>remove</span></Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Container> */}

                <Row className="profile-row">
                    <Form ref={this.form}>
                        <Form.Group controlId="formGroupUser">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                pattern="[a-zA-Z0-9]{5,}"
                                title="*min. 5 letters, alphanumeric"
                                // value={username}
                                // onChange={e => this.setState({ username: e.target.value })} //before redux
                                onChange={e => this.props.setUser({ ...user, username: e.target.value })} // from LoginView
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter old password or a new one"
                                // value={password} //shows value from DB: shows the hashed password and could submit this too!
                                // onChange={e => this.setState({ password: e.target.value })} // before redux
                                onChange={e => this.props.setUser({ ...user, password: e.target.value })} //what is this syntax???
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="YYYY-MM-DD"
                                // value={birthday} // shows value from DB: when used it shows the transformed data format!
                                pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
                                // onChange={e => this.setState({ birthday: e.target.value })} // before redux
                                onChange={e => this.props.setUser({ ...user, birthday: e.target.value })} //what is this syntax???
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                // value={email}
                                // onChange={e => this.setState({ email: e.target.value })} // before redux
                                onChange={e => this.props.setUser({ ...user, email: e.target.value })} //what is this syntax???
                            />
                        </Form.Group>

                        <Button type="submit" className="btn-update" onClick={event => this.handleUpdate(event)}>Update</Button>
                    </Form>
                </Row>

                <Row className="delete-row">
                    <Button type="submit" onClick={event => this.handleDelete(event)}>DELETE {localStorage.getItem('user')} {/* {username} */}</Button>
                </Row>

            </Container >
        );
    }
}

// ProfileView.propTypes = {
//     ProfileView: PropTypes.shape({
//         username: PropTypes.string.isRequired,
//         password: PropTypes.string.isRequired,
//         birthday: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired
//     }),
//     onBackClick: PropTypes.func.isRequired,

// handleUpdate: PropTypes.func.isRequired,   // props transmit data between components
// deleteFavorite: PropTypes.func.isRequired, // these are only used inside this one
// handleDelete: PropTypes.func.isRequired
// };

// #7 new    
// let mapStateToProps = state => {
//     return { user: state.user }
// }
let mapStateToProps = state => {
    const { user, movies } = state;
    return {
        movies: state.movies,
        user: state.user
    }
}

const mapDispatchToProps = state => {  // write to the store 
    const { user, movies } = state;
    return { user, movies };
}

// #8 new
export default connect(mapStateToProps, { /* setMovies, */ setUser })(ProfileView);