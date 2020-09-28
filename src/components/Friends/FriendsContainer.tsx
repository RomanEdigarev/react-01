import {connect} from "react-redux";
import Friends from "./Frindes";
import {AppStateType} from "../../redux/reduxStore";
import {FriendPropsType} from "./Friend/Frined";

type MapStateToPropsFriendsContainer = {
    friendsData : Array<FriendPropsType>
}

const mapStateToProps = (state : AppStateType) : MapStateToPropsFriendsContainer => {
    return {
        friendsData: state.friendsReducer.friends.friendsData,
    }
}

const FriendsContainer = connect<MapStateToPropsFriendsContainer, null, null, AppStateType>(mapStateToProps, null)(Friends);

export default FriendsContainer;