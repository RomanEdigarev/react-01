import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getProfileStatusThunkCreator, updateStatusThunkCreator} from "../../../../redux/profileReducer";


const mapStateToProps = (state) => {
    return {status: state.profileReducer.profile.status, userId: state.profileReducer.profile.userId}
}


const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateMode = () => {
        setEditMode(true);
    }

    const deactivateEditMOde = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={activateMode} >{props.status || '-----'}</span>
            </div>}
            {editMode &&
            <div>
                <input onBlur={deactivateEditMOde} onChange={onStatusChange}  autoFocus={true} value={status}/>
            </div>}
        </div>
    )
}

const ProfileStatusContainer = connect(mapStateToProps,
    {updateStatus: updateStatusThunkCreator, getStatus: getProfileStatusThunkCreator})
(ProfileStatusWithHooks);
export default ProfileStatusContainer;
