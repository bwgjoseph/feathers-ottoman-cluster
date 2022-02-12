// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema, ModelOptions } from 'ottoman';
import { Application } from '../declarations';
import baseSchema from './base.schema';

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

const attachmentModel = model(modelName, schema, modelOptions);

export default function (app: Application): ModelTypes {
  return getModel(modelName) || attachmentModel;
}
