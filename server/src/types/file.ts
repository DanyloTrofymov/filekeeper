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
export interface IListQuery {
    parent: string;
    sort: string;
    filter: string[];
}

export interface IDownloadQuery {
    id: string;
}

export interface ISearchQuery {
    search: string;
}

export interface IDeleteQuery {
    id: string;
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
    'jpeg',
    'png',
    'mp3',
    'wav',
    'mp4',
    'm4a',
    'mov',
];

export const allowedSort = ['date', 'type', 'name', 'size'];
export const allowedFilter = ['doc', 'music', 'pic', 'vid'];
