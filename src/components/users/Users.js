import React from "react";
import Paginator from "../common/Pagintaor/Paginator";
import User from "./User";


const Users = (props) => {

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