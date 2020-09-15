import {loginAPI, profileAPI} from "../api/api";
import {setUserProfile} from "./profileReducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const LOGOUT_USER_DATA = 'LOGOUT_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                id: action.id,
                login: action.fullName,
                isAuth: true,
            }
        }
        case LOGOUT_USER_DATA: {
            return {
                ...state,
                id: null,
                email: null,
                login: null,
                isFetching: false,
                isAuth: false,
            }
        }

        default: {
            return state;
        }

    }
}

export const setAuthUserData = (id, fullName) => {
    return {
        type: SET_USER_DATA,
        id, fullName
    }
}
export const logOutUserData = () => {
    return {
        type: LOGOUT_USER_DATA,
    }
}

export const getMyProfileThunkCreator = () => {

    return async (dispatch) => {

        let data = await profileAPI.getMyProfile();

        if (data) {
            let profile = await profileAPI.getProfile(data);
            const {userId, fullName} = profile;
            dispatch(setAuthUserData(userId, fullName));
            dispatch(setUserProfile(profile));
        }
    }
}

export const loginUser = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        const response = await loginAPI.loginUser(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getMyProfileThunkCreator())
        } else {
            let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('loginForm', {_error: messages}));
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        const response = await loginAPI.logoutUser();
        if (response.data.resultCode === 0) {
            dispatch(logOutUserData());
        }
    }
}
export default authReducer;