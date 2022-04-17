import React from 'react'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_DELETE_FAIL, USER_DELETE_SUCCESS, USER_DELETE_REQUEST } from '../constants/userConstants';
import axios from 'axios';

export const login = (email,password) => async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post('/api/users/login', { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS,payload:data })
        // console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const logout = () => async (dispatch) => {
        localStorage.removeItem('userInfo');
        dispatch({ type: USER_LOGOUT });
}

export const Register = (name,email, password,pic) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post('/api/users', { name,email, password,pic }, config);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export const userProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post('/api/users/profile',user, config);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        // console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export const deleteUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(`/api/users/delete`, config);
        localStorage.removeItem('userInfo');
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGOUT });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        });
    }
}
