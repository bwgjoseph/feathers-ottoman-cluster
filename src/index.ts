import { ottoman } from './ottoman';
import app from './app';
import logger from './logger';

const main = async() => {
  try {
    logger.debug('connecting to ottoman');

    await ottoman.connect({
      connectionString: 'couchbase://localhost',
      bucketName: 'testBucket',
      username: 'user',
      password: 'password'
    });

    await ottoman.start();

    logger.debug('ottoman started successfully');

    const port = app.get('port');
    const server = app.listen(port);

    server.on('listening', () =>
      logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
    );

    process.on('unhandledRejection', (reason, p) =>
      logger.error('Unhandled Rejection at: Promise %s %s', p, reason)
    );
  } catch (err) {
    console.log(err);
  }
};

main();
