import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import ProfileContainer from "./components/profile/ProfileContainer";
// import MessagesContainer from "./components/messages/MessagesContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import NavigationContainer from "./components/navigation/Navigation";
import LoginContainer from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";

const MessagesContainer = React.lazy(()=>import("./components/messages/MessagesContainer"));


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if(!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <div>
                    <NavigationContainer/>
                    <FriendsContainer/>
                </div>
                <div className={'app-wrapper__content'}>
                    <Route path={'/profile/:userId?'}><ProfileContainer/>
                    </Route>
                    <Suspense fallback={<Preloader/>}>
                        <Route path={'/messages'}><MessagesContainer/></Route>
                    </Suspense>
                    <Route path={'/news'}><News/></Route>
                    <Route path={'/music'}><Music/></Route>
                    <Route path={'/settings'}><Settings/></Route>
                    <Route path={'/users'}><UsersContainer/></Route>
                    <Route path={'/login'}><LoginContainer/></Route>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { initialized: state.appReducer.initialized }
}

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}),
)(App);

const MainApp = (props) => {
    return (
        <Router>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </Router>
    )
}
export default MainApp;

