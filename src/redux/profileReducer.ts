import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

import {Types} from "./types/types";
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_AVATAR_SUCCESS = 'SAVE_AVATAR_SUCCESS';
const CHANGE_PROFILE_DATA = 'CHANGE_PROFILE_DATA';

const initialState = {
    profile: null as Types | null,
    status: null as string | null,
}

type InitialStateType = typeof initialState;


const profileReducer = (state: InitialStateType = initialState, action : any) : InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            return {...state}
        }

        case SET_USER_PROFILE: {
            return {...state, profile: {...action.profile}}
        }
        case  SET_STATUS: {
            return {...state, status: action.param}
        }
        case SAVE_AVATAR_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.param} as Types }
        }

        default : {
            return {...state}
        }
    }


}

type AddPostActionType = {type: typeof  ADD_POST, text: string}
export const addPost = (text: string) : AddPostActionType => {
    return {
        text, type: ADD_POST
    }
}


export type SetUserProfileActionType = {type: typeof SET_USER_PROFILE, profile: Types}
export const setUserProfile = (profile: Types) : SetUserProfileActionType => {
    return {
        profile, type: SET_USER_PROFILE
    }
}


type SetStatusProfile = {type: typeof SET_STATUS, status: string}
const setStatusProfile = (status: string) : SetStatusProfile => {
    return {
        status, type: SET_STATUS
    }
}


type SaveAvatarSuccess = {type: typeof SAVE_AVATAR_SUCCESS, avatar:any}
const saveAvatarSuccess = (avatar:any) : SaveAvatarSuccess  => {
    return {
        avatar, type: SAVE_AVATAR_SUCCESS
    }
}


type ChangeProfileData = {type: typeof CHANGE_PROFILE_DATA, profileData : any}
export const changeProfileData = (profileData:any) : ChangeProfileData => {
    return {profileData, type: CHANGE_PROFILE_DATA}
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

export default profileReducer;