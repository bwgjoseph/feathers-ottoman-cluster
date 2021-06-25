import { Service, OttomanServiceOptions } from 'feathers-ottoman';
import { Application } from '../../declarations';
import User from './users.interface';

export class Users extends Service<User> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: OttomanServiceOptions, app: Application) {
    super(options);
  }
}
