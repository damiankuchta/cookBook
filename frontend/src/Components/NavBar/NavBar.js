import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import "./NavBar.css"

export default function NavBar() {

    return (
        <Navbar bg={'light'} variant={'light'} expand={'md'}>
                <Navbar.Brand className={'mx-5 nav-link-custom'}><Link to={'/'}>Recipes</Link></Navbar.Brand>
                <Navbar.Toggle className={'mx-5'} aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id={'nav-bar'}>
                        <Nav.Link className={'nav-link-custom'}><Link c to={'/add'}>Add</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}