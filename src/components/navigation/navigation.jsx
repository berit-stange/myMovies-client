import React from "react";
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './navigation.scss'
import { Link } from "react-router-dom";


export function Navigation({ user, logOut }) {

    // const { user } = useState('');

    // const handleSubmit = (event) => {  //Bootstrap form Validation  will delete code after call
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     setValidated(true);
    // };

    return (
        <Navbar> {
            user ? (
                <>
                    <Nav.Link href='/' className="logo">
                        myMovies
                    </Nav.Link>

                    <Nav.Item className="page-header">

                        <Button className="page-header__item btn-logout" onClick={() => { logOut() }}>LOG OUT</Button>

                        <Nav.Link href={`/users/${user}`} >
                            <Button variant="link" className="page-header__item" onClick={() => { this.onLoggedIn(); }}>PROFILE</Button>
                        </Nav.Link>

                        <Nav.Link href="/" className="x">
                            <Button variant="link" >All Movies</Button>
                        </Nav.Link>

                    </Nav.Item>
                </>
            ) : (
                <>
                    <Nav.Item className="logo">
                        myMovie
                    </Nav.Item>
                </>
            )}
        </Navbar>
    )
}