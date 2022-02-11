import { set, Ottoman, SearchConsistency, getDefaultInstance } from 'ottoman';
import { Application } from './declarations';
import logger from './logger';

const initOttoman = async (consistency: SearchConsistency = SearchConsistency.GLOBAL): Promise<Ottoman> => {
  set('DEBUG', true);
  let ottoman = getDefaultInstance();

  if (!ottoman) {
    ottoman = new Ottoman({ collectionName: '_default', consistency });
  }

  await ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'testBucket',
    username: 'user',
    password: 'password'
  });

  return ottoman;
};

export default function (app: Application): void {
  initOttoman()
    .then((ottoman: Ottoman) => {
      logger.info('connected to ottoman succesfully');
      app.set('ottomanClient', ottoman);
    })
    .catch((err) => logger.error('init error', err));
}
