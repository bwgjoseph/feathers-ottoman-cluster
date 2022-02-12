// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema, ModelOptions } from 'ottoman';
import { Application } from '../declarations';
import baseSchema from './base.schema';

const modelName = 'comments';
const modelOptions: ModelOptions = {
  scopeName: 'commentscope',
  collectionName: 'commentcollection',
};

const schema = new Schema({
  review: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    ref: 'posts',
  },
}).add(baseSchema);

const commentModel = model(modelName, schema, modelOptions);

export default function (app: Application): ModelTypes {
  return getModel(modelName) || commentModel;
}
