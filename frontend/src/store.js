import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer, userUpdateReducer, userDeleteReducer } from "./reducers/userReducers";
import { adListReducer, adDeleteReducer, adCreateReducer, adUpdateReducer, singleAdListReducer } from "./reducers/adsReducer";
import { fetchChatReducer } from "./reducers/chatReducer";
const reducers=combineReducers({
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate:userUpdateReducer,
    userDelete: userDeleteReducer,
    adList: adListReducer,
    adCreate: adCreateReducer,
    adUpdate: adUpdateReducer,
    adDelete: adDeleteReducer,
    userAds: adListReducer,
    singleAd:singleAdListReducer,
    userChats: fetchChatReducer
})

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};


const middleware=[thunk];

const store=createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;