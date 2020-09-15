import React from "react";
import style from './Friend.module.css'
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    const {avatar, name, id} = props

    return (
        <div>
            <NavLink to={`/messages/${id}`}><div className={style.friend__name}>{name}</div></NavLink>
            <div>
                <img className={style.friend__avatar} src={avatar} alt={'friendAvatar'}/>
            </div>
        </div>
    )
}
export default Friend;