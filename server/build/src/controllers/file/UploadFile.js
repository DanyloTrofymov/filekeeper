"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileController = void 0;
const File_1 = __importDefault(require("../../models/File"));
const User_1 = __importDefault(require("../../models/User"));
const file_1 = require("../../types/file");
const error_1 = require("../../utils/error");
const file_2 = __importDefault(require("../../services/file"));
const validator_1 = __importDefault(require("../../utils/validator"));
const dumps_1 = require("../../utils/dumps");
const buffer_1 = require("buffer");
const typegoose_1 = require("@typegoose/typegoose");
const User_2 = __importDefault(require("../../models/User"));
async function uploadFileController(req, res, next) {
    const validationRules = {
        userId: ['required', 'string'],
        parent: ['string'],
    };
    const data = { ...req.body };
    const parent = await File_1.default.findOne({
        user: data.userId,
        _id: req.body.parent,
    });
    const user = await User_1.default.findOne({ _id: data.userId });
    try {
        if (!req.files) {
            throw new error_1.HttpError(400, 'File need to be uploaded', error_1.ERRORS.NOT_FOUND('FILE'));
        }
        const file = { ...req.files.file };
        (0, validator_1.default)(data, validationRules);
        const type = file.name.toLowerCase().split('.').pop() || '';
        if (!file_1.allowedTypes.includes(type)) {
            throw new error_1.HttpError(400, `You can\`t upload file with type ${type}`, error_1.ERRORS.WRONG_TYPE);
        }
        if (!user) {
            throw new error_1.HttpError(400, `User with id ${data.userId} was not found`, error_1.ERRORS.NOT_FOUND('USER'));
        }
        if (user.used_space + file.size > user.drive_space)
            throw new error_1.HttpError(400, `There is no space for this file on your drive`, error_1.ERRORS.NO_SPACE_ON_DRIVE);
        file.name = buffer_1.Buffer.from(file.name, 'ascii').toString('utf8');
        let filePath = file.name;
        if (parent) {
            filePath = `${parent.path}\\${file.name}`;
        }
        const dbFile = new File_1.default({
            _id: new typegoose_1.mongoose.Types.ObjectId(),
            name: file.name,
            type: type,
            size: file.size,
            path: filePath,
            parent: parent?.id,
            user: user._id,
        });
        const dbFileRes = await file_2.default.uploadFile(dbFile, file, req.storagePath);
        await User_2.default.updateOne({ _id: user._id }, { $inc: { used_space: dbFileRes.size } });
        return res.json({
            data: {
                ...(0, dumps_1.dumpFile)(dbFileRes),
            },
            status: 1,
        });
    }
    catch (e) {
        next(e);
    }
}
exports.uploadFileController = uploadFileController;
//# sourceMappingURL=UploadFile.js.map