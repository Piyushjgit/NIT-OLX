import { FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS, FETCH_CHAT_FAIL, FETCH_LOGOUT, CHAT_UPDATE_FAIL, CHAT_UPDATE_REQUEST, CHAT_UPDATE_SUCCESS }
    from '../constants/chatConstants'
export const fetchChatReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CHAT_REQUEST:
            return { loading: true };
        case FETCH_CHAT_SUCCESS:
            return { loading: false, chatInfo: action.payload };
        case FETCH_CHAT_FAIL:
            return { loading: false, error: action.payload };
        case FETCH_LOGOUT:
            return {};
        default:
            return state;
    }
}

export const chatUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CHAT_UPDATE_REQUEST:
            return { loading: true };
        case CHAT_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case CHAT_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}