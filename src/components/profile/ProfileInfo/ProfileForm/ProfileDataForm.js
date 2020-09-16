import {Field, reduxForm} from "redux-form";
import React from "react";



const ProfileData = ({profileData, contacts, handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            {
                Object.keys(profileData).map(key => {
                    if(key === 'lookingForAJob') {
                        return (
                            <div>
                                <b>{key}</b>
                                <Field name={key} component={'input'} type={'checkbox'}/>
                            </div>
                        )
                    }
                    return (
                        <div>
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
                        <div>
                            <div>{contact}</div>
                            <div><Field name={`contacts.${contact}`} component={'input'} type={'text'} placeholder={contact}/></div>
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