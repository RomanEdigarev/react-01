import React from "react";
import style from './Message.module.css'
import {Field, reduxForm} from "redux-form";
import {Textarea, TextareaWithValidation} from "../../../common/FormsControl/FormsControls";
import {maxLengthCreator, requiredField} from "../../../../utils/validators/validators";

const Message = (props) => {
    const {id, name, messages, addMessage} = props

    const onSubmit = (formData) => {
       addMessage(id, formData.addMessageText);
    }

    return (
        <div className={style.message}>
            <div>{`${name} say:`}</div>
            <div>{messages}</div>
            <div>
                <AddMessageReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'addMessageText'}
                   component={TextareaWithValidation}
                   placeholder={'addMessage'}
                   validate={[requiredField, maxLength50]}
            />
            <div><button>Add Message</button></div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'addMessageForm'})(AddMessageForm);

export default Message;