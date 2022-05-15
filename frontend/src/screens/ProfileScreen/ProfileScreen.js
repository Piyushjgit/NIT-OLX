import React, { useState, useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import { Row, Col, Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from "../../components/Loading";
import { userProfile, deleteUser } from '../../actions/userActions';
import "./ProfileScreen.css";

const ProfileScreen = ({ location, history }) => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [picMessage, setPicMessage] = useState();
    const [passwordError, setPasswordError] = useState('');

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    const userDelete = useSelector((state) => state.userDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;
    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            setName(userInfo.name);
            setPic(userInfo.pic.url);
        }
    }, [history, userInfo]);
    // const postDetails = (pics) => {
    //     setPicMessage(null);
    //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //         const data = new FormData();
    //         data.append("file", pics);
    //         data.append("upload_preset", "NotesApp");
    //         data.append("cloud_name", "pdpcn");
    //         fetch("https://api.cloudinary.com/v1_1/pdpcn/image/upload", {
    //             method: "post",
    //             body: data,
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setPic(data.url.toString());
    //                 console.log(pic);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     } else {
    //         return setPicMessage("Please Select an Image");
    //     }
    // };
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Password Dont Match");
        }
        else {
            setPasswordError('');
            dispatch(userProfile({ name, password }));
        }
    };
    const handleDelete = () => {
        if (window.confirm("Delete Account Permanently ?")) {
            dispatch(deleteUser());
            // history.push('/');
        }
    };
    return (
        <MainScreen title="UPDATE PROFILE">
            <div>
                <Row className='profileContainer'>
                    <Col>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            {passwordError && <ErrorMessage variant="danger">{passwordError}</ErrorMessage>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
                            <Button type="submit" varient="primary" className='mt-3'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', 'alignItems': 'center' }}>
                        <img src={pic} alt={name} className='profilePic' />
                        {/* <Image src={pic} fluid rounded responsive /> */}
                        {/* <Button type="delete" varient="primary" onClick={handleDelete}>
                            Delete Account
                        </Button> */}
                    </Col>
                </Row>
                {loadingDelete && <Loading />}
                {successDelete && (
                    <ErrorMessage variant="success">
                        Deleted Successfully
                    </ErrorMessage>
                )}
            </div>
        </MainScreen>
    )
}

export default ProfileScreen
