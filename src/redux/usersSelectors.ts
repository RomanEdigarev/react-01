import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";


export const getUsersSelector = (state : AppStateType) => {
    return state.usersReducer.users;
}

export const getUsersSuperSelector = createSelector(getUsersSelector,
    (users) => { return users }
)

export const getPageSizeSelector = (state : AppStateType) : number  => {
    return state.usersReducer.pageSize;
}

export const getTotalUsersCountSelector = (state : AppStateType) : number  => {
    return state.usersReducer.totalUsersCount;
}

export const getCurrentPageSelector = (state : AppStateType) : number => {
    return state.usersReducer.currentPage;
}

export const getIsFetchingSelector = (state : AppStateType) : boolean => {
    return state.usersReducer.isFetching;
}

export const getFollowingInProgressSelector = (state : AppStateType) : Array<number> => {
    return state.usersReducer.followingInProgress;
}