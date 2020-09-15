import {profileAPI} from "../api/api";
import {setUserProfile} from "./profileReducer";
import {getMyProfileThunkCreator, setAuthUserData} from "./authReducer";

const INITIALIZED_SUCCSES = 'INITIALIZED_SUCCSES';


let initialState = {
    initialized: false,
}


export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCSES: {
            return {...state, initialized: true};
        }

        default:
            return state;
    }
}

export const initializedSuccess = () => {

    return {type: INITIALIZED_SUCCSES,}
}

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getMyProfileThunkCreator());

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }
}
