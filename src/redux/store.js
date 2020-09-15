import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";

const CREATE_NEW_MESSAGE_FROM_FRIEND = 'CREATE-NEW-MESSAGE-FROM-FRIEND';
const ADD_MESSAGE_FROM_FRIEND = 'ADD-MESSAGE-FROM-FRIEND';
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let store = {
    _state: {
        profile: {
            postsData: [
                {id: 1, text: 'Hi, how are you', likesCount: 12},
                {id: 2, text: 'my first post', likesCount: 10},
            ],
            newPostText: 'kamasutra'
        },

        friends: {
            friendsData: [
                {
                    id: 1, name: 'Roma', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
                    messages: ['Hello! My name is Roma '],
                    newMessage: ''
                },
                {
                    id: 2, name: 'Tanya', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-378-456330.png',
                    messages: ['Hello! My name is Tanya '],
                    newMessage: ''
                },
                {
                    id: 3, name: 'Timofey', avatar: 'https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png',
                    messages: ['Hello! My name is Timofey'],
                    newMessage: ''
                },
                {
                    id: 4, name: 'Polina', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
                    messages: ['Hello! My name is Polina '],
                    newMessage: ''
                },
            ]
        },
    },

    _subscriber() {
        console.log('update subscribers')
    },

    subscribe(observer) {
        this._subscriber = observer;
    },

    getState() {
        return this._state
    },

    dispatch(action) { // action - объект который описывает то, что мы хотим сделать, обязательно текстовое свойство type { type: 'ADD-POST'}
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.friends = friendsReducer(this._state.friends, action);
        this._subscriber(this._state);
    }
}

export default store;