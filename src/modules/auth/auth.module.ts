import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ApiKeyStrategy } from './strategy/apiKey.strategy';
import { AuthService } from './service/auth.service';

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy]
})
export class AuthModule {}