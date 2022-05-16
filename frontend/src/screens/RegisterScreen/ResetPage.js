
import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import pic1 from '../LoginScreen/img/logo.svg';
import pic2 from '../LoginScreen/img/register.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPage = ({ history }) => {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState(null);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const { data } = await axios.post(`/api/users/reset-password`, { email }, config);
            toast.success(`Reset link sent to your email`);
            // setMessage(data.message);
        }
        catch (err) {
            // setMessage(err?.message);
            toast.error(err?.message);
        }
    }
    return (
        // <MainScreen title="Reset Password">
        //     {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        //     <Form onSubmit={submitHandler}>
        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control
        //                 type="email"
        //                 value={email}
        //                 placeholder="Enter email"
        //                 onChange={(e) => setEmail(e.target.value)} />
        //             <Form.Text className="text-muted">
        //                 We'll never share your email with anyone else.
        //             </Form.Text>
        //         </Form.Group>
        //         <Button variant="primary" type="submit">
        //             Submit
        //         </Button>
        //     </Form>
        // </MainScreen>
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <div className="container2">
                <div className="forms-container2">
                    <div className="signin-signup2">
                        <form className="sign-in-form2" onSubmit={submitHandler}>
                            {/* {loading && <Loading />} */}
                            <h2 className="title2">Reset Password</h2>
                            <div className="input-field2">
                                <i className="fas fa-user"></i>
                                <input type="email" value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <input type="submit" value="Get Link" className="btn2 solid2" />
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
                </div>            </div>
        </>
    )
}

export default ResetPage
