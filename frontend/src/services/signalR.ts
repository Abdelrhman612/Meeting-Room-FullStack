import * as signalR from '@microsoft/signalr';
import { SIGNALR_URL } from '../utils/constants';

class SignalRService {
  private connection: signalR.HubConnection | null = null;

  async connect(roomCode: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_URL)
      .withAutomaticReconnect()
      .build();

    await this.connection.start();
    await this.connection.invoke('JoinRoom', roomCode);
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.connection?.on(event, callback);
  }

  sendOffer(roomCode: string, offer: any) {
    this.connection?.invoke('SendOffer', roomCode, JSON.stringify(offer));
  }

  sendAnswer(roomCode: string, answer: any) {
    this.connection?.invoke('SendAnswer', roomCode, JSON.stringify(answer));
  }

  sendIceCandidate(roomCode: string, candidate: any) {
    this.connection?.invoke('SendIce', roomCode, JSON.stringify(candidate));
  }

  disconnect() {
    this.connection?.stop();
  }
}

export const signalRService = new SignalRService();