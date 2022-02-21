import { getOttomanInstances } from 'ottoman';
import { ottoman } from '../../src/ottoman';

/**
 * See https://github.com/couchbaselabs/node-ottoman/issues/629
 */
export const mochaHooks = {
  beforeAll: [
    async function () {
      await ottoman.connect({
        connectionString: 'couchbase://localhost',
        bucketName: 'testBucket',
        username: 'user',
        password: 'password'
      });

      await ottoman.start();
    }
  ],

  afterAll: [
    async function () {
      for (const instance of getOttomanInstances()) {
        await instance.close();
      }
    }
  ]
};
