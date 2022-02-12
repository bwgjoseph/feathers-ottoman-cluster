// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema, ModelOptions } from 'ottoman';
import { Application } from '../declarations';
import baseSchema from './base.schema';

const modelName = 'posts';
const modelOptions: ModelOptions = {
  scopeName: 'postscope',
  collectionName: 'postcollection',
};

const context = new Schema({
  ids: {
    type: [String],
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
});

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  contexts: [context],
}).add(baseSchema);

const postModel = model(modelName, schema, modelOptions);

export default function (app: Application): ModelTypes {
  return getModel(modelName) || postModel;
}
