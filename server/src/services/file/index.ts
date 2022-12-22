import { createDirService } from './CreateDir';
import { listFileService } from './ListFile';

class FileService {
    createDir = createDirService;
    listFile = listFileService;
}

export default new FileService();
