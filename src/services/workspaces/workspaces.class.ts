import { Service, OttomanServiceOptions } from 'feathers-ottoman';
import { Application } from '../../declarations';

export class Workspaces extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: OttomanServiceOptions, app: Application) {
    super(options);
  }
}
