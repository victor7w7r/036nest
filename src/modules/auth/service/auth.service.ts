import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService
  ){}

  private apiKeys = [
    this.configService.get<string>('KEY')
  ];

  validateApiKey = (apiKey: string): string =>
    this.apiKeys.find(apiK => apiKey === apiK);

}
