import { start } from 'ottoman';
import app from './app';
import logger from './logger';

const oStart = async () => {
  await start();
};

const fStart = () => {
  const port = app.get('port');
  const server = app.listen(port);

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise %s %s', p, reason)
  );
};

oStart().catch((err) => {
  console.log(err);
  fStart();
});
