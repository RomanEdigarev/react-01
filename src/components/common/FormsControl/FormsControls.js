import React, {Component} from "react";
import styles from './FormsControls.module.css'

const Textarea = (props) => {
    return (
        <textarea {...props}></textarea>
    )
}

export const Input = (props) => {
    return (
       <input {...props}/>
    )
}

const withValidateForm = (Component) => {

    const ValidateForm = ({input, meta, ...props}) => {
        const hasError = meta.touched && meta.error;
        return (
            <div className={styles.form_control + " " + (hasError ? styles.error : '')}>
                <div>
                    <Component {...input} {...props}/>
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
        )
    }

    return ValidateForm;
}

export const TextareaWithValidation = withValidateForm(Textarea);
export const InputWithValidation = withValidateForm(Input)
