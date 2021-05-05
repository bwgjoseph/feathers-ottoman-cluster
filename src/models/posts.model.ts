// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { getModel, model, Schema } from 'ottoman';
import { ModelOptions } from 'ottoman/lib/types/model/interfaces/create-model.interface';
import { Application } from '../declarations';

export default function (app: Application) {
  const modelName = 'posts';
  const modelOptions: ModelOptions = {
    scopeName: 'demopostscope',
    collectionName: 'demopostcollection',
  };

  const schema = new Schema({
    text: { type: String, required: true }
  });

  return getModel(modelName) || model(modelName, schema, modelOptions);

}
