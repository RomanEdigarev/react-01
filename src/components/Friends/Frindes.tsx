import React, {FC} from "react";
import style from './Friends.module.css'
import Friend, {FriendPropsType} from "./Friend/Frined";


type FriendsPropsType = {
    friendsData: Array<FriendPropsType>
}

const Friends : FC<FriendsPropsType> = ({friendsData} ) => {
    return (
        <div className={style.friends}>
            <div className={style.friends__items}>
                {friendsData.map(friend => <Friend id={friend.id} avatar={friend.avatar} name={friend.name}/> )}
            </div>
        </div>
    )
}

export default Friends;