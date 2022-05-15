import './LoginScreen2.css';
import pic1 from './img/logo.svg';
import pic2 from './img/register.svg';
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
import GoogleLogin from 'react-google-login';
function LoginScreen2({ history }) {
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
  const googleSuccess = async (res) => {
    console.log(res)
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      
    } catch (error) {
      // setMessage(`Google Sign In ${error?.error}`);
      console.log(error);
    }
  }

  const googleFailure = (error) => {
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
      <div className="container2">
        <div className="forms-container2">
          <div className="signin-signup2">
            <form className="sign-in-form2">
              {error ? (<ErrorMessage children="Invalid Id or Password" variant="danger"/>) : ('')}
              {loading && <Loading />}
              <h2 className="title2">NIT-OLX - Sign In</h2>
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
                  onChange={(e) => serPassword(e.target.value)} />
              </div>
              {/* <input type="submit" value="Login" className="btn2 solid2" /> */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }} className='mt-3'>
                <Button
                  onClick={submitHandler}
                >LogIn
                                </Button>
                <GoogleLogin
                  clientId='477141315812-3gqgbv4ilrkpmkk9soalib5pg6513hs7.apps.googleusercontent.com'
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      color="primary"
                      disabled={renderProps.disabled}
                      className='ml-3'
                    >Google Sign In
                    </Button>
                  )}
                  onSuccess={() => googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />
              </div>
              <span>Forgot Password ?<Link to='/reset'><span className='font-weight-bold ml-1 mt-3' style={{ color: '#1266F1' }}> Click Here</span></Link></span>
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
    </>
  )
}

export default LoginScreen2