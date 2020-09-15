import React from "react";
import {connect} from 'react-redux';
import {
    follow, followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow, unfollowThunkCreator

} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector, getUsersSuperSelector
} from "../../redux/usersSelectors";


// const mapStateToProps = (state) => {
//     const {users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress} = state.usersReducer
//     return {
//         users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (id) => dispatch(followActionCreator(id)),
//         unfollow: (id) => dispatch(unfollowActionCreator(id)),
//         setUsers: (users) => dispatch(setUsersActionCreator(users)),
//         setCurrentPage: (pageNumber) => dispatch(setCurrentPageActionCreator(pageNumber)),
//         setTotalUsersCount: (totalCount) => dispatch(setTotalUsersCountActionCreator(totalCount)),
//         setIsFetching: (isFetching) => dispatch(toggleIsFetchingActionCreator(isFetching)),
//     }
// }

const mapStateToProps = (state) => {

    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
    }
}


class User extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page) => {
        this.props.getUsers(page, this.props.pageSize)
        this.props.setCurrentPage(page);
    }


    render() {
        const {currentPage, pageSize, totalUsersCount, users, follow, unfollow, toggleFollowingProgress, followingInProgress} = this.props

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    users={users}
                    follow={follow}
                    unfollow={unfollow}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={followingInProgress}
                />
            </>

        )
    }
}

const UsersContainer = compose(
    withAuthRedirect,
    connect(mapStateToProps,
        {
            follow: followThunkCreator, unfollow: unfollowThunkCreator,
            setCurrentPage,
            toggleFollowingProgress, getUsers: getUsersThunkCreator

        })
)(User)
export default UsersContainer;



