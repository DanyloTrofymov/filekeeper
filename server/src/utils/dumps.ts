import { File } from '../models/File';
import { User } from '../models/User';

export const dumpUser = (user: User) => {
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        drive_space: user.drive_space,
        used_space: user.used_space,
    };
};

export const dumpFile = (file: File) => {
    return {
        _id: file._id,
        name: file.name,
        type: file.type,
        size: file.size,
        path: file.path,
        date: file.date,
        user: file.user,
        parent: file.parent,
    };
};
