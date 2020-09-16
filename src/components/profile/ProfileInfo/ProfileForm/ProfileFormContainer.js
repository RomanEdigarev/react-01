import React from "react";
import ProfileDataForm from "./ProfileDataForm";


const ProfileFormContainer = ({profile, changeProfileData, setChangingProfileData}) => {
    const {aboutMe, fullName, contacts, lookingForAJob, lookingForAJobDescription} = profile;
    const profileData = {aboutMe, fullName, lookingForAJob, lookingForAJobDescription};

    const onSaveData = (formData) => {
        changeProfileData(formData);
        setChangingProfileData(false);
    }


    return (
       <ProfileDataForm profileData={profileData}
                        contacts={contacts}
                        onSubmit={onSaveData}
       />
    )
}

export default ProfileFormContainer;