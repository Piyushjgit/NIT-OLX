
import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

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
                const { data } = await axios.post(`/api/users/reset-password`, { email },config);
                setMessage(data.message);
        }
        catch (err) {
            setMessage(err?.message);
        }
    }
    return (
        <MainScreen title="Reset Password">
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </MainScreen>
    )
}

export default ResetPage
