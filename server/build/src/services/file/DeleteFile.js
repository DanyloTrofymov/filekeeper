"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileService = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
async function deleteFileService(file, storagePath) {
    const path = `${storagePath}\\${file.user}\\${file.path}`;
    try {
        await fs_extra_1.default.remove(path);
        await File_1.default.deleteOne({ _id: file._id });
        if (file.parent) {
            const parents = await getParents(file.parent);
            await parents.forEach(async (parent) => {
                if (parent != null) {
                    await File_1.default.updateOne({ _id: parent._id }, { $inc: { size: -file.size } });
                    await File_1.default.updateOne({ _id: parent._id }, { $pull: { childs: file._id } });
                }
            });
        }
        return;
    }
    catch (e) {
        throw new error_1.HttpError(500, 'Internal server error', error_1.ERRORS.INTERNAL_ERROR);
    }
}
exports.deleteFileService = deleteFileService;
async function getParents(file) {
    const parent = await File_1.default.findOne({ _id: file.parent });
    const deepParent = [];
    if (parent) {
        const parentParent = await getParents(parent);
        deepParent.unshift(...parentParent);
    }
    return [...deepParent, parent];
}
//# sourceMappingURL=DeleteFile.js.map