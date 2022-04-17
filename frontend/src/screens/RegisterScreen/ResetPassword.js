
import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const ResetPassword = ({ history }) => {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);
    const token=useParams().token;
    const submitHandler = async (e) => {
        try{
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password Dont Match");
        }
        else {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const { data } = await axios.post(`/api/users/set-new-password`, { password,token },config);
            setMessage(data?.message);
            setShow(true);
        }
    }
    catch(err){
        console.log(err);
    }
}
    return (
        <MainScreen title="Reset Password">
        {!show?(
            <>
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        placeholder="ConfirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </>
        ):(
            <>
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            <Link to='/login'>
                <Button variant="primary" type="submit">
                    Login Here
                </Button>
            </Link>
            </>
        )
        }
        </MainScreen>
    )
}

export default ResetPassword
