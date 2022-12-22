import { listFileController } from './ListFile';
import { createDirController } from './CreateDir';

export default class FileController {
    static createDir = createDirController;
    static listFiles = listFileController;
}
