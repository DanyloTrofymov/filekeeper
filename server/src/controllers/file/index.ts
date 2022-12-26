import { listFileController } from './ListFile';
import { createDirController } from './CreateDir';
import { uploadFileController } from './UploadFile';
import { downloadFileController } from './DownloadFile';
export default class FileController {
    static createDir = createDirController;
    static listFiles = listFileController;
    static uploadFile = uploadFileController;
    static downloadFile = downloadFileController;
}
