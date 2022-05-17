import './App.css';
import { BrowserRouter, Route, useHistory, useLocation, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyAds from './screens/MyAds/MyAds';
import CreateAd from './screens/createAd/CreateAd';
import UpdateAd from './screens/createAd/UpdateAd';
import AdScreen from './screens/AdScreen/AdScreen';
import decode from 'jwt-decode';
import { logout } from './actions/userActions';
import ResetPassword from './screens/RegisterScreen/ResetPassword';
import ResetPage from './screens/RegisterScreen/ResetPage';
import NotFound from './screens/NotFound';
import ChatScreen from './screens/ChatScreen/ChatScreen';
import MyBuys from './screens/MyBuys/MyBuys';
import LoginScreen2 from './screens/LoginScreen/LoginScreen2';
import RegisterScreen2 from './screens/RegisterScreen/RegisterScreen2';
import { Container } from 'react-bootstrap';
import ContactUs from './screens/ContactUs/ContactUs';

function App() {
  const dispatch = useDispatch();
  // const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState("");
  // const [notification, setNotification] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const token = userInfo?.token;
    if (token) {
      let decodedToken = decode(token);
      let currentDate = new Date();
      if (!token || decodedToken.exp * 1000 < currentDate.getTime()) {
        dispatch(logout);
        localStorage.removeItem('userInfo');
        history?.push('/login');
      } else {
        console.log("Valid token");
      }
    }
  }, [])
  return (
    <BrowserRouter>

      {userInfo && <Header setSearch={setSearch} />}
      <div style={{ height: '100hv', marginBottom: '6rem' }}>
        <Switch>
          <Route path='/' component={LoginScreen2} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/login2' component={LoginScreen2} />
          <Route path='/register2' component={RegisterScreen2} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/myads' component={MyAds} />
          <Route path='/myBuys' component={MyBuys} />
          <Route path='/createad' component={CreateAd} />
          <Route path='/contactus' component={ContactUs} />
          <Route path='/ad/:id' component={AdScreen} />
          <Route
            path="/home"
            component={({ history }) => (
              <HomeScreen search={search} history={history} />
            )}
          />
          <Route path='/updatead/:id' component={UpdateAd} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/reset' component={ResetPage} exact />
          <Route path='/reset-password/:token' component={ResetPassword} />
          <Route path='/chat/:uid/:aid' component={ChatScreen} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
    //   let token = localStorage.getItem(TOKEN);
    // let decodedToken = jwt_decode(token);
    // console.log("Decoded Token", decodedToken);
    // let currentDate = new Date();

    // // JWT exp is in seconds
    // if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //   console.log("Token expired.");
    // } else {
    //   console.log("Valid token");
    // }
  );
}

export default App;
