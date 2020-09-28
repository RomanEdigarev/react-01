import React, {FC} from "react";
import Paginator from "../common/Pagintaor/Paginator";
import User from "./User";
import {UserType} from "../../redux/types/types";


type UsersType = {
    currentPage: number
    pageSize:number
    totalUsersCount:number
    users:Array<UserType>
    follow: (id:number) => void
    unfollow:(id:number) => void
    onPageChanged: (page: number) => void
    followingInProgress: Array<number>
}

const Users : FC<UsersType> = (props) => {

    const {currentPage, pageSize, totalUsersCount, users, follow, unfollow, onPageChanged, followingInProgress} = props;


    return (
        <div>
            <Paginator currentPage={currentPage}
                       pageSize={pageSize}
                       totalItemsCount={totalUsersCount}
                       onPageChanged={onPageChanged}/>
            {
                users.map(user => {
                    return (
                        <User key={user.id}
                              user={user}
                              follow={follow}
                              unfollow={unfollow}
                              followingInProgress={followingInProgress}/>
                    )
                })
            }

        </div>
    )
}

export default Users;