import { listFileController } from './ListFile';
import { createDirController } from './CreateDir';
import { uploadFileController } from './UploadFile';
export default class FileController {
    static createDir = createDirController;
    static listFiles = listFileController;
    static uploadFile = uploadFileController;
}
