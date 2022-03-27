import { AD_LIST_REQUEST, AD_LIST_SUCCESS, AD_LIST_FAIL, AD_DELETE_REQUEST, AD_DELETE_SUCCESS, AD_DELETE_FAIL, AD_CREATE_REQUEST, AD_CREATE_SUCCESS, AD_CREATE_FAIL, AD_UPDATE_REQUEST, AD_UPDATE_SUCCESS, AD_UPDATE_FAIL, SINGLE_AD_LIST_REQUEST, SINGLE_AD_LIST_SUCCESS, SINGLE_AD_LIST_FAIL } from "../constants/adsConstant";
export const adListReducer = (state = { ads: [] }, action) => {
    switch (action.type) {
        case AD_LIST_REQUEST:
            return { loading: true };
        case AD_LIST_SUCCESS:
            return { loading: false, ads: action.payload };
        case AD_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const adCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case AD_CREATE_REQUEST:
            return { loading: true };
        case AD_CREATE_SUCCESS:
            return { loading: false, success: true };
        case AD_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const adDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case AD_DELETE_REQUEST:
            return { loading: true };
        case AD_DELETE_SUCCESS:
            return { loading: false, success: true };
        case AD_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}
export const adUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case AD_UPDATE_REQUEST:
            return { loading: true };
        case AD_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case AD_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
}
export const singleAdListReducer = (state = {ads:{}}, action) => {
    switch (action.type) {
        case SINGLE_AD_LIST_REQUEST:
            return { loading: true };
        case SINGLE_AD_LIST_SUCCESS:
            return { loading: false, ads: action.payload };
        case SINGLE_AD_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}