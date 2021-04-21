import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onRegistration(username);
    };

    return (
        <form>
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />

            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />

            <label>Birthday:</label>
            <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} /><br />

            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} /><br />

            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    );
}


RegistrationView.propTypes = {
    onRegistration: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired,
    onRegistration: PropTypes.func.isRequired
};
