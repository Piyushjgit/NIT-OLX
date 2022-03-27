import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';

const Header = ({setSearch}) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history=useHistory();
    const dispatch = useDispatch();
    // const userLogin = useSelector(state => state.userLogin);
    // const {userInfo } = userLogin;
        const logoutHandler=()=>{
            dispatch(logout());
                history.push('/');
    }
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
                <Navbar.Brand>
                    <Link to='/'>
                        NIT-OLX
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Form className="d-flex">
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            aria-label="Search"
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                    </Form>
                </Nav>
                    <Nav>
                        <Nav.Link>
                            <Link to='/myads'>
                                My Ads
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
    )
}

export default Header
