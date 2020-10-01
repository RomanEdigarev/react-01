import {UserType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/users-api";

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
// const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
// const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 2 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actionCreators>

export const actionCreators = {
    followSuccess: (id: number) => {
        return ({type: 'FOLLOW', id,} as const)
    },

    unfollowSuccess: (id: number) => {
        return ({type: 'UNFOLLOW', id} as const)
    },

    setUsers: (users: Array<UserType>) => {
        return {type: 'SET_USERS', users} as const
    },

    setCurrentPage: (pageNumber: number) => {
        return {type: 'SET_CURRENT_PAGE', pageNumber} as const
    },

    setTotalUsersCount: (totalCount: number) => {
        return {type: 'SET_TOTAL_COUNT', totalCount} as const
    },

    toggleIsFetching: (isFetching: boolean) => {
        return {type: 'TOGGLE_FETCHING', isFetching} as const
    },


    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => {
        return {type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId} as const
    },


}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.id) {
                        user.followed = true;
                    }
                    return user;
                })
            }
        }
        case "UNFOLLOW": {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.id) {
                        user.followed = false;
                    }
                    return user;
                })
            }
        }
        case "SET_USERS": {
            return {
                ...state, users: action.users
            }
        }

        case 'SET_CURRENT_PAGE': {
            return {
                ...state, currentPage: action.pageNumber,
            }
        }
        case 'SET_TOTAL_COUNT' : {
            return {
                ...state, totalUsersCount: action.totalCount,
            }
        }
        case 'TOGGLE_FETCHING': {
            return {
                ...state, isFetching: action.isFetching,
            }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const getUsersThunkCreator = (currentPage: number, pageSize: number) : ThunkType  => {
    return async (dispatch, getState) => {
        dispatch(actionCreators.toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(actionCreators.toggleIsFetching(false));
        dispatch(actionCreators.setUsers(data.items));
        dispatch(actionCreators.setTotalUsersCount(data.totalCount));
    }
}

export const followThunkCreator = (userId: number) : ThunkType => {
    return async (dispatch) => {
        dispatch(actionCreators.toggleFollowingProgress(true, userId));
        const data = await usersAPI.followAPI(userId);
        if (data.resultCode === 0) {
            dispatch(actionCreators.followSuccess(userId));
        }
        dispatch(actionCreators.toggleFollowingProgress(false, userId));
    }
}

export const unfollowThunkCreator = (userId: number) : ThunkType => {
    return async (dispatch) => {
        dispatch(actionCreators.toggleFollowingProgress(true, userId));
        const data = await usersAPI.unfollowAPI(userId);
        if (data.resultCode === 0) {
            dispatch(actionCreators.unfollowSuccess(userId));
        }
        dispatch(actionCreators.toggleFollowingProgress(false, userId));
    }
}

export const setCurrentPageThunkCreator = (page:number ) : ThunkType => {
    return async (dispatch) => {
        dispatch(actionCreators.setCurrentPage(page))
    }
}

export default usersReducer;