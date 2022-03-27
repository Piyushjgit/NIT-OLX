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

const LoginScreen = ({history}) => {
    const [email, setEmail] = useState();
    const [password, serPassword] = useState();

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    useEffect(() => {
        if(userInfo)
        {
            console.log(userInfo);
            history.push('/mynotes');
        }
    }, [history,userInfo])
    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
        // console.log(email,password);
      
    }
    return (
        <MainScreen title="LOGIN">
        {error&&<ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {loading&&<Loading/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={email}
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
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
                    placeholder="passwordword" 
                    onChange={(e) => serPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Row className='py-3'>
                    <Col>
                        Don't have an account ? <Link to='/register'>Register Here</Link>
                    </Col>
                </Row>
            </Form>
        </MainScreen>
    )
}

export default LoginScreen
