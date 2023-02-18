import { Module } from '@nestjs/common';

import { AeroGateway } from './socket.gateway';

@Module({ providers: [AeroGateway] })
export class SocketModule {}