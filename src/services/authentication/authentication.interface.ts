import User from '../users/users.interface';

interface AuthenticationRequest {
  strategy: string;
  id: string;
  password: string;
}

interface AuthenticationResponse {
  accessToken: string;
  authentication: {
    strategy: 'jwt' | 'local';
    accessToken: string;
    payload: {
      iat: number;
      exp: number;
      aud: string;
      iss: string;
      sub: string;
      jti: string;
    }
  };
  user: User;
}

export {
  AuthenticationRequest,
  AuthenticationResponse,
};
