import { ObjectId } from 'mongoose';

export class BaseMongoEntity {
  _id: ObjectId | string;
  createdAt!: Date;
  updateAt!: Date;
}

export type NoTimestamps<T extends Record<string, any>> = Omit<T, 'createdAt' | 'updatedAt'>;
