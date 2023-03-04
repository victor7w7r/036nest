import {
  Inject, Injectable,
  type NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import type { Logger } from 'winston';
import passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService
  ) {}

  use(req: any, res: any, next: () => void): void {
    passport.authenticate(
      'headerapikey',
      {
        session: false,
        failureRedirect: '/api/unauthorized'
      },
      value => {
        if (value || this.configService.get<string>('NODE_ENV') === 'development') next();
        else {
          this.logger.warn(`[${req.method}] ${req.url} Not authorized`);
          throw new UnauthorizedException({ error: 'Not authorized' });
        }
      }
    )(req, res, next);
  }
}