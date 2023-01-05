import { createDirService } from './CreateDir';
import { listFileService } from './ListFile';
import { uploadFileService } from './UploadFile';
import { downloadFileService } from './DownloadFile';
import { deleteFileService } from './DeleteFile';
import { searchFileService } from './SearchFile';
import { getFilePathService } from './GetFilePath';
export default class FileService {
    static createDir = createDirService;
    static listFile = listFileService;
    static uploadFile = uploadFileService;
    static downloadFile = downloadFileService;
    static deleteFile = deleteFileService;
    static searchFile = searchFileService;
    static getFilePath = getFilePathService;
}
