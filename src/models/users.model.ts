// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema, ModelOptions } from 'ottoman';
import { Application } from '../declarations';
import baseSchema from './base.schema';

const modelName = 'users';
const modelOptions: ModelOptions = {
  scopeName: 'userscope',
  collectionName: 'usercollection',
};

const schema = new Schema({
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String]
  }
}).add(baseSchema);

const userModel = model(modelName, schema, modelOptions);

export default function (app: Application): ModelTypes {
  return getModel(modelName) || userModel;
}
