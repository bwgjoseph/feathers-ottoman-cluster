// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema } from 'ottoman';
import { ModelOptions } from 'ottoman/lib/types/model/interfaces/create-model.interface';
import { Application } from '../declarations';
import baseSchema from './base.schema';

export default function (app: Application): ModelTypes {
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

  return getModel(modelName) || model(modelName, schema, modelOptions);
}
