import React, {FC, useEffect, useState} from 'react'
import {connect} from "react-redux";
import {AppStateType} from "../../../../redux/reduxStore";
import {getProfileStatusThunkCreator, updateStatusThunkCreator} from "../../../../redux/profileReducer";




type MapStateToProps = {
    status: string
    userId: number | undefined
}

type MapDispatchToProps = {
    getStatus: (userId : number) => void
    updateStatus : (status: string) => void
}
type ProfileStatusPropsType = MapStateToProps & MapDispatchToProps

const ProfileStatusFC : FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState<string>('')

    useEffect(() => {
        setStatus(props.status)
    }, [])

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateMode = () => {
        props.updateStatus(status)
        setEditMode(false)
    }

    const onStatusChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateMode}>{status || '-----'}</span>
            </div>}
            {editMode &&
            <div>
                <input onChange={onStatusChange}
                       autoFocus={true}
                       onBlur={deactivateMode}
                       value={status}/>
            </div>}
        </div>
    )
}

const mapStateToProps = (state : AppStateType) : MapStateToProps => {
    return {
        status: state.profileReducer.status,
        userId: state.profileReducer.profile?.userId
    }
}
const ProfileStatusContainer = connect<MapStateToProps, MapDispatchToProps, unknown, AppStateType>(
    mapStateToProps,
    {updateStatus: updateStatusThunkCreator, getStatus : getProfileStatusThunkCreator})
(ProfileStatusFC)

export default ProfileStatusContainer;