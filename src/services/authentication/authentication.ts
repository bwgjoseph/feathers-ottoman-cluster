import { Service } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';

import { Application } from '../../declarations';
import { AuthenticationRequest, AuthenticationResponse } from './authentication.interface';

declare module '../../declarations' {
  interface ServiceTypes {
    'authentication': Service<AuthenticationRequest | AuthenticationResponse> & AuthenticationService;
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
}
