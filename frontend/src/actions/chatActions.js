import { FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS, FETCH_CHAT_FAIL, FETCH_LOGOUT } from '../constants/chatConstants'
import axios from 'axios'

export const fetchChat = (aid,uid) => async (dispatch,getState) => {
    try {
        dispatch({ type: FETCH_CHAT_REQUEST })
        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(`/api/chat/${aid}/${uid}`, {}, config);
        dispatch({ type: FETCH_CHAT_SUCCESS, payload: data })
        // console.log(data);
        localStorage.setItem('chatInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: FETCH_CHAT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}