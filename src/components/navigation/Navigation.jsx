import React from "react";
import style from './Navigation.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {

    return {userId: state.authReducer.id}
}

const Navigation = (props) => {
    return (
        <nav className={style.nav}>
            <div>
                <NavLink to={`/profile/${props.userId}`} className={style.link} activeClassName={style.activeLink}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/messages'} className={style.link} activeClassName={style.activeLink}>Messages</NavLink>
            </div>
            <div>
                <NavLink to={'/news'} className={style.link} activeClassName={style.activeLink}>News</NavLink>
            </div>
            <div>
                <NavLink to={'/music'} className={style.link} activeClassName={style.activeLink}>Music</NavLink>
            </div>
            <div>
                <NavLink to={'/settings'} className={style.link} activeClassName={style.activeLink}>Settings</NavLink>
            </div>
            <div>
                <NavLink to={'/friends'} className={style.link} activeClassName={style.activeLink}>Friends</NavLink>
            </div>
            <div>
                <NavLink to={'/users'} className={style.link} activeClassName={style.activeLink}>Users</NavLink>
            </div>
        </nav>
    )
}

const NavigationContainer = connect(mapStateToProps)(Navigation)

export default NavigationContainer;