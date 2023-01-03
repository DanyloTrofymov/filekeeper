"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateDir_1 = require("./CreateDir");
const ListFile_1 = require("./ListFile");
const UploadFile_1 = require("./UploadFile");
const DownloadFile_1 = require("./DownloadFile");
const DeleteFile_1 = require("./DeleteFile");
const SearchFile_1 = require("./SearchFile");
class FileService {
    static createDir = CreateDir_1.createDirService;
    static listFile = ListFile_1.listFileService;
    static uploadFile = UploadFile_1.uploadFileService;
    static downloadFile = DownloadFile_1.downloadFileService;
    static deleteFile = DeleteFile_1.deleteFileService;
    static searchFile = SearchFile_1.searchFileService;
}
exports.default = FileService;
//# sourceMappingURL=index.js.map