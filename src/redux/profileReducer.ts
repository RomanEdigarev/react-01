import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

import {ProfileType} from "./types/profileType";
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_AVATAR_SUCCESS = 'SAVE_AVATAR_SUCCESS';
const CHANGE_PROFILE_DATA = 'CHANGE_PROFILE_DATA';

const initialState = {
    profile: null as ProfileType | null,
    status: null as string | null,
}

type InitialStateType = typeof initialState;

interface Action <T> {
    type: string;
    param: T;
}

const profileReducer = (state: InitialStateType = initialState, action : Action<any>) : InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            return {...state}
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.param}
        }
        case  SET_STATUS: {
            return {...state, status: action.param}
        }
        case SAVE_AVATAR_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.param} as ProfileType }
        }

        default : {
            return {...state}
        }
    }


}

const addPost = (text: string) : Action<string>=> {
    return {
        param: text, type: typeof ADD_POST
    }
}

export const setUserProfile = (profile: ProfileType) : Action<any> => {
    return {
        param: profile, type: typeof SET_USER_PROFILE
    }
}

const setStatusProfile = (status: string) : Action<string> => {
    return {
        param: status, type: typeof SET_STATUS
    }
}

const saveAvatarSuccess = (avatar:any) : Action<any> => {
    return {
        param: avatar, type: typeof SAVE_AVATAR_SUCCESS
    }
}

const changeProfileData = (profileData:any) : Action<any> => {
    return { param: profileData, type: CHANGE_PROFILE_DATA}
}

export const getMyProfileThunkCreator = () => {

    return (dispatch:Function) => {
        profileAPI.getMyProfile()
            .then((data:any) => dispatch(setUserProfile(data)))
    }

}

export const getProfileThunkCreator = (userId: number) => {

    return async (dispatch:Function) => {
        const data = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
    }
}

export const getProfileStatusThunkCreator = (userId: number) => {
    return async (dispatch:Function) => {
        const status : string = await profileAPI.getStatus(userId);
        dispatch(setStatusProfile(status));
    }
}

export const updateStatusThunkCreator = (status: string) => {

    return async (dispatch:Function) => {
        try {
            const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatusProfile(status));
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const saveAvatar = (file:any) => {
    return async (dispatch: Function) => {
        const response = await profileAPI.saveAvatar(file);
        dispatch(saveAvatarSuccess(response.data.data.photos))
    }
}

export const saveProfileDataChanges = (profileData:any) => {

    return async (dispatch:Function, getState:any) => {
        const response = await profileAPI.saveProfileChanges(profileData);
        if (response.data.resultCode === 0) {
            dispatch(getProfileThunkCreator(getState().authReducer.id))
        } else {
            dispatch(stopSubmit('profileDataForm', {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0]);
        }

    }
}