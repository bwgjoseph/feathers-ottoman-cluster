// Initializes the `attachments` service on path `/attachments`
import { Service } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Attachments } from './attachments.class';
import hooks from './attachments.hooks';
import multer from 'multer';
import transferAttachmentsToFeathers from './hooks/transferFilesToFeathers';
import Attachment from './attachments.interface';
import { SearchConsistency } from 'ottoman';
import createModel from '../../models/attachments.model';

// For content-type: multipart/form-data
const MAX_FILE_SIZE = 5242880;
const MAX_FILE_UPLOAD_LIMIT = 5;

// Instantiate multer
const multerware = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILE_UPLOAD_LIMIT,
  },
});

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'attachments': Service<Attachment> & Attachments;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ottoman: {
      lean: true,
      consistency: SearchConsistency.LOCAL,
    },
    multi: ['create']
  };

  // Initialize our service with any options it requires
  app.use('/attachments',
    multerware.array('files'),
    (req: any, res: any, next: any) => transferAttachmentsToFeathers(req, res, next),
    new Attachments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('attachments');

  service.hooks(hooks);
}
