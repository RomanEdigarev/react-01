import React, {Component, FC} from "react";
import styles from './FormsControls.module.css'
import {WrappedFieldProps} from "redux-form";

const Textarea = (props:any) => {

    return (
        <textarea {...props}></textarea>
    )
}

export const Input = (props:any) => {
    return (
       <input {...props}/>
    )
}



const withValidateForm = (Component: React.FC) => {

    const ValidateForm : FC<WrappedFieldProps>= ({input, meta, ...props}) => {
        debugger
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
export const InputWithValidation = withValidateForm(Input);