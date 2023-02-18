import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection, SubscribeMessage,
  WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import type { Server, Socket } from "socket.io";
import type { Logger } from 'winston';

type User = {
  id: string,
  name: string,
  state: string
};

@WebSocketGateway({ cors: true })
export class AeroGateway implements OnGatewayConnection {

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  private users: User[] = [];

  private sendUsers = (): boolean =>
    this.server.emit('common', this.users);

  private clientIndex = (client: Socket): number =>
    this.users.findIndex(el => el.id === client.id);

  handleConnection(client: Socket): void {
    if(client.handshake.headers.wsioconn !== this.configService.get<string>('KEY')) {
      client.disconnect();
      this.logger.warn(`The client: ${client.id} attempt to connect without the correct key`);
      return;
    }
    this.logger.info(`The client: ${client.id} has connected`);
  }

  handleDisconnect(client: Socket): void {
    this.users.splice(this.clientIndex(client), 1);
    this.sendUsers();
    this.logger.info(`The client: ${client.id} has disconnected`);
  }

  @SubscribeMessage('enter')
  onEnter(@MessageBody() data: User): void {
    this.users.push(data);
    this.sendUsers();
  }

  @SubscribeMessage('state')
  onState(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
    this.users[this.clientIndex(client)].state = data;
    this.sendUsers();
  }

}