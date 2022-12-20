import { User } from '../models/User';

export const dumpUser = (
    user: User & {
        accessToken?: string;
        refreshToken?: string;
    },
) => {
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        files: user.files,
    };
};
