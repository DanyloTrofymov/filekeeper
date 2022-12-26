import { createDirService } from './CreateDir';
import { listFileService } from './ListFile';
import { uploadFileService } from './UploadFile';
export default class FileService {
    static createDir = createDirService;
    static listFile = listFileService;
    static uploadFile = uploadFileService;
}
