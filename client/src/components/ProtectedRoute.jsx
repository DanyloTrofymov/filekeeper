import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user/auth';

const ProtectedRoute = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth());
    }, []);
    const isAuth = useSelector((state) => state.user.isAuth);
    if (isAuth == undefined) {
        return (
            <div className="center">
                <span className="loader"></span>
            </div>
        );
    }
    if (isAuth == false) {
        return <Redirect to="/login" />;
    }
    if (isAuth == true) {
        return <Route {...props} />;
    }
};

export default ProtectedRoute;
//<Redirect to='/login'/>
