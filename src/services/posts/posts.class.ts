import { Service, OttomanServiceOptions } from 'feathers-ottoman-trial';
import { Application } from '../../declarations';

export interface Post {
  id: string;
  text: string;
}

export class Posts extends Service<Post> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: OttomanServiceOptions, app: Application) {
    super(options);
  }
}
