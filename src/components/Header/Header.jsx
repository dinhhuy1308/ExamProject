import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { deleteKey, getLocalStorage } from '../../utils/LocalStorage';
// import { ACCESS_TOKEN } from '../../contants';

const Header = () => {
    const account = useSelector(state => state.userReducer.account);
    // const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('login');
    }

    const handleRegister = () => {
        navigate('register');
    }

    const handleLogout = () => {
        navigate('login');
        deleteKey('accessToken');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#eee', padding: '20px' }}>
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
                        {/* {!isAuthenticated ? ( */}
                        {getLocalStorage(account.ACCESS_TOKEN) ? (
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </>
                        ) : (
                            <div className='d-flex align-items-center'>
                                <div className='mx-3 '>Xin chào: <strong style={{textTransform: 'uppercase'}}> {account.username}</strong></div>
                                <NavDropdown title='Settings' id='basic-nav-dropdown'>
                                    <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        )
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;