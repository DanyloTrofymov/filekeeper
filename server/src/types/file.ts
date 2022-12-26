import { ObjectId } from 'mongoose';

export interface ICreateDirBody {
    name: string;
    type: string;
    parent: ObjectId;
}
export interface IUploadFileBody {
    parent: ObjectId;
}

export interface IFileBody {
    file: string;
}
export interface IFindBody {
    parent: string;
}

export interface IFile {
    name: string;
    mv(path: string, callback: (err: any) => void): void;
    mv(path: string): Promise<void>;
    encoding: string;
    mimetype: string;
    data: Buffer;
    tempFilePath: string;
    truncated: boolean;
    size: number;
    md5: string;
}

export const allowedTypes = [
    'doc',
    'docx',
    'pdf',
    'txt',
    'xls',
    'xlsx',
    'jpg',
    'png',
    'mp3',
    'wav',
    'mp4',
    'm4a',
    'mov',
];
