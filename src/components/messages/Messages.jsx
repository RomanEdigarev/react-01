import React from "react";
import {Redirect, Route} from 'react-router-dom'
import style from './Messages.module.css';
import Dialogs from "./Dialogs/Dialogs";
import Message from "./Dialogs/Message/Message";


const Messages = (props) => {
    const {friendsData, addMessage, createNewMessage } = props

    const messages = friendsData.map(friend => {
        return (
            <Route path={`/messages/${friend.id}`}>
                <Message id={friend.id}
                         messages={friend.messages}
                         name={friend.name}
                         newMessage={friend.newMessage}
                         addMessage={addMessage}
                         createNewMessage={createNewMessage}
                />
            </Route>
        )
    })

    return (
        <div className={style.messages}>
            <Dialogs dialogsWithFriends={friendsData}/>
            <div className={style.message}>
                {messages}
            </div>
        </div>
    )
}


export default  Messages;
