import React from "react";
import ProfileDataForm from "./ProfileDataForm";
import ProfileContactsFrom from "./ProfileContactsForm";


const ProfileFormContainer = ({profile,onSaveData,onSaveContacts}) => {

    return (
        <div>
            <ProfileDataForm profile={profile}
                             onSubmit={onSaveData}
            />
            <ProfileContactsFrom contacts={profile.contacts}
                                 onSubmit={onSaveContacts}
            />
        </div>

    )
}

export default ProfileFormContainer;