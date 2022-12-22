import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div alt="FileKeeper" className="navbar__logo">
                    FileKeeper
                </div>
                <div className="navbar__login">
                    <NavLink to="/login">Sign in</NavLink>
                </div>
                <div className="navbar__registration">
                    <NavLink to="/registration">Sign up</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
