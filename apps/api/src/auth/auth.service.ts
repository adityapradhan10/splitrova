import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return {
      message: 'Signup',
    };
  }
  login() {
    return {
      message: 'login',
    };
  }
}
