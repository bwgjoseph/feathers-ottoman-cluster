import { Service, OttomanServiceOptions } from 'feathers-ottoman-trial';
import { Application } from '../../declarations';

export class Posts extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: OttomanServiceOptions, app: Application) {
    super(options);
  }
}
