import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/user';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    return (
        <div className="navbar">
            <div className="container">
                <a
                    alt="FileKeeper"
                    className="navbar__logo"
                    href={location.protocol + '//' + location.host + '/'}
                >
                    FileKeeper
                </a>
                {!isAuth && (
                    <div className="navbar__login">
                        <div className="navbar__login__link">
                            <NavLink to="/registration">Sign up</NavLink>
                        </div>
                        <div className="navbar__login__link">
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </div>
                )}
                {isAuth && (
                    <div className="navbar__login">
                        <div className="navbar__username">{user.username}</div>
                        <div
                            className="navbar__login__link"
                            onClick={() => dispatch(logout())}
                        >
                            <NavLink to="/login">Log out</NavLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
