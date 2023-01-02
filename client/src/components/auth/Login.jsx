import React, { useEffect, useState } from 'react';
import './auth.css';
import Input from '../../utils/input/Input';
import { login } from '../../actions/user/login';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../actions/user/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    dispatch(auth());

    useEffect(() => {
        dispatch(auth());
    }, []);
    console.log('ok');
    const isAuth = useSelector((state) => state.user.isAuth);

    if (isAuth == true) {
        return <Redirect to="/drive" />;
    }

    return (
        <div className="auth" disabled>
            <div className="auth__header">Login</div>
            <Input
                value={username}
                setValue={setUsername}
                type="text"
                placeholder="Enter username"
            />
            <Input
                value={password}
                setValue={setPassword}
                type="password"
                placeholder="Enter password"
            />
            <button
                className="auth__btn"
                onClick={() => dispatch(login(username, password))}
            >
                Sign in
            </button>
        </div>
    );
};

export default Login;
