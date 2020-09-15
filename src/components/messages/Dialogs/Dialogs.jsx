import React from "react";
import style from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";

const Dialogs = (props) => {

    const dialogs = props.dialogsWithFriends.map(dialog => <Dialog id={dialog.id} name={dialog.name}/>)

    return (
        <div className={style.dialogs}>
            {dialogs}
        </div>
    )
}

export default Dialogs;