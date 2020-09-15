import {createSelector} from "reselect";


export const getUsersSelector = (state) => {
    return state.usersReducer.users;
}

export const getUsersSuperSelector = createSelector(getUsersSelector,
    (users) => { return users }
)

export const getPageSizeSelector = (state) => {
    return state.usersReducer.pageSize;
}

export const getTotalUsersCountSelector = (state) => {
    return state.usersReducer.totalUsersCount;
}

export const getCurrentPageSelector = (state) => {
    return state.usersReducer.currentPage;
}

export const getIsFetchingSelector = (state) => {
    return state.usersReducer.isFetching;
}

export const getFollowingInProgressSelector = (state) => {
    return state.usersReducer.followingInProgress;
}