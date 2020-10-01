import {setUserProfile} from './profileReducer';
import {getMyProfileThunkCreator, setAuthUserData} from "./authReducer";
import {profileAPI} from "../api/profile-api";

const INITIALIZED_SUCCSES = 'INITIALIZED_SUCCSES';


export type InitialStateType = {
    initialized: boolean,
}

let initialState : InitialStateType = {
    initialized: false,
}


export const appReducer = (state = initialState, action: InitializedSuccessActionType) : InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCSES: {
            return {...state, initialized: true};
        }

        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCSES,
}

export const initializedSuccess = () : InitializedSuccessActionType => {

    return {type: INITIALIZED_SUCCSES,}
}

export const initializeApp = () => {
    return (dispatch: Function) => {
        let promise = dispatch(getMyProfileThunkCreator());

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }
}
