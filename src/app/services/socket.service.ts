import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io('http://localhost:3000');
  public message$ = new Subject<any>();

  constructor() {
    this.socket.on('message', (data) => this.message$.next(data));
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}
