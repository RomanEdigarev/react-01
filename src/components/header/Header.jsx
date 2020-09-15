import React from "react";
import style from './Header.module.css';
import {NavLink} from "react-router-dom";


const Header = (props) => {

    return (

        <header className={style.header}>
            <img src={'https://upload.wikimedia.org/wikipedia/commons/4/45/Parrot_Logo.png'}/>

            <div className={style.login__block}>
                {props.isAuth ? <div>{props.login}  <button onClick={props.logoutUser}>LogOut</button></div> : <NavLink to={'/login'}>Login</NavLink>}
            </div>

        </header>
    )
}

export default Header;