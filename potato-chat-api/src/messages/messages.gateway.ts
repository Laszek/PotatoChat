import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway({ cors: true})
export class MessageWebsocketGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	@WebSocketServer()
	private server;
	private wsClients = new Set<Socket>();
	private logger = new Logger('MessageWebsocketGateway');

	afterInit() {
		this.logger.log('Websocket server initialized');
	}

	handleConnection(client: Socket): void {
		this.wsClients.add(client);
		this.logger.log(`Connection established for client ${client.id}`);
	}

	handleDisconnect(client: Socket): void {
		this.wsClients.delete(client);
		this.logger.log(`Disconnected for client ${client.id}`);
	}

	broadcastChatMessage(event, message: { type: 'ANSWER' | 'QUESTION', id: string }): void {
		for (let c of this.wsClients) {
				c.send(event, { clientId: c.id, message });
		}
	}
}