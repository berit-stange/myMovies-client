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
        // this.state = {        // before redux
        //     username: '',
        //     password: '',
        //     birthday: '',
        //     email: '',
        //     favoriteMovies: []
        // }
    }

    deleteFavorite(movie) {
        axios.delete(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                console.log('Deleted!');
                window.open(`/users/${localStorage.getItem('user')}`, '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at deleteFavorite');
            });
    }

    handleDelete(e) {
        e.preventDefault();
        alert('Are you sure?');
        axios.delete(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // this.setState({  //before redux
                //     user: null
                // });
                this.props.setUser({ user: null });
                console.log('Deleted!');
                window.open('/', '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('error at delete user')
            });
    }

    handleUpdate(e) {
        e.preventDefault();
        // const { username, password, birthday, email } = this.state; //before redux
        const { user } = this.props;
        axios.put(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}`, {
            Username: user.username, // like LoginView
            Password: user.password,
            Birthday: user.birthday,
            Email: user.email
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                console.log('Updated!');
                // localStorage.setItem('user', data.username); // before redux
                localStorage.setItem('user', user.username);
                window.open(`/users/${localStorage.getItem('user')}`, '_self'); //self: page will open in the current tab
            })
            .catch(e => {
                console.log('ProfileView - handleUpdate - error at update')
            });
    }

    getUserData(token) {
        // console.log(token);
        // const { user } = this.props;  // before redux
        axios.get(`https://movie-app-001.herokuapp.com/users/${localStorage.getItem('user')}`, {
            // headers: { Authorization: `Bearer ${token}` }
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                const data = response.data;
                console.log(response, '!userdata response - ProfileView');
                // this.setState({ // before redux // Assign the result to the state > access via this.state
                //     username: response.data.Username, //!!!!
                //     password: response.data.Password,
                //     birthday: response.data.Birthday,
                //     email: response.data.Email,
                //     favoriteMovies: response.data.FavoriteMovies
                // });
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
        console.log('componentDidMount 1');
        if (accessToken !== null) {
            // this.setState({
            //     user: localStorage.getItem('user')//only getting the login data and token, right?
            // });
            this.props.setUser({
                user: localStorage.getItem('user'),
                accessToken: localStorage.getItem('token')
            })
            this.getUserData(accessToken); //calling the functions above + mounting all the data that the function "pulled" from DB, access via this.? this.users?
        }
        console.log('componentDidMount 2');
    }

    render() {

        const { movieData, onBackClick, user } = this.props; //extracting the props
        console.log(user.favoriteMovies);
        const favoriteMovieList = movieData.filter(m => user.favoriteMovies.includes(m._id)); // sometimes errors at rendering, ok after refresh page

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

                <Container>
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
                </Container>

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
                                onChange={e => this.props.setUser({ ...user, username: e.target.value })} //Spread-Operator: entpackt ein Object in einem anderen
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter old password or a new one"
                                // value={password} //shows value from DB: shows the hashed password and could submit this too!
                                // onChange={e => this.setState({ password: e.target.value })} // before redux
                                onChange={e => this.props.setUser({ ...user, password: e.target.value })} //Spread-Operator
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
                                onChange={e => this.props.setUser({ ...user, birthday: e.target.value })} //Spread-Operator
                            />
                        </Form.Group>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                // value={email}
                                // onChange={e => this.setState({ email: e.target.value })} // before redux
                                onChange={e => this.props.setUser({ ...user, email: e.target.value })} //Spread-Operator
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

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        birthday: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};

// #7 new    
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
export default connect(mapStateToProps, { setUser })(ProfileView);