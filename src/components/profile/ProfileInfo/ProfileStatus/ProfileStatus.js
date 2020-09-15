import React from "react";
import {connect} from "react-redux";
import {getProfileStatusThunkCreator, updateStatusThunkCreator} from "../../../../redux/profileReducer";


const mapStateToProps = (state) => {
    return {status: state.profileReducer.profile.status, userId: state.profileReducer.profile.userId}
}

export  class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidMount() {
        this.props.getStatus(this.props.userId)
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false,
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '-----'}</span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>}
            </div>
        )
    }


}

const ProfileStatusContainer = connect(mapStateToProps,{updateStatus: updateStatusThunkCreator, getStatus: getProfileStatusThunkCreator})(ProfileStatus);
export default ProfileStatusContainer;
