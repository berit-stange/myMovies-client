import React, { useState } from 'react'; //Hook used to add state to function components
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import './profile-view.scss';


export function ProfileView(props) {

    // const { users, onBackClick } = this.props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // props.onRegistration(username);
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

        <Row className="register" >

            <Button className="material-icons round" onClick={() => { onBackClick(null); }} ><span>arrow_back</span></Button>

            <h2 className="director-name">Profile of: . . .  {/* {user.Username}  */} </h2>
            <Form className="registration-view">
                <Form.Group controlId="formGroupUser">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" /* value={username} */ onChange={e => setUsername(e.target.value)} />
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

                {/* <Button type="submit" onClick={handleUpdate}>Update</Button> */}
            </Form>

            <h2 className="director-name">My Movie Collection:</h2>





        </Row >

    );

}


// ProfileView.propTypes = {
// ProfileView: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//     }),
//     handleUpdate: PropTypes.func,
// };
