"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileService = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
async function uploadFileService(dbFile, file, storagePath) {
    const path = `${storagePath}\\${dbFile.user}\\${dbFile.path}`;
    const exists = await fs_extra_1.default.pathExists(path);
    if (exists) {
        throw new error_1.HttpError(403, `File with name ${dbFile.name} exists on path ${dbFile.path}`, error_1.ERRORS.FILE_EXISTS, {
            file: dbFile.name,
        });
    }
    try {
        file.mv(path);
        const dbFileRes = await File_1.default.create(dbFile);
        if (dbFileRes.parent) {
            const parents = await getParents(dbFileRes);
            await parents.forEach(async (parent) => {
                if (parent != null) {
                    parent.size += dbFileRes.size;
                    await File_1.default.updateOne({ _id: parent._id }, { $inc: { size: dbFileRes.size } });
                }
            });
        }
        return dbFileRes;
    }
    catch (e) {
        throw new error_1.HttpError(500, 'Internal server error', error_1.ERRORS.INTERNAL_ERROR);
    }
}
exports.uploadFileService = uploadFileService;
async function getParents(file) {
    const parent = await File_1.default.findOne({ _id: file.parent });
    const deepParent = [];
    if (parent) {
        const parentParent = await getParents(parent);
        deepParent.unshift(...parentParent);
    }
    return [...deepParent, parent];
}
//# sourceMappingURL=UploadFile.js.map