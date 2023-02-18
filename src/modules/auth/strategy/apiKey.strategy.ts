import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../service/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {

  constructor(private readonly authService: AuthService) {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      (apikey, done,) => !authService.validateApiKey(apikey)
        ? done(false)
        : done(true)
    );
  }
}