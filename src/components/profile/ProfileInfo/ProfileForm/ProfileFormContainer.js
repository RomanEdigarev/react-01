import React from "react";
import ProfileDataForm from "./ProfileDataForm";


const ProfileFormContainer = ({profile, saveProfileDataChanges, setChangingProfileData}) => {
    const {aboutMe, fullName, contacts, lookingForAJob, lookingForAJobDescription} = profile;
    const profileData = {aboutMe, fullName, lookingForAJob, lookingForAJobDescription};

    const onSaveData = (formData) => {
        saveProfileDataChanges(formData)
            .then(
                () => {
                    setChangingProfileData(false);
                }
            )
    }


    return (
        <ProfileDataForm profileData={profileData}
                         contacts={contacts}
                         onSubmit={onSaveData}
                         initialValues={profile}
        />
    )
}

export default ProfileFormContainer;