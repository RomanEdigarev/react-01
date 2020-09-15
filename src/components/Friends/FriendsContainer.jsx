import {connect} from "react-redux";
import Friends from "./Frindes";

const mapStateToProps = (state) => {

    return {
        friendsData: state.friendsReducer.friends.friendsData,
    }
}

const FriendsContainer = connect(mapStateToProps, null)(Friends);

export default FriendsContainer;