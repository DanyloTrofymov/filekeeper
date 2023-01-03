"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filePath(path) {
    return function (req, res, next) {
        req.storagePath = path;
        next();
    };
}
exports.default = filePath;
//# sourceMappingURL=filepath.js.map