import {Field, reduxForm} from "redux-form";
import React from "react";
import style from "../../../common/FormsControl/FormsControls.module.css";


const ProfileData = (props) => {
    const {profileData, contacts, handleSubmit, error} = props;
    return (
        <form onSubmit={handleSubmit}>

            {
                Object.keys(profileData).map(key => {
                    if (key === 'lookingForAJob') {
                        return (
                            <div>
                                <b>{key}</b>
                                <Field name={key} component={'input'} type={'checkbox'}/>
                            </div>
                        )
                    }
                    return (
                        <div key={key}>
                            <b>{key}</b>
                            <Field name={key} component={'input'} type={'text'} placeholder={key}/>
                        </div>
                    )
                })

            }
            <b>Contacts</b>
            {
                Object.keys(contacts).map(contact => {
                    return (
                        <div key={contact} >
                            <div>{contact}</div>
                            <div className={style.form_control}><Field name={`contacts.${contact}`} component={'input'} type={'text'}
                                        placeholder={contact}/></div>
                        </div>

                    )
                })
            }
            <button>Save Changes</button>
            <div>
                {

                    error &&
                    <div className={style.form_summary_error}>
                        {error}
                    </div>
                }
            </div>

        </form>
    )
}

const ProfileDataForm = reduxForm({form: 'profileDataForm'})(ProfileData);
export default ProfileDataForm;