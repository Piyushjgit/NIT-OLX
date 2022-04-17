import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState();
    const [password, serPassword] = useState();

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            toast.success(`Logged In Successfully`);
            history.push('/home');
        }
    }, [history, userInfo])
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    return (
        <MainScreen title="LOGIN">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicpasswordword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => serPassword(e.target.value)}
                    />
                </Form.Group>
                <Link to='/reset'><p className='font-weight-bold ml-1' style={{ color: '#1266F1' }}>Forgot Password ?</p></Link>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Row className='py-3'>
                    <Col>
                        Don't have an account ? <Link to='/register'><span className='font-weight-bold ml-1' style={{ color: '#1266F1' }}>Register Here</span></Link>
                    </Col>
                </Row>
            </Form>
        </MainScreen>
    )
}

export default LoginScreen
