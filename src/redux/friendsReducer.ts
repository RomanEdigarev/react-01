const CREATE_NEW_MESSAGE_FROM_FRIEND = 'CREATE-NEW-MESSAGE-FROM-FRIEND';
const ADD_MESSAGE_FROM_FRIEND = 'ADD-MESSAGE-FROM-FRIEND';

type FriendsDataType = {
    id: number | null
    name: string | null
    avatar: string | null
    messages: Array<string>
}

let initialState = {
    friends: {
        friendsData: [
            {
                id: 1, name: 'Roma', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
                messages: ['Hello! My name is Roma '],
            },
            {
                id: 2, name: 'Tanya', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-378-456330.png',
                messages: ['Hello! My name is Tanya '],
            },
            {
                id: 3, name: 'Timofey', avatar: 'https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png',
                messages: ['Hello! My name is Timofey'],
            },
            {
                id: 4, name: 'Polina', avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
                messages: ['Hello! My name is Polina '],
            },
        ] as Array<FriendsDataType>
    },
}

type InitialStateType = typeof initialState;

const friendsReducer = (state = initialState, action: any) : InitialStateType => {
    const stateCopy = {...state};
    stateCopy.friends.friendsData = [...state.friends.friendsData];
    let friendsData = stateCopy.friends.friendsData;

    switch (action.type) {
        case ADD_MESSAGE_FROM_FRIEND: {
            let friend: any = friendsData.find(friend => friend.id === action.id);
            friend.messages.push(`${action.newMessageText}\n`);
            return stateCopy;
        }

        default:
            return state;
    }
}


type AddMessageActionType = {
    type: typeof ADD_MESSAGE_FROM_FRIEND
    id:number
    newMessageText:string
}
export const addMessage = (id: number, newMessageText: string) : AddMessageActionType => {

    const ADD_MESSAGE_FROM_FRIEND = 'ADD-MESSAGE-FROM-FRIEND';
    return {
        type: ADD_MESSAGE_FROM_FRIEND, id, newMessageText
    }
}



export default friendsReducer;