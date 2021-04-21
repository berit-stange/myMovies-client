import React, { useState } from 'react'; //Hook used to add state to function components
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);// send request to server for authentication, then call props.onLoggedIn(username)
    };

    return (
        <form>
            <label>Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />

            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />

            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};
