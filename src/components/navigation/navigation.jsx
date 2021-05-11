import React from "react";
import { useState } from 'react';

import { connect } from 'react-redux'; //importing the actions
import { setUser } from '../../actions/actions';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './navigation.scss'
import { Link } from "react-router-dom";


function Navigation(props) {
    const { token, logOut } = props; //passed through MainView

    return (
        <Navbar expand="md"> {
            token ? ( // use 'token' to show the logged out navigation
                <>
                    <Navbar.Brand href="/" className="logo">myMovies</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle" >III</Navbar.Toggle>
                    <Navbar.Collapse className="page-header">
                        {/* <Nav className="page-header"> */}
                        <Nav.Link>
                            <Button className="page-header__item btn-logout" onClick={() => { logOut() }}>LOG OUT</Button>
                        </Nav.Link>
                        <Nav.Link href={`/users/${localStorage.getItem('user')}`} >
                            <Button variant="link" className="page-header__item" onClick={() => { this.onLoggedIn(); }}>PROFILE</Button>
                        </Nav.Link>
                        <Nav.Link href="/" className="x">
                            <Button variant="link" >All Movies</Button>
                        </Nav.Link>
                        {/* </Nav> */}
                    </Navbar.Collapse>
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

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps)(Navigation);