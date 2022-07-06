import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./NavBar.css"

export default function NavBar() {

    return (
        <Navbar bg={'light'} variant={'light'} expand={'md'}>
                <Navbar.Brand className={'mx-5'}>Recipes</Navbar.Brand>
                <Navbar.Toggle className={'mx-5'} aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id={'nav-bar'}>
                        <Nav.Link className={'nav-link'}><Link to={'/'}>Dashboard</Link></Nav.Link>
                        <Nav.Link className={'nav-link'}><Link to={'/add'}>Add</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}