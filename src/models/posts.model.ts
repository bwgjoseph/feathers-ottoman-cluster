// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, ModelTypes, Schema } from 'ottoman';
import { ModelOptions } from 'ottoman/lib/types/model/interfaces/create-model.interface';
import { Application } from '../declarations';
import baseSchema from './base.schema';

export default function (app: Application): ModelTypes {
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

  return getModel(modelName) || model(modelName, schema, modelOptions);
}
