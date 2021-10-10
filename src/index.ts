import { start } from 'ottoman';
import app from './app';
import logger from './logger';

start().then(() => {
  const port = app.get('port');
  const server = app.listen(port);

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise %s %s', p, reason)
  );

  logger.info('ottomanClient', app.get('ottomanClient').config);
}).catch((err: any) => {
  logger.error('start error', err);
  logger.error('ottomanClient error', app.get('ottomanClient').config);
});
