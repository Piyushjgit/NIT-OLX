
import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useEffect } from 'react'
import { Register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterScreen = ({ history }) => {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const [wait, setWait] = useState(false);
    useEffect(() => {
        if (userInfo) {
            history.push('/home');
        }
    }, [history, userInfo])
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== ConfirmPassword) {
            setMessage("Password Dont Match");
        }
        else {
            if (!pic) {
                return setPicMessage("Please Select a Picture");
            }
            setPicMessage(null);
            if (pic.type === "image/jpeg" || pic.type === "image/png") {
                const data = new FormData();
                data.append("file", pic);
                data.append("upload_preset", "NotesApp");
                data.append("cloud_name", "pdpcn");
                fetch("https://api.cloudinary.com/v1_1/pdpcn/image/upload", {
                    method: "post",
                    body: data,
                }).then((res) => res.json())
                    .then((dataa) => {
                        // setPic(dataa.url);
                        console.log(dataa);
                        dispatch(Register(name, email, password, { url: dataa.url, deleteId: dataa.public_id }));
                        setTimeout(() => {
                            setWait(true);
                        },1500);
                        setWait(false);
                        toast.success(`Account Created Successfully !`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                return setPicMessage("Please Select an Image");
            }
        }
    }
    return (
        <MainScreen title="REGISTER">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            {wait && <Loading />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)} />
                </Form.Group>

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
                        value={ConfirmPassword}
                        placeholder="ConfirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {/* {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )} */}
                <Form.Group>
                    <span>Uplaod Image</span>
                    <input type="file" onChange={(e) => setPic(e.target.files[0])} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Row className='py-3'>
                    <Col>
                        Already have an account ? <Link to='/login'>Login Here</Link>
                    </Col>
                </Row>
            </Form>
        </MainScreen>
    )
}

export default RegisterScreen
