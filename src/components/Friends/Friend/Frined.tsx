import React, {FC} from "react";
import style from './Friend.module.css'
import {NavLink} from "react-router-dom";


export type FriendPropsType = {
    avatar : any | null
    name:string | null
    id:number | null
    messages?: Array<string>

}

const Friend : FC<FriendPropsType> = (props) => {
    const {avatar, name, id} = props
    debugger
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