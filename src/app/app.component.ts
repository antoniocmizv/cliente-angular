// language: typescript
import { Component } from '@angular/core';
import { GameConnectionService } from './services/game-connection.service';
import { GameBoardComponent } from "./game-board/game-board.component";

@Component({
  selector: 'app-root',
  template: `<app-game-board></app-game-board>`,
  styleUrls: ['./app.component.css'],
  imports: [GameBoardComponent]
})
export class AppComponent {
  constructor(private gameConn: GameConnectionService) {
    this.gameConn.init('http://localhost:3000', () => {
      console.log('Conectado al servidor');
    }, () => {
      console.log('Desconectado del servidor');
    });
  }
}
