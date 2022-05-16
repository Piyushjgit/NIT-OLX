import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import pic1 from '../LoginScreen/img/logo.svg';
import pic2 from '../LoginScreen/img/register.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = ({ history }) => {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const token = useParams().token;
    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            if (password !== confirmPassword) {
                toast.warning("Password Dont Match");
            }
            else {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                };
                const { data } = await axios.post(`/api/users/set-new-password`, { password, token }, config);
                toast.success("Password Changed Successfully , Please Login Again");
                setShow(true);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err?.Error);
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            {!show ? (
                <div className="container2">
                    <div className="forms-container2">
                        <div className="signin-signup2">
                            <form className="sign-in-form2" onSubmit={submitHandler}>
                                {/* {loading && <Loading />} */}
                                <h2 className="title2">Reset Password</h2>
                                <div className="input-field2">
                                    <i className="fas fa-user"></i>
                                    <input type="password"
                                        value={password}
                                        placeholder="password"
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="input-field2">
                                    <i className="fas fa-user"></i>
                                    <input type="password"
                                        value={confirmPassword}
                                        placeholder="ConfirmPassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <input type="submit" value="Submit" className="btn2 solid2" />
                            </form>
                        </div>
                    </div>
                    <div className="panels-container2">
                        <div className="panel2 left-panel2">
                            <div className="content2">
                                <h3>New here ?</h3>
                                <p>
                                    Welcome to NIT-OLX &nbsp; Please <bold> Sign Up </bold> to buy and sell products
                </p>
                                <button className="btn2 transparent2" id="sign-up-btn">
                                    <Link to="/register2">
                                        Sign up
              </Link>
                                </button>
                            </div>
                            <img src={pic1} className="image2" alt="" />
                        </div>
                    </div>
                </div>


            ) : (
                    <>
                        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                            <Row>
                                <Col style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <h1>Password Changed Successfully, Login Again</h1>
                                    <Link to='/login2'>
                                        <Button variant="primary" type="submit">
                                            Login Here
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            }
        </>
            )
}

export default ResetPassword
