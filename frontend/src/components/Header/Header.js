import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Header = ({ setSearch }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useHistory();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        toast.success('Logged Out Successfully');
        history.push('/');
    }
    const [chats, setChats] = useState([]);
    useEffect(() => {
        setChats(chats);
    }, [chats])
    const ChatList=async()=>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat/singleChats`, {}, config);
            setChats(data);
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            console.log(message);
        }
    }
    useEffect(() => {
        ChatList();
    }, [history,userInfo])
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <Navbar expand="lg" bg="warning" sticky='top' variant='dark'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>
                            <img
                                src="/logo.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                // alt="React Bootstrap logo"
                            />{' '}NIT-OLX
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
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form>
                        </Nav>
                        <Nav className=''>
                            <Nav.Link>
                                <Link to='/home'>
                                    HOME
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to='/myads'>
                                    MY-ADS
                                </Link> 
                            </Nav.Link>
                            {/* {"room":"62519ec111b30c5990768e44 621b618377ae8c8924a0d25d","author":"user","message":"hey","time":"4/16/2022, 11:34:01 PM"} */}
                            <NavDropdown title="Chats" id="basic-nav-dropdown">
                                {chats?.map((chat)=>{
                                    const user1=chat.room_id.split(" ")[0];
                                    const user2 = chat.room_id.split(" ")[1];
                                    const user=(userInfo._id===user1?user2:user1);
                                    let message=chat.messages.pop();
                                    let in1=message?.indexOf('author');
                                    let in2 = message?.indexOf('message');
                                    let in3 = message?.indexOf('time');
                                    const author=message?.substring(in1+9,in2-3);
                                    const msg = message?.substring(in2+10, in3- 3);
                                    {/* message=JSON.stringify(message); */}
                                    {/* const author = message[1];
                                    const msg = (message[2].substr(0,10)); */}
                                    {/* console.log(message); */}
                                    return(
                                        <NavDropdown.Item href={`/chat/${user}`}>
                                        <h4>
                                            {author}{': '}{msg?.substr(0,10)}
                                        </h4>
                                        </NavDropdown.Item>    
                                    );
                                })}
                                    <NavDropdown.Divider />
                            </NavDropdown>
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
