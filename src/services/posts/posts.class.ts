import { Service, OttomanServiceOptions } from 'feathers-ottoman';
import { Application } from '../../declarations';
import Post from './posts.interface';

class Posts extends Service<Post> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: OttomanServiceOptions, app: Application) {
    super(options);
  }
}

export default Posts;
