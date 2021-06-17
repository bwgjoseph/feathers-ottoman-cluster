import { Request, Response, NextFunction } from 'express-serve-static-core';
import logger from '../../logger';

/**
 * Transform multer processed files to feathers object which can be accessed
 * in params.files
 * Only trigger when this is a POST or PATCH request
 *
 * @param req request
 * @param _res response
 * @param next next
 */
const transferFilesToFeathers = (req: Request, _res: Response, next: NextFunction): void => {
  const method = req.method.toUpperCase();

  if (method === 'POST' || method === 'PATCH') {
    // Transfer the received files to feathers object
    // eslint-disable-next-line no-param-reassign
    (req as any).feathers.files = req.files;
    logger.info('Total files processed %s for route %s', (req as any).feathers.files?.length, req.route.path);
  }
  next();
};

export default transferFilesToFeathers;
