import React, {useState} from "react";
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusWithHooks";
import {Field, reduxForm} from "redux-form";


const ProfileInfo = (props) => {
    const {profile, isOwner, saveAvatar, changeProfileData} = props;
    const [isChangingProfileData, setChangingProfileData] = useState(false);
    if (!profile.userId) {
        return <Preloader/>
    }

    const avatarSelected = (e) => {
        if (e.target.files.length) {
            const avatar = e.target.files[0];
            saveAvatar(avatar);
        }

    }

    const onSaveData = (profileData) => {
        debugger
        changeProfileData(profileData);
        setChangingProfileData(false);
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
            {isOwner && isChangingProfileData ?
                <ProfileDataReduxForm profile={profile} onSubmit={onSaveData}/> :
                <ProfileData profile={profile}/>}
            {!isChangingProfileData && isOwner &&
            <button onClick={() => setChangingProfileData(true)}>Change Profile Data</button>}

        </div>
    )
}


const ProfileData = ({profile}) => {
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

const ProfileDataForm = ({profile, handleSubmit}) => {
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
            <b>Contacts</b>
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
const ProfileDataReduxForm = reduxForm({form: 'profileDataForm'})(ProfileDataForm);

const Contacts = ({contactTitle, contactValue}) => {

    return (
        <div className={style.contact}>
            {contactTitle} : {contactValue}
        </div>
    )
}

export default ProfileInfo;