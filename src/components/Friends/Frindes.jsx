import React from "react";
import style from './Friends.module.css'
import Friend from "./Friend/Frined";


const Friends = (props) => {
    let {friendsData} = props;
    friendsData = friendsData.map(friend => <Friend id={friend.id} name={friend.name} avatar={friend.avatar}/>)

    return (
        <div className={style.friends}>
            <div className={style.friends__title}>
                Friends
            </div>
            <div className={style.friends__items}>
                {friendsData}
            </div>
        </div>
    )
}

export default Friends