import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/authReducer";


const mapStateToProps = (state) => {

    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login,
    }
}


class HeaderClass extends React.Component {

    componentDidMount() {

    }

    render() {

        return (
            <Header {...this.props}/>
        )
    }
}

const HeaderContainer = connect(mapStateToProps, {logoutUser})(HeaderClass);
export default HeaderContainer;