import {Field, reduxForm} from "redux-form";
import React from "react";

const ProfileContacts = ({contacts, handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    {
                        Object.keys(contacts).map(contact => {
                            return (
                                <div>
                                    <label htmlFor={contact}>{contact}</label>
                                    <Field name={contact} component={'input'} type={'text'} placeholder={contact}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button>Save Changes</button>
        </form>
    )
}

const ProfileContactsFrom = reduxForm({form: 'profileContactsData'})(ProfileContacts);
export default ProfileContactsFrom;