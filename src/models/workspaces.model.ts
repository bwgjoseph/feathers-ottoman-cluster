// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema, ModelOptions } from 'ottoman';
import { Application } from '../declarations';
import baseSchema from './base.schema';

const modelName = 'workspaces';
const modelOptions: ModelOptions = {
  scopeName: 'workspacescope',
  collectionName: 'workspacecollection',
};

const schema = new Schema({
  members: [
    {
      type: String,
      required: true,
    }
  ],
  owners: [
    {
      type: String,
      required: true,
    }
  ]
}).add(baseSchema);

const workspaceModel = model(modelName, schema, modelOptions);

export default function (app: Application): ModelTypes {
  return getModel(modelName) || workspaceModel;
}
