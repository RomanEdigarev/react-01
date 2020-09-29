import React, {FC, InputHTMLAttributes, ReactElement, useState} from "react";
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileFormContainer from "./ProfileForm/ProfileFormContainer";
import {ProfileType} from "../../../redux/types/types";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";


type ProfileInfoPropsType  = {
        profile : ProfileType
        isOwner : boolean
        saveAvatar : (avatar: any) => void
        saveProfileDataChanges : () => void
        changeProfileData : () => void
}

const ProfileInfo : FC<ProfileInfoPropsType>= (props) => {
    const {profile, isOwner, saveAvatar, saveProfileDataChanges} = props;
    const [isChangingProfileData, setChangingProfileData] = useState(false);

    if (!profile.userId) {
        return <Preloader/>
    }

    const avatarSelected = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files!.length) {
            const avatar = e.currentTarget.files![0];
            saveAvatar(avatar);
        }

    }



    return (
        <div>
            <div>
                <div>
                    <img className={style.header__img}
                         src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbjVZj9wo_Ql3cgRxHG1zR7NOyEXmNnWA8XQ&usqp=CAU"}/>

                </div>
                <div className={style.information}>
                    <div className={style.information__avatar}>
                        <img
                            src={profile.photos.small || 'https://icons-for-free.com/iconfiles/png/512/avatar-1320568024619304547.png'}
                            alt={'avatar'}/>
                        {isOwner && <input type="file" onChange={avatarSelected}/>}
                    </div>
                    <div className={style.information__description}>{profile.aboutMe}</div>

                </div>
                <div>{profile.fullName}</div>
                <ProfileStatusContainer/>
            </div>

            <div>
                {isOwner && isChangingProfileData ?

                    <ProfileFormContainer profile={profile}
                                          saveProfileDataChanges={saveProfileDataChanges}
                                          setChangingProfileData={setChangingProfileData}
                    />

                    :

                    <ProfileData profile={profile}/>}

                {!isChangingProfileData && isOwner &&
                <button onClick={() => setChangingProfileData(true)}>Change Profile Data</button>}
            </div>


        </div>
    )
}

type ProfileDataProps = {
    profile : ProfileType
}
const ProfileData : FC<ProfileDataProps> = ({profile}) => {
    const {lookingForAJob, lookingForAJobDescription, contacts} = profile;

    return (
        <div>

            <div>
                <h4 className={style.aboutMe__title}>About Me</h4>
                <div>Looking for a job: {lookingForAJob ? 'Yes' : 'No'}</div>
                {lookingForAJob &&
                <div>My skills{lookingForAJobDescription}</div>}
                <div><b>Contacts :</b>
                    {
                        Object.keys(contacts).map(key => {
                            return (
                                <Contacts key={key}
                                          contactTitle={key}
                                          contactValue={contacts[key]}
                                />
                            )
                        })
                    }

                </div>

            </div>
        </div>
    )

}


type ContactsPropsType = {
    contactTitle : string | null
    contactValue : string | null
}
const Contacts  : FC <ContactsPropsType>= ({contactTitle, contactValue}) => {

    return (
        <div className={style.contact}>
            {contactTitle} : {contactValue}
        </div>
    )
}

export default ProfileInfo;