import React from "react";
import {
    addPost, changeProfileData,
    getProfileStatusThunkCreator,
    getProfileThunkCreator, saveAvatar, updateStatusThunkCreator,
} from "../../redux/profileReducer";
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {withRouter} from "react-router";
import {compose} from "redux";
import {getMyProfileThunkCreator} from "../../redux/authReducer";
import MyPostsContainer from "./MyPosts/MyPostContainer";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: () => { dispatch(addPostActionCreator()) },
//         updateNewPost: (text) => { dispatch(updateNewPostTextActionCreator(text)) }
//     }
// }


let mapStateToProps = (state) => {
    return {profile: state.profileReducer.profile, authId: state.authReducer.id}
}

class Profile extends React.Component {


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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId != prevProps.match.params.userId) {
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
                             changeProfileData={this.props.changeProfileData}
                />
                <MyPostsContainer profile={profile}
                                  addPost={this.props.addPost}
                />
            </div>
        )
    }
}


const ProfileContainer = compose(
    connect(mapStateToProps,
        {
            getProfile: getProfileThunkCreator, getMyProfile: getMyProfileThunkCreator,
            getStatus: getProfileStatusThunkCreator, updateStatus: updateStatusThunkCreator,
            addPost, saveAvatar, changeProfileData
        }),
    withRouter,
    withAuthRedirect,
)(Profile)

export default ProfileContainer;