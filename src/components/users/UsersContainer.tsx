import React from "react";
import {connect} from 'react-redux';
import {
    followThunkCreator,
    getUsersThunkCreator, setCurrentPageThunkCreator,
    unfollowThunkCreator

} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
     getUsersSuperSelector
} from "../../redux/usersSelectors";
import {UserType} from "../../redux/types/types";
import {AppStateType} from "../../redux/reduxStore";


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


type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

type MapDispatchToProps = {
    getUsers: (currentPage:number, pageSize:number) => void
    setCurrentPage : (page: number) => void
    follow: (userId:number) => void
    unfollow:(userId:number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToProps & OwnPropsType


const mapStateToProps = (state : AppStateType) : MapStateToPropsType => {

    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
    }
}




class User extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page:number) => {
        this.props.getUsers(page, this.props.pageSize)
        this.props.setCurrentPage(page);
    }


    render() {
        const {currentPage, pageSize, totalUsersCount, users, follow, unfollow, followingInProgress} = this.props

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
    connect<MapStateToPropsType, MapDispatchToProps, OwnPropsType, AppStateType>
    (mapStateToProps,
        {
            follow : followThunkCreator, unfollow: unfollowThunkCreator, getUsers: getUsersThunkCreator, setCurrentPage:setCurrentPageThunkCreator

        })
)(User)
export default UsersContainer;



