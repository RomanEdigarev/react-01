import {loginAPI, profileAPI, ResultCode, securityAPI} from "../api/api";

import {stopSubmit} from "redux-form";
import {setUserProfile, SetUserProfileActionType} from './profileReducer';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const SET_USER_DATA = 'SET_USER_DATA';
const LOGOUT_USER_DATA = 'LOGOUT_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

type InitialStateType = {
    id: number | null ,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    isAuth: boolean,
    captchaUrl: string | null,
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
}


type ActionsType = SetAuthUserDataActionType | LogOutUserDataActionType | SetCaptchaUrlActionType | SetUserProfileActionType
const authReducer = (state = initialState, action:ActionsType): InitialStateType => {
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
        case SET_CAPTCHA_URL: {
            return {
                ...state, captchaUrl: action.captchaUrl
            }
        }


        default: {
            return state;
        }

    }
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA;
    id: number;
    fullName: string;
}

export const setAuthUserData = (id: number, fullName: string): SetAuthUserDataActionType => {
    return {type: SET_USER_DATA, id, fullName}
}


type LogOutUserDataActionType = {
    type: typeof LOGOUT_USER_DATA;
}
export const logOutUserData = (): LogOutUserDataActionType => {
    return {
        type: LOGOUT_USER_DATA,
    }
}

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    captchaUrl: string
}
const setCaptchaUrl = (captchaUrl: string) : SetCaptchaUrlActionType => {
    return {
        type: SET_CAPTCHA_URL, captchaUrl
    }
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getMyProfileThunkCreator = () : ThunkType => {
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

export const getCaptchaUrl = () : ThunkType => {

    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaUrl(captchaUrl));
    }

}

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string) : ThunkType => {
    return async (dispatch) => {
        const response = await loginAPI.loginUser(email, password, rememberMe, captcha);
        if (response.data.resultCode === ResultCode.Success) {
            dispatch(getMyProfileThunkCreator())
        } else {
            if (response.data.resultCode === ResultCode.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('loginForm', {_error: messages}));
        }
    }
}

export const logoutUser = () : ThunkType => {
    return async (dispatch) => {
        const response = await loginAPI.logoutUser();
        if (response.data.resultCode === 0) {
            dispatch(logOutUserData());
        }
    }
}

export default authReducer;