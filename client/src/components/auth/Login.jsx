import React, { useState } from 'react';
import './auth.css';
import Input from '../../utils/input/Input';
import actions from '../../actions';
import { useDispatch } from 'react-redux';
import ErrorModal from '../../utils/modal/ErrorModal';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

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
                onClick={() => dispatch(actions.User.login(username, password))}
            >
                Sign in
            </button>
            <ErrorModal />
        </div>
    );
};

export default Login;
