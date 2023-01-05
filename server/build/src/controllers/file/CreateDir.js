"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirController = void 0;
const file_1 = __importDefault(require("../../services/file"));
const File_1 = __importDefault(require("../../models/File"));
const validator_1 = __importDefault(require("../../utils/validator"));
const dumps_1 = require("../../utils/dumps");
const error_1 = require("../../utils/error");
const typegoose_1 = require("@typegoose/typegoose");
async function createDirController(req, res, next) {
    const data = { ...req.body };
    const validationRules = {
        userId: ['required', 'string'],
        name: ['required', 'string'],
        type: ['required', 'string'],
        parent: ['string'],
    };
    try {
        (0, validator_1.default)(data, validationRules);
        const file = new File_1.default({
            _id: new typegoose_1.mongoose.Types.ObjectId(),
            name: data.name,
            type: data.type,
            parent: data.parent || null,
            user: data.userId,
        });
        let dbFile;
        if (!data.parent) {
            file.path = data.name;
            dbFile = await file_1.default.createDir(file, req.storagePath);
        }
        else {
            const parentFile = await File_1.default.findOne({ _id: data.parent });
            if (!parentFile) {
                throw new error_1.HttpError(500, `Internal server error. Could not find dir ${data.parent} for user ${data.userId}`, error_1.ERRORS.INTERNAL_ERROR);
            }
            file.path = `${parentFile.path}\\${data.name}`;
            dbFile = await file_1.default.createDir(file, req.storagePath);
            await File_1.default.updateOne({ _id: parentFile._id }, { $push: { childs: file._id } });
        }
        return res.json({
            data: {
                ...(0, dumps_1.dumpFile)(dbFile),
            },
            status: 1,
        });
    }
    catch (e) {
        return next(e);
    }
}
exports.createDirController = createDirController;
//# sourceMappingURL=CreateDir.js.map