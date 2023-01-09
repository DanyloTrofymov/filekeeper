import React from 'react';
import { useSelector } from 'react-redux';
import './userSpace.css';
const UserSpace = () => {
    function convertSize(size) {
        if (size > 1024 ** 3) {
            return `${(size / 1024 ** 3).toFixed(1)} gb`;
        }
        if (size > 1024 ** 2) {
            return `${(size / 1024 ** 2).toFixed(1)} mb`;
        }
        if (size > 1024) {
            return `${(size / 1024).toFixed(1)} kb`;
        }
        return `${size} bytes`;
    }

    const user = useSelector((state) => state.user.currentUser);
    return (
        <div className="userSpace">
            <p>
                used {convertSize(user.used_space)} of{' '}
                {convertSize(user.drive_space)}
            </p>
            <div className="userSpace__space-bar">
                <div
                    className="userSpace__used-bar"
                    style={{
                        width: Math.round(
                            (user.used_space * 200) / user.drive_space,
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default UserSpace;
