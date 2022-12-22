import { ObjectId } from 'mongoose';

export interface ICreateBody {
    name: string;
    type: string;
    parent: ObjectId;
}

export interface IFindBody {
    parent: string;
}
