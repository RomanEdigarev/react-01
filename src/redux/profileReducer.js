import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_AVATAR_SUCCESS = 'SAVE_AVATAR_SUCCESS';
const CHANGE_PROFILE_DATA = 'CHANGE_PROFILE_DATA';

let initialState = {
    profile: {
        postsData: [
            {id: 1, text: 'Hi, how are you', likesCount: 12},
            {id: 2, text: 'my first post', likesCount: 10},
        ],
        status: '',
        newPostText: 'kamasutra'
    },
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.profile.postsData.length + 1,
                text: action.newPostText,
                likesCount: 0,
            }

            return {...state, profile: {...state.profile, postsData: [...state.profile.postsData, newPost]}}

        }

        case SET_USER_PROFILE: {
            return {
                ...state, profile: {...state.profile, ...action.profile}
            }
        }

        case SET_STATUS: {
            return {
                ...state, profile: {...state.profile, status: action.status}
            }
        }
        case  DELETE_POST: {
            return {
                ...state, profile: {
                    ...state.profile,
                    postsData: state.profile.postsData.filter(post => post.id != action.postId)
                }
            }
        }
        case SAVE_AVATAR_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.avatar}
            }
        }
        case CHANGE_PROFILE_DATA: {
            return {
                ...state, profile: {...state.profile, ...action.profileData}
            }
        }

        default:
            return state;
    }
}
export const addPost = (newPostText) => {
    return {
        type: ADD_POST, newPostText
    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}
export const deletePost = (postId) => {
    return {
        type: DELETE_POST, postId
    }
}

const setStatusProfile = (status) => {
    return {type: SET_STATUS, status}
}

const saveAvatarSuccess = (avatar) => {
    return {type: SAVE_AVATAR_SUCCESS, avatar}
}

export const changeProfileData = (profileData) => {
    debugger
    return {type: CHANGE_PROFILE_DATA, profileData}
}

export const getProfileThunkCreator = (userId) => {

    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
    }
}

export const getMyProfileThunkCreator = () => {

    return (dispatch) => {
        profileAPI.getMyProfile()
            .then(data => dispatch(setUserProfile(data)))

    }
}

export const getProfileStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        const status = await profileAPI.getStatus(userId);
        dispatch(setStatusProfile(status));
    }
}

export const updateStatusThunkCreator = (status) => {

    return async (dispatch) => {
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

export const saveAvatar = (file) => {
    return async (dispatch) => {
        const response = await profileAPI.saveAvatar(file);
        dispatch(saveAvatarSuccess(response.data.data.photos))
    }
}

export const saveProfileDataChanges = (profileData) => {

    return async (dispatch, getState) => {
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