import { createDirService } from './createDir';

class FileService {
    createDir = createDirService;
}

export default new FileService();
