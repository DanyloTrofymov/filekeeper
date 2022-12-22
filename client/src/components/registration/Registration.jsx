import React, { useState } from 'react';
import './registration.css';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    return (
        <div className="registration" disabled>
            <div className="registration__header">Registration</div>
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
                className="registration__btn"
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
