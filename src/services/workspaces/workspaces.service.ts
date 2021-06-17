// Initializes the `workspaces` service on path `/workspaces`
import { Service } from '@feathersjs/feathers';
import { SearchConsistency } from 'ottoman';
import { Application } from '../../declarations';
import { Workspaces } from './workspaces.class';
import hooks from './workspaces.hooks';
import Workspace from './workspaces.interface';
import createModel from '../../models/workspaces.model';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'workspaces': Service<Workspace> & Workspaces;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ottoman: {
      lean: true,
      consistency: SearchConsistency.LOCAL,
    }
  };

  // Initialize our service with any options it requires
  app.use('/workspaces', new Workspaces(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('workspaces');

  service.hooks(hooks);
}
