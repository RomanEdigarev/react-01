import React from "react";
import {NavLink} from "react-router-dom";

const User = ({user,follow, unfollow,followingInProgress}) => {

    return (
        <div>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img
                        src={user.photos.small != null ? user.photos.small : 'https://icons-for-free.com/iconfiles/png/512/avatar-1320568024619304547.png'}
                        alt="" width={50}/>
                </NavLink>
            </div>
            <div>{user.name}</div>
            <div>
                {user.followed ?
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { unfollow(user.id); }}>Unfollow</button>
                    :
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { follow(user.id) }}>Follow</button>
                }
            </div>
            <div>
                {user.status}
                <div>
                    <span>{'user.location.city'}</span><br/>
                    <span>{'user.location.country'}</span>
                </div>
            </div>
        </div>
    )
}

export default User;