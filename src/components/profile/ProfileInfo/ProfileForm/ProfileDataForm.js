import {Field, reduxForm} from "redux-form";
import React from "react";



const ProfileData = ({profile, handleSubmit}) => {
    const {aboutMe, fullName, contacts, lookingForAJob, lookingForAJobDescription} = profile;
    const data = {aboutMe, fullName, contacts, lookingForAJob, lookingForAJobDescription};

    const keys = Object.keys(data)
    return (
        <form onSubmit={handleSubmit}>
            {keys.map(key => {
                return (
                    <div>
                        <label htmlFor={key}>{key}</label>
                        <Field name={key} component={'input'} type={'text'} placeholder={key}/>
                    </div>

                )

            })
            }
            <button>Save Changes</button>
        </form>


    )
}

const ProfileDataForm = reduxForm({form: 'profileDataForm'})(ProfileData);
export default ProfileDataForm;