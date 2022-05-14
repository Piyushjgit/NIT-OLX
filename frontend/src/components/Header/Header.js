import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Popover, OverlayTrigger } from "react-bootstrap";
import { Link, useHistory,NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logopic from './logo1.png'
const Header = ({ setSearch }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useHistory();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        toast.success('Logged Out Successfully');
        history.push('/login2');
    }
    const [selectedkey, setSelectedkey] = useState();
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <Navbar expand="lg" bg="warning" sticky='top' variant='dark' style={{bgColor:'#24292F'}}>
                <Container>
                    <Navbar.Brand>
                        <Link to='/home'>
                            <img
                                src={logopic}
                                maxWidth='180'
                                height='45'
                                className="d-inline-block align-top"
                                style={{ filter: 'invert(80)'}}
                            // alt="React Bootstrap logo"
                            />
                            {/* {' '}NIT-OLX */}
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" data-toggle="collapse" data-target="#navbar-collapse">
                        <Nav className="m-auto">
                            <Form className="d-flex">
                                <FormControl
                                    type="text"
                                    placeholder="Search a product here ... Phone Cycle ..."
                                    className="mr-sm-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{width:'40vw'}}
                                />
                            </Form>
                        </Nav>
                        {console.log(selectedkey)}
                        <Nav onSelect={(key) => setSelectedkey(key)}>
                            <Nav.Link>
                                <Link to='/home' activeStyle={{color:'red'}}>
                                    HOME
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/myads'>
                                    MY-ADS
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/myBuys'>
                                    MY-BUYS
                                </Link>
                            </Nav.Link>
                            <NavDropdown title={`${userInfo.name}`} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
