import { listFileController } from './ListFile';
import { createDirController } from './CreateDir';
import { uploadFileController } from './UploadFile';
import { downloadFileController } from './DownloadFile';
import { deleteFileController } from './DeleteFile';
import { searchFileController } from './SearchFile';
import { getFilePathController } from './GetFilePath';
export default class FileController {
    static createDir = createDirController;
    static listFiles = listFileController;
    static uploadFile = uploadFileController;
    static downloadFile = downloadFileController;
    static deleteFile = deleteFileController;
    static searchFile = searchFileController;
    static getFilePath = getFilePathController;
}
