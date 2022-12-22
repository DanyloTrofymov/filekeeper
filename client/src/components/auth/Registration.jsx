import React, { useState } from 'react';
import './auth.css';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    return (
        <div className="auth" disabled>
            <div className="auth__header">Registration</div>
            <Input
                value={email}
                setValue={setEmail}
                type="text"
                placeholder="Enter email"
            />
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
            <Input
                value={repeatPassword}
                setValue={setRepeatPassword}
                type="password"
                placeholder="Repeat password"
            />
            <button
                className="auth__btn"
                onClick={() =>
                    registration(email, username, password, repeatPassword)
                }
            >
                Sign up
            </button>
        </div>
    );
};

export default Registration;
