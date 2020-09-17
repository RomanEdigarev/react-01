import React from "react";
import {Field, reduxForm} from "redux-form";
import {InputWithValidation} from "../common/FormsControl/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {loginUser, logoutUser} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import style from '../common/FormsControl/FormsControls.module.css'


const Login = (props) => {

    const onSubmit = (formData) => {
        const {login, password, rememberMe, captcha} = formData;
        props.loginUser(login, password, rememberMe, captcha)

    }
    if (props.isAuth) {
        return <Redirect to={`/profile`}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}
                            captchaUrl={props.captchaUrl}
            />
        </div>
    )
}


const LoginForm = (props) => {
    const captchaUrl = props.captchaUrl;
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'}
                       component={InputWithValidation}
                       placeholder={'login'}
                       validate={[requiredField]}
                />
            </div>
            <div>
                <Field name={'password'}
                       component={InputWithValidation}
                       type={'password'}
                       placeholder={'password'}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={InputWithValidation} type={'checkbox'}/> remember me
            </div>
            {captchaUrl && <div><img src={captchaUrl} alt="captcha"/></div>}
            {captchaUrl && <div><Field name={'captcha'} component={InputWithValidation} type={'text'}/></div>}
            {
                props.error &&
                <div className={style.form_summary_error}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const mapStateToProps = (state) => {
    return {isAuth: state.authReducer.isAuth, captchaUrl: state.authReducer.captchaUrl}
}

export default connect(mapStateToProps, {loginUser, logoutUser})(Login);
