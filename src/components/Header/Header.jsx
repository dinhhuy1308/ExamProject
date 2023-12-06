import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('login');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor: '#eee', padding: '20px'}}>
            <Container>
                <NavLink className='navbar-brand' to="/">Hỏi dân IT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to="/">Home</NavLink>
                        <NavLink className='nav-link' to="users">Users</NavLink>
                        <NavLink className='nav-link' to="admin">Admin</NavLink>
                    </Nav>
                    <Nav>
                        <button className='btn-login' onClick={()=>handleLogin()}>Login</button>
                        <button className='btn-signup'>Sign up</button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Login</NavDropdown.Item>
                            <NavDropdown.Item >Logout</NavDropdown.Item>
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                        </NavDropdown> */}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;