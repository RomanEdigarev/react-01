import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {InputWithValidation} from "../common/FormsControl/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {loginUser, logoutUser} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import style from '../common/FormsControl/FormsControls.module.css'
import {AppStateType} from "../../redux/reduxStore";

type LoginProps = MapDispatchToProps & MapStateToProps
type FormData = {
    login: string
    password :string
    rememberMe : boolean
    captchaUrl : string
}
const Login : FC<LoginProps> = (props) => {

    const onSubmit = (formData : FormData) => {
        const {login, password, rememberMe, captchaUrl} = formData;
        props.loginUser(login, password, rememberMe, captchaUrl)
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


const LoginForm : FC<InjectedFormProps<FormData, {captchaUrl:string|null}> & {captchaUrl:string|null}> = (props) => {
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

const LoginReduxForm = reduxForm<FormData, {captchaUrl:string|null}>({
    form: 'loginForm'
})(LoginForm)


type MapStateToProps = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToProps = {
    loginUser: (login: string, password: string, rememberMe: boolean, captcha: string) => void
    logoutUser: () => void
}
const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {isAuth: state.authReducer.isAuth, captchaUrl: state.authReducer.captchaUrl}
}

export default connect<MapStateToProps, MapDispatchToProps, unknown, AppStateType>(mapStateToProps, {
    loginUser,
    logoutUser
})(Login);
