import { User } from '../models/User';

export const dumpUser = (user: User) => {
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        files: user.files,
        disk_space: user.disk_space,
        used_space: user.used_space,
    };
};
