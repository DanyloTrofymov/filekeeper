"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListFile_1 = require("./ListFile");
const CreateDir_1 = require("./CreateDir");
const UploadFile_1 = require("./UploadFile");
const DownloadFile_1 = require("./DownloadFile");
const DeleteFile_1 = require("./DeleteFile");
const SearchFile_1 = require("./SearchFile");
class FileController {
    static createDir = CreateDir_1.createDirController;
    static listFiles = ListFile_1.listFileController;
    static uploadFile = UploadFile_1.uploadFileController;
    static downloadFile = DownloadFile_1.downloadFileController;
    static deleteFile = DeleteFile_1.deleteFileController;
    static searchFile = SearchFile_1.searchFileController;
}
exports.default = FileController;
//# sourceMappingURL=index.js.map