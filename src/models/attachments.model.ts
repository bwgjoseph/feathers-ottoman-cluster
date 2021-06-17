// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema } from 'ottoman';
import { ModelOptions } from 'ottoman/lib/types/model/interfaces/create-model.interface';
import { Application } from '../declarations';
import baseSchema from './base.schema';

export default function (app: Application): ModelTypes {
  const modelName = 'attachments';
  const modelOptions: ModelOptions = {
    scopeName: 'attachmentscope',
    collectionName: 'attachmentcollection',
  };

  const schema = new Schema({
    filename: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  }).add(baseSchema);

  return getModel(modelName) || model(modelName, schema, modelOptions);
}