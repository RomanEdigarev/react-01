import React from "react";
import {
    addPost,
    getProfileStatusThunkCreator,
    getProfileThunkCreator, saveAvatar,
    saveProfileDataChanges, updateStatusThunkCreator, changeProfileData
} from "../../redux/profileReducer";
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {getMyProfileThunkCreator} from "../../redux/authReducer";

import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../redux/types/types";


// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: () => { dispatch(addPostActionCreator()) },
//         updateNewPost: (text) => { dispatch(updateNewPostTextActionCreator(text)) }
//     }
// }


type MapStateToPropsProfileContainer = {
    profile: ProfileType
    authId : number | null
}

type MapDispatchToPropsProfileContainer = {
    getProfile : (userId: number) => void
    getMyProfile : () => void
    getStatus : () => void
    updateStatus : () => void
    addPost : () => void
    saveAvatar : () => void
    saveProfileDataChanges : () => void
    changeProfileData : () => void
}

let mapStateToProps = (state : AppStateType) : MapStateToPropsProfileContainer => {
    return {profile: state.profileReducer.profile, authId: state.authReducer.id}
}

type PropsTypeProfile = MapStateToPropsProfileContainer & MapDispatchToPropsProfileContainer & RouteComponentProps<any>

class Profile extends React.Component<PropsTypeProfile> {


    refreshProfile() {

        if (this.props.match.params.userId) {
            this.props.getProfile(this.props.match.params.userId);
        } else {
            this.props.getMyProfile();
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:any, prevState: any, snapshot:any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        const {profile} = this.props
        return (
            <div>
                <ProfileInfo profile={profile}
                             isOwner={+this.props.match.params.userId === this.props.authId}
                             saveAvatar={this.props.saveAvatar}
                             saveProfileDataChanges={this.props.saveProfileDataChanges}
                             changeProfileData={this.props.changeProfileData}
                />
                {/*<MyPostsContainer profile={profile}*/}
                {/*                  addPost={this.props.addPost}*/}
                {/*/>*/}
            </div>
        )
    }
}


const ProfileContainer = compose(
    connect<MapStateToPropsProfileContainer, MapDispatchToPropsProfileContainer | any, null, AppStateType>(mapStateToProps,
        {
            getProfile: getProfileThunkCreator, getMyProfile: getMyProfileThunkCreator,
            getStatus: getProfileStatusThunkCreator, updateStatus: updateStatusThunkCreator,
            addPost, saveAvatar, saveProfileDataChanges, changeProfileData
        }),
    withRouter,
    withAuthRedirect,
)(Profile)

export default ProfileContainer;