import React from "react";
import style from './AddPost.module.css'
import {Field, reduxForm} from "redux-form";

const AddPost = (props) => {
    const {newPostText, addPost, updateNewPost} = props;
    const newPostElement = React.createRef();

    const onSubmit = (formData) => {
        addPost(formData)
    }

    return (
        <AddPostReduxForm onSubmit={onSubmit}/>
    )
}

const AddPostForm = (props) => {


    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={'input'}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )

}

const AddPostReduxForm = reduxForm({form: 'addPostForm'})(AddPostForm);

export default AddPost;