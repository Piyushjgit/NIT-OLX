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
import pic1 from '../LoginScreen/img/logo.svg';
import pic2 from '../LoginScreen/img/register.svg';
import { GoogleLogin } from 'react-google-login'
function RegisterScreen2({ history }) {
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
            toast.error(`Password Dont Match !`);
        }
        else {
            if (!pic) {
                toast.error(`Please fill all the fields !`);
                return ;
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
                        }, 1500);
                        setWait(false);
                        toast.success(`Account Created Successfully !`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                toast.error('Something went wrong ! Try Again');
            }
        }
    }
    const googleSuccess = async (res) => {
        console.log(res)
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            setName(result.name);
            setEmail(result.email);
            // setPic(result.imageUrl);
            // console.log("Register")
        } catch (error) {
            setMessage(`Google Sign In ${error?.error}`);
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        setMessage(`Google Sign In ${error?.error}`);
        console.log("Google Sign In", error)
        // console.log('Google Sign in was unsuccessful')
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
            {/* {wait && <Loading />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {loading && <Loading />} */}
            <div className="container2">
                {error ? toast.error(`Invalid Email or Password`) : ('')}
                <div className="forms-container2 cont33">
                    <div className="signin-signup2">
                        <form className="sign-in-form2">
                            {loading && <Loading />}
                            {/* {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>} */}
                            <h2 className="title2">NIT-OLX - Sign Up</h2>
                            <div className="input-field2">
                                <i className="fas fa-user"></i>
                                <input type="text"
                                    value={name}
                                    placeholder="Enter Name"
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-field2">
                                <i className="fas fa-user"></i>
                                <input type="email" value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-field2">
                                <i className="fas fa-lock"></i>
                                <input type="password"
                                    value={password}
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="input-field2">
                                <i className="fas fa-lock"></i>
                                <input type="password"
                                    value={ConfirmPassword}
                                    placeholder="ConfirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div> 
                            <div className="upload-image">
                                <i className="fas fa-image mr-2 mt-1 mb-2"></i>
                                <input type="file" onChange={(e) => setPic(e.target.files[0])} />
                            </div> 
                            {/* <input type="submit" value="SignUp" className="btn2 solid2" /> */}
                            <div style={{display:'flex' ,justifyContent:'space-between'}} className='mt-3'>
                        <Button
                            onClick={submitHandler}
                        >SignUp
                                </Button>
                            <GoogleLogin
                                clientId='477141315812-3gqgbv4ilrkpmkk9soalib5pg6513hs7.apps.googleusercontent.com'
                                render={(renderProps) => (
                                    <Button
                                        onClick={renderProps.onClick}
                                        color="primary"
                                        disabled={renderProps.disabled}
                                        className='ml-3'
                                    >Google Sign Up
                                    </Button>
                                )}
                                onSuccess={()=>googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                            </div>
                            <Row>
                                <Col className='py-3 logLink'>
                                    Already have an account ? <Link to='/login2'><span className='font-weight-bold ml-1' style={{ color: '#1266F1' }}>SignIn Here</span></Link>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>

                <div className="panels-container2">
                    <div className="panel2 left-panel2">
                        <div className="content2">
                            <h3>Already have an account ?</h3>
                            <p>
                                Welcome to NIT-OLX &nbsp; Please <bold> Sign In </bold> to buy and sell products
                            </p>
                            <button className="btn2 transparent2" id="sign-up-btn">
                                <Link to="/login2">
                                    Sign In
                                </Link>
                            </button>
                        </div>
                        <img src={pic2} className="image2" alt="" />
                    </div>
                    </div>
            </div>
        </>
    )
}

export default RegisterScreen2