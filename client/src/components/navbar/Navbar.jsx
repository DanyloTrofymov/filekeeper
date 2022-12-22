import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../reducers/user';

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="container">
                <div alt="FileKeeper" className="navbar__logo">
                    FileKeeper
                </div>
                {!isAuth && <div className="navbar__login">
                    <NavLink to="/login">Sign in</NavLink>
                </div>}
                {!isAuth && <div className="navbar__registration">
                    <NavLink to="/registration">Sign up</NavLink>
                </div>}
                {isAuth && <div className="navbar__login" onClick={()=> dispatch(logout())}>
                    <NavLink to="/login">Log out</NavLink>
                </div>}
            </div>
        </div>
    );
};

export default Navbar;
