import { Ottoman, SearchConsistency } from 'ottoman';
import { Application } from './declarations';
import logger from './logger';

const initOttoman = async (searchConsistency: SearchConsistency = SearchConsistency.GLOBAL): Promise<Ottoman> => {
  const ottoman = new Ottoman({
    searchConsistency,
  });

  ottoman.connect({
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

