import React from "react";
import Posts from "./Posts/Posts";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea, TextareaWithValidation} from "../../common/FormsControl/FormsControls";


const MyPostsContainer = React.memo((props) => {

    console.log('render');
    const {postsData} = props.profile;
    const {addPost} = props;

    const onSubmit = (formData) => {
        addPost(formData.addNewPost);
    }

    return (
        <div>
            <AddPostReduxForm onSubmit={onSubmit}/>
            <Posts postsData={postsData}/>
        </div>
    )
});

const maxLength10 = maxLengthCreator(10);
const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'addNewPost'}
                       component={TextareaWithValidation}
                       placeholder={'addNewPost'}
                       validate={[requiredField, maxLength10]}/>
            </div>
            <div><button>Add Post</button></div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({form: 'addNewPost'})(AddPostForm);

export default MyPostsContainer;