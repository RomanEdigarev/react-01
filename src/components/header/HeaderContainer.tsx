import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/authReducer";
import {AppStateType, DispatchType} from "../../redux/reduxStore";


type MapStateToPropsHeaderContainer = {
    isAuth: boolean,
    login: string | null,
}

type MapDispatchToPropsHeaderContainer = {
    logoutUser : () => void
}

type PropsType = MapStateToPropsHeaderContainer & MapDispatchToPropsHeaderContainer

const mapStateToProps = (state: AppStateType) : MapStateToPropsHeaderContainer => {

    return {
        isAuth: state.authReducer.isAuth,
        login: state.authReducer.login,
    }
}


class HeaderClass extends React.Component<PropsType> {

    componentDidMount() {

    }

    render() {

        return (
            <Header {...this.props}/>
        )
    }
}

const HeaderContainer = connect<MapStateToPropsHeaderContainer, MapDispatchToPropsHeaderContainer, null, AppStateType>
    (mapStateToProps, {logoutUser})(HeaderClass);
export default HeaderContainer;