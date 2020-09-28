import {usersAPI} from "../api/api";
import {UserType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';




const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 2 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalUsersCount | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

const usersReducer = (state = initialState, action : ActionsTypes) : InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.id) {
                        user.followed = true;
                    }
                    return user;
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.id) {
                        user.followed = false;
                    }
                    return user;
                })
            }
        }
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.pageNumber,
            }
        }
        case SET_TOTAL_COUNT : {
            return {
                ...state, totalUsersCount: action.totalCount,
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state, isFetching: action.isFetching,
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.followingInProgress ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default: {
            return state;
        }

    }

}

type FollowSuccessActionType = {type: typeof  FOLLOW, id:number}
export const followSuccess = (id:number) :FollowSuccessActionType => {
    return {type: FOLLOW, id,}
}

type UnfollowSuccessActionType = {type: typeof UNFOLLOW, id:number}
export const unfollowSuccess = (id:number) : UnfollowSuccessActionType => {
    return {type: UNFOLLOW, id}
}


type SetUsersActionType = {type: typeof SET_USERS, users: Array<UserType>}
export const setUsers = (users: Array<UserType>) : SetUsersActionType => {
    return {type: SET_USERS, users}
}

type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, pageNumber : number}
export const setCurrentPage = (pageNumber:number) : SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, pageNumber}
}

type SetTotalUsersCount = {type: typeof SET_TOTAL_COUNT, totalCount: number}
export const setTotalUsersCount = (totalCount:number) : SetTotalUsersCount => {
    return {type: SET_TOTAL_COUNT, totalCount}
}

type ToggleIsFetchingActionType = {type: typeof TOGGLE_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching:boolean) : ToggleIsFetchingActionType => {
    return {type: TOGGLE_FETCHING, isFetching}
}

type ToggleFollowingProgressActionType = {type : typeof  TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress: boolean, userId:number}
export const toggleFollowingProgress = (followingInProgress: boolean, userId:number) : ToggleFollowingProgressActionType=> {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId}
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
export const getUsersThunkCreator = (currentPage:number, pageSize:number) : ThunkType => {

    return async (dispatch, getState)  => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const followThunkCreator = (userId:number) : ThunkType => {

    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await usersAPI.followAPI(userId);
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export const unfollowThunkCreator = (userId:number) : ThunkType => {

    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await usersAPI.unfollowAPI(userId);
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;