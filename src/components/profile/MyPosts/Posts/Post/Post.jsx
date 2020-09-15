import React from "react";
import style from './Post.module.css'

const Post = (props) => {
    return (
        <div>
            <div className={style.post}>{props.message}</div>
            <div>Likes {props.likesCount}</div>
        </div>
    )
}

export default Post;