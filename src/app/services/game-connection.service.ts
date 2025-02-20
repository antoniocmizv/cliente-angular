// language: typescript
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { GameService } from '../helpers/GameService';

@Injectable({
  providedIn: 'root'
})
export class GameConnectionService {
  public socket: any;
  public gameService = new GameService();
  public connected = false;

  init(url: string, onConnected = () => {}, onDisconnected = () => {}) {
    this.socket = io(url);
    // Asigna la conexión al GameService
    this.gameService.setGameConnectionService(this);

    this.socket.on('connect', (data: any) => {
      this.connected = true;
      console.log(data);
      onConnected();

      this.socket.on('connectionStatus', (data: any) => {
        console.log(data);
        this.gameService.setPlayer(data.message.jugador);
      });
      this.socket.on('gameStart', (data: any) => {
        console.log(data);
        this.gameService.do({ type: 'game', content: data });
      });
      this.socket.on('playerLeave', (data: any) => {
        console.log('Player left');
        this.gameService.do({ type: 'end', content: data });
      });
      this.socket.on('message', (data: any) => {
        console.log(data);
        this.gameService.do(data);
      });
      this.socket.on('board', (data: any) => {
        console.log(data);
        this.gameService.do(data);
      });
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      onDisconnected();
    });
  }

  emit(event: string, payload: any) {
    this.socket.emit(event, payload);
  }
}
