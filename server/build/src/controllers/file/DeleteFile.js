"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileController = void 0;
const file_1 = __importDefault(require("../../services/file"));
const error_1 = require("../../utils/error");
const User_1 = __importDefault(require("../../models/User"));
const File_1 = __importDefault(require("../../models/File"));
const User_2 = __importDefault(require("../../models/User"));
async function deleteFileController(req, res, next) {
    const query = req.query;
    const data = { ...req.body, ...query };
    const user = await User_1.default.findOne({ _id: data.userId });
    try {
        const file = await File_1.default.findOne({
            _id: data.id,
            user: data.userId,
        });
        if (!file) {
            throw new error_1.HttpError(403, 'File not found', error_1.ERRORS.NOT_FOUND('FILE'));
        }
        if (!user) {
            throw new error_1.HttpError(400, `User with id ${data.userId} was not found`, error_1.ERRORS.NOT_FOUND('USER'));
        }
        const childs = await getChilds(file);
        childs.push(file);
        await childs.forEach(async (child) => {
            await file_1.default.deleteFile(child, req.storagePath);
            if (user.used_space - child.size < 0) {
                await User_2.default.updateOne({ _id: user._id }, { used_space: 0 });
            }
            else {
                await User_2.default.updateOne({ _id: user._id }, { $inc: { used_space: -child.size } });
            }
            user.used_space -= child.size;
        });
        return res.json({
            data: {
                ...childs,
            },
            status: 1,
        });
    }
    catch (e) {
        next(e);
    }
}
exports.deleteFileController = deleteFileController;
async function getChilds(file) {
    const children = await File_1.default.find({ _id: file.childs });
    const deepChildren = [];
    for (const child of children) {
        const childChildren = await getChilds(child);
        deepChildren.unshift(...childChildren);
    }
    return [...deepChildren, ...children];
}
//# sourceMappingURL=DeleteFile.js.map