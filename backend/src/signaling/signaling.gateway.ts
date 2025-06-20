import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { SignalingMessage } from "src/types/signaling.gateway";

@WebSocketGateway({ cors: true })
export class SignalingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const id = [...this.clients.entries()].find(
      ([_, sock]) => sock === client,
    )?.[0];
    if (id) {
      this.clients.delete(id);
      console.log(`Client disconnected: ${id}`);
    }
  }
  @SubscribeMessage("register")
  register(
    @MessageBody() data: { id: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.clients.set(data.id, client);
    console.log(`Registered client ID: ${data.id}`);
  }

  @SubscribeMessage("signal")
  handleSignal(
    @MessageBody() data: SignalingMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const targetSocket = this.clients.get(data.target);
    if (targetSocket) {
      targetSocket.emit("signal", {
        from: [...this.clients.entries()].find(
          ([_, sock]) => sock === client,
        )?.[0],
        type: data.type,
        payload: data.payload,
      });
      console.log(
        `Signal sent from ${
          [...this.clients.entries()].find(([_, sock]) => sock === client)?.[0]
        } to ${data.target}`,
      );
    } else {
      console.warn(`Target ${data.target} not found`);
    }
  }
}
