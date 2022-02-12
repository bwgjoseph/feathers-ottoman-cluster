import { set, Ottoman, SearchConsistency } from 'ottoman';
import { Application } from './declarations';

/**
 * As feathers v4 does not support async initialization, we cannot ensure the connection to
 * ottoman is started at this point but only assign to the app instance
 *
 * See https://github.com/couchbaselabs/node-ottoman/issues/629 on why we only connect and start
 * ottoman at index.ts
 */
set('DEBUG', true);
export const ottoman = new Ottoman({ collectionName: '_default', consistency: SearchConsistency.GLOBAL });

export default function (app: Application): void {
  app.set('ottomanClient', ottoman);
}
