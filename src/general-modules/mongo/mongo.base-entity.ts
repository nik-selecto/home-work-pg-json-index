import { ObjectId } from 'mongoose';

export interface BaseMongoInterface {
  createdAt: string;
  updatedAt: string;
  _id: ObjectId | string;
}
export class BaseMongoEntity implements BaseMongoInterface {
  _id: ObjectId | string;
  createdAt: string;
  updatedAt: string;
}

export type NoTimestamps<T extends Record<string, any>> = Omit<T, 'createdAt' | 'updatedAt'>;
