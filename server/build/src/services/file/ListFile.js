"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFileService = void 0;
const File_1 = __importDefault(require("../../models/File"));
const error_1 = require("../../utils/error");
const file_1 = require("../../types/file");
async function listFileService(data) {
    if (data.parent == '') {
        throw new error_1.HttpError(400, 'ParentId must be not empty.', error_1.ERRORS.NOT_FOUND('FILES'));
    }
    if (data.sort && !file_1.allowedSort.includes(data.sort)) {
        throw new error_1.HttpError(400, 'No sort with this property.', error_1.ERRORS.NOT_FOUND('FILES'));
    }
    if (data.filter) {
        data.filter.forEach((param) => {
            if (!file_1.allowedFilter.includes(param)) {
                throw new error_1.HttpError(400, 'No filter with paremetr', error_1.ERRORS.NOT_FOUND('FILES'));
            }
        });
    }
    try {
        let files;
        if (data.sort && data.filter) {
            const filter = filterProperty(data.filter);
            files = await File_1.default.find({
                user: data.userId,
                parent: data.parent,
                type: filter,
            }).sort(data.sort);
        }
        else if (data.filter) {
            const filter = filterProperty(data.filter);
            files = await File_1.default.find({
                user: data.userId,
                parent: data.parent,
                type: filter,
            });
        }
        else if (data.sort) {
            files = await File_1.default.find({
                user: data.userId,
                parent: data.parent,
            }).sort(data.sort);
        }
        else {
            files = await File_1.default.find({
                user: data.userId,
                parent: data.parent,
            });
        }
        const sorted = files.filter((file) => file.type == 'dir');
        files
            .filter((file) => file.type != 'dir')
            .forEach((file) => sorted.push(file));
        return sorted;
    }
    catch (e) {
        throw new error_1.HttpError(500, `Internal server error`, error_1.ERRORS.INTERNAL_ERROR);
    }
}
exports.listFileService = listFileService;
function filterProperty(filter) {
    const dbFilter = ['dir'];
    filter.forEach((prop) => {
        switch (prop) {
            case 'doc': {
                dbFilter.push('doc', 'docx', 'pdf', 'xls', 'xlsx');
                break;
            }
            case 'music': {
                dbFilter.push('mp3', 'wav');
                break;
            }
            case 'pic': {
                dbFilter.push('jpg', 'jpeg', 'png');
                break;
            }
            case 'vid': {
                dbFilter.push('mp4', 'm4a', 'mov');
                break;
            }
        }
    });
    return dbFilter;
}
//# sourceMappingURL=ListFile.js.map