import React from 'react'
import { AD_LIST_REQUEST, AD_LIST_SUCCESS, AD_LIST_FAIL, AD_DELETE_REQUEST, AD_DELETE_SUCCESS, AD_DELETE_FAIL, AD_CREATE_REQUEST, AD_CREATE_SUCCESS, AD_CREATE_FAIL, AD_UPDATE_REQUEST, AD_UPDATE_SUCCESS, AD_UPDATE_FAIL, SINGLE_AD_LIST_FAIL, SINGLE_AD_LIST_SUCCESS, SINGLE_AD_LIST_REQUEST } from "../constants/adsConstant";
import axios from 'axios';

export const listAds = () => async (dispatch, getState) => {
    try {
        dispatch({ type: AD_LIST_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('/api/ads', config);
        dispatch({ type: AD_LIST_SUCCESS, payload: data })
        // console.log(data);
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: AD_LIST_FAIL,
            payload: message,
        });
    }
}
export const currentAd = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SINGLE_AD_LIST_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`/api/ads/${id}`, config);
        dispatch({ type: SINGLE_AD_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SINGLE_AD_LIST_FAIL,
            payload: message,
        });
    }
}
export const myAds = () => async (dispatch, getState) => {
    try {
        dispatch({ type: AD_LIST_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('/api/ads/myads', config);
        dispatch({ type: AD_LIST_SUCCESS, payload: data })
        // console.log(data);
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: AD_LIST_FAIL,
            payload: message,
        });
    }
}
export const myBuys = () => async (dispatch, getState) => {
    try {
        dispatch({ type: AD_LIST_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('/api/ads/mybuys', config);
        dispatch({ type: AD_LIST_SUCCESS, payload: data })
        // console.log(data);
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: AD_LIST_FAIL,
            payload: message,
        });
    }
}
export const deleteAd = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: AD_DELETE_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(`/api/ads/${id}`, config);
        dispatch({ type: AD_DELETE_SUCCESS, payload: data })
        // console.log(data);
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: AD_DELETE_FAIL,
            payload: message,
        });
    }
}

export const createAd = (title, description,image,price) => async (dispatch, getState) => {
    try {
        dispatch({ type: AD_CREATE_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(`/api/ads/create`, { title, description, image, price}, config);
        // console.log(data);
        dispatch({ type: AD_CREATE_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: AD_CREATE_FAIL,
            payload: message,
        });
    }
}
export const updateAd = (title, description, image, price,id) => async (dispatch, getState) => {
    try {
        dispatch({ type: AD_UPDATE_REQUEST });
        //taking out userinfo from userLogin state
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`/api/ads/${id}`, { title, description, image, price }, config);
        // console.log(data);
        dispatch({ type: AD_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: AD_UPDATE_FAIL,
            payload: message,
        });
    }
}
