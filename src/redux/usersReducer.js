import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (id) => {
    return {type: FOLLOW, id,}
}

export const unfollowSuccess = (id) => {
    return {type: UNFOLLOW, id}
}

export const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const setCurrentPage = (pageNumber) => {
    return {type: SET_CURRENT_PAGE, pageNumber}
}
export const setTotalUsersCount = (totalCount) => {
    return {type: SET_TOTAL_COUNT, totalCount}
}
export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_FETCHING, isFetching}
}
export const toggleFollowingProgress = (followingInProgress, userId) => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId}
}

export const getUsersThunkCreator = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const followThunkCreator = (userId) => {

    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await usersAPI.followAPI(userId);
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export const unfollowThunkCreator = (userId) => {

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