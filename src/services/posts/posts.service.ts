// Initializes the `posts` service on path `/posts`
import { Service } from '@feathersjs/feathers';
import { OttomanServiceOptions } from 'feathers-ottoman';
import { SearchConsistency } from 'ottoman';
import { Application } from '../../declarations';
import createModel from '../../models/posts.model';
import { Post, Posts } from './posts.class';
import hooks from './posts.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'posts': Service<Post> & Posts;
  }
}

export default function (app: Application): void {
  const options: OttomanServiceOptions = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    ottoman: {
      lean: true,
      consistency: SearchConsistency.LOCAL,
    }
  };

  // Initialize our service with any options it requires
  app.use('/posts', new Posts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('posts');

  service.hooks(hooks);
}
