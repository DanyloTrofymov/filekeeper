"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpFile = exports.dumpUser = void 0;
const dumpUser = (user) => {
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        files: user.files,
        disk_space: user.disk_space,
        used_space: user.used_space,
    };
};
exports.dumpUser = dumpUser;
const dumpFile = (file) => {
    return {
        _id: file._id,
        name: file.name,
        type: file.type,
        size: file.size,
        path: file.path,
        date: file.date,
        user: file.user,
        parent: file.parent,
        childs: file.childs,
    };
};
exports.dumpFile = dumpFile;
//# sourceMappingURL=dumps.js.map