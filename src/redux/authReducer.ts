import {loginAPI, profileAPI, securityAPI} from "../api/api";
import {setUserProfile} from "./profileReducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const LOGOUT_USER_DATA = 'LOGOUT_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

type InitialStateType = {
    id: number | null,
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

const authReducer = (state = initialState, action: any) : InitialStateType=> {
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

export const setAuthUserData = (id: number, fullName:string ) : SetAuthUserDataActionType => {
    return { type: SET_USER_DATA, id, fullName }
}


type LogOutUserDataActionType = {
    type: typeof LOGOUT_USER_DATA;
}
export const logOutUserData = () : LogOutUserDataActionType => {
    return {
        type: LOGOUT_USER_DATA,
    }
}

const setCaptchaUrl = (captchaUrl:any ) => {
    return {
        type: SET_CAPTCHA_URL, captchaUrl
    }
}

export const getMyProfileThunkCreator = () => {

    return async (dispatch: Function) => {

        let data = await profileAPI.getMyProfile();

        if (data) {
            let profile = await profileAPI.getProfile(data);
            const {userId, fullName} = profile;
            dispatch(setAuthUserData(userId, fullName));
            dispatch(setUserProfile(profile));
        }
    }
}

export const loginUser = (email:string, password:string, rememberMe:boolean, captcha:string) => {
    return async (dispatch:Function) => {
        const response = await loginAPI.loginUser(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getMyProfileThunkCreator())
        } else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('loginForm', {_error: messages}));
        }
    }
}

export const logoutUser = () => {
    return async (dispatch:Function) => {
        const response = await loginAPI.logoutUser();
        if (response.data.resultCode === 0) {
            dispatch(logOutUserData());
        }
    }
}

export const getCaptchaUrl = () => {

    return async (dispatch: Function) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaUrl(captchaUrl));
    }

}


export default authReducer;