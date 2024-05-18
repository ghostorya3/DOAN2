/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayDisconnect, OnGatewayConnection {
  private arrUserOnline = new Map();
  constructor() { }
  handleConnection(client: any) {
    console.log(`${client.id} connected`);
    // this.arrUserOnline.set(27, client.id);
  }
  @WebSocketServer()
  public server: Server;

  handleDisconnect(client: Socket) {
    this.arrUserOnline.forEach(async (value, key) => {
      if (value === client.id) {
        this.arrUserOnline.delete(key);
        this.server.emit('userOffline', { id: key, time: new Date().getTime() });
        const values = Array.from(this.arrUserOnline.keys());
        this.server.emit('listOnline', values);
      }
    });
  }

  @SubscribeMessage('login')
  login(
    @MessageBody() data: { id: number },
    @ConnectedSocket() client: Socket,
  ): void {
    this.arrUserOnline.set(data.id, client.id);
    const values = Array.from(this.arrUserOnline.keys());
    this.server.emit('listOnline', values);
  }

  @SubscribeMessage('getOnline')
  getOnline(): void {
    const values = Array.from(this.arrUserOnline.keys());
    this.server.emit('listOnline', values);
  }

  handleSendResult(data: any) {
    console.log("🚀 ~ EventsGateway ~ handleSendResult ~ data:", data)
    const user = this.arrUserOnline.get(data.id);
    console.log(data.result);
    this.server.to(user).emit('serverSendResult', data.result);
  }

}
