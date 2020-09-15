import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import Messages from "./Messages";
import {compose} from "redux";
import {addMessage} from "../../redux/friendsReducer";


const mapStateToProps = (state) => {
    const friendsData = state.friendsReducer.friends.friendsData;
    return { friendsData }
}

const MessagesContainer = compose(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Messages)

export default MessagesContainer;