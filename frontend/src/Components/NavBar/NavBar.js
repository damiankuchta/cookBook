import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function NavBar() {

    return (
        <Navbar bg={'light'} variant={'light'}>
                <Navbar.Brand className={'mx-5'}>Recipes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link><Link to={'/'}>Dashboard</Link></Nav.Link>
                        <Nav.Link><Link to={'/add'}>Add</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}