import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  players: any[] = [];
  boardData: any = [];

  constructor(private socketService: SocketService) {
    this.socketService.message$.subscribe(data => this.handleGameUpdate(data));
  }

  handleGameUpdate(data: any): void {
    if (data.type === 'board') {
      this.boardData = data.content.board;
    }
  }

  movePlayer(direction: string): void {
    this.socketService.emit('movePlayer', { direction });
  }
}
