import { SchemaOptions } from "@nestjs/mongoose";
import { Document as MongooseDoc } from 'mongoose';

export type MongooseDocument<T extends Record<string, any>> = T & MongooseDoc;

export function mongoSchema(schema: SchemaOptions = {}): SchemaOptions {
  return {
    ...{
      versionKey: false,
      timestamps: true,
    },
    ...schema,
  };
}
