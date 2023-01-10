"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirService = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
async function createDirService(file, storagePath) {
    const userPath = `${storagePath}\\${file.user}\\${file.path}`;
    const exists = await fs_extra_1.default.pathExists(userPath);
    if (exists) {
        throw new error_1.HttpError(403, 'Folder exists', error_1.ERRORS.FILE_EXISTS, {
            file: file.name,
        });
    }
    fs_extra_1.default.ensureDir(userPath);
    return await File_1.default.create(file);
}
exports.createDirService = createDirService;
//# sourceMappingURL=CreateDir.js.map