import React, { useState } from 'react';
import './login.css';
import Input from '../../utils/input/Input';
import { login } from '../../actions/user';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="login" disabled>
            <div className="login__header">Login</div>
            <Input
                value={username}
                setValue={setUsername}
                type="text"
                placeholder="Username"
            />
            <Input
                value={password}
                setValue={setPassword}
                type="password"
                placeholder="Password"
            />
            <button
                className="login__btn"
                onClick={() => login(username, password)}
            >
                Sign In
            </button>
        </div>
    );
};

export default Login;
