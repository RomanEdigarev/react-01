import React from "react";
import style from './Posts.module.css'
import Post from "./Post/Post";

const Posts = (props) => {

    const posts = props.postsData.map(post => <Post id={post.id} message={post.text} likesCount={post.likesCount}/>);

    return (
        <div className={style.posts}>
            <h2 className={style.title}>posts</h2>
            {posts}
        </div>
    )
}

export default Posts;