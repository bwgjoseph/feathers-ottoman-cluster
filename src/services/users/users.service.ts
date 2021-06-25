// Initializes the `users` service on path `/users`
import { Service } from '@feathersjs/feathers';
import { SearchConsistency } from 'ottoman';
import { Application } from '../../declarations';
import { Users } from './users.class';
import createModel from '../../models/users.model';
import hooks from './users.hooks';
import User from './users.interface';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'users': Service<User> & Users;
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
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
}
